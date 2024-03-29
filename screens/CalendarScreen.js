import React, { useState, useEffect } from 'react';
import {  Platform, StyleSheet, Text, TouchableOpacity, View, SectionList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { ReminderCard } from '../components/ReminderCard';
import { SettingsModal } from '../components/SettingsModal';
import { getFormattedDate, isEqualDates } from '../components/DateFunctions';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function HomeScreen() {

  // Platform features
  var primaryColor;
  var platformStyles;
  if(Platform.OS === 'ios') {
    primaryColor = Colors.iOSBlue;
    platformStyles = stylesiOS;
  }
  else if(Platform.OS === 'android') {
    primaryColor = 'green'; // TODO
    platformStyles = stylesAndroid;
  }
  else {
    primaryColor = 'blue'; // TODO
  }

  const [settingsModal, setSettinsModal] = useState(false); 
  const [remsList, setRemsList] = useState([]); // Complete reminders list
  const [calendarList, setCalendarList] = useState(remsList);
  const [listRefresh, setListRefresh] = useState(false);
  const appData = [
    {name: 'remsList', func: setRemsList}, 
  ]; // States and its' functions those must be stored

  useEffect(() => {
    // Get stored data
    for(let item in appData) {
      getStoredData(appData[item]);
    }
  }, []);

  const createCalendar = () => {
    let newCalendar = [];
    for(let item in remsList) {
      let rem = remsList[item];
      let date = getFormattedDate(rem.schedulingOptions.time, '.', true);
      let exists = false;
      for(let index in newCalendar) {
        let obj = newCalendar[index];
        if(obj.title == date) {
          exists = true;
          obj.data.push(rem);
          newCalendar[index].data = obj.data;
          break;
        }
      }
      if(!exists) {
        let listItem = new Object();
        listItem.title = date;
        listItem.data = [];
        listItem.data.push(rem);
        newCalendar.push(listItem);
      }
    }
    setCalendarList(newCalendar);
  }

  const getStoredData = async (item) => {
    let id = item.name;
    const data = await AsyncStorage.getItem(id);
    if(data !== null) {
      if(id == 'remsList') {
        setRemsList(JSON.parse(data));
        createCalendar();
      }
      else item.func(JSON.parse(data));
    }    
    else {
      if(__DEV__) 
        console.log("Unable to get stored data with id '" + id + "' ");
    }
  };

  const refreshRemsList = () => {
    setListRefresh(true);
    getStoredData('remsList');
    setRemsList([...remsList]);
    createCalendar();
    setTimeout(() => { 
      setListRefresh(false);
    }, 1000);
  };

  const saveSettings = (settings) => {
    // TODO
  };

  return (
    <View style={styles.container}>

      {
        settingsModal && 
        <SettingsModal
          hide={() => {setSettinsModal(false)}}
          saveSettings={(settings) => {saveSettings(settings)}}
        />
      }

      <View style={platformStyles.screenHeader}>  
        <Text style={platformStyles.screenTextHeader}>Calendar</Text>
        <TouchableOpacity 
          style={platformStyles.headerRightButton}
          onPress={() => {setSettinsModal(true)}}
        >
          <Ionicons name="ios-settings" size={Layout.headerIcon} color={primaryColor} />
        </TouchableOpacity>
      </View>
      <SectionList
        sections={calendarList}
        keyExtractor={(item, index) => item + index}
        refreshing={listRefresh}
        onRefresh={refreshRemsList}
        renderItem={({item}) => 
          <ReminderCard
            title={item.reminder.title} 
            icon={item.reminder.icon} 
            time={item.reminder.time}
            longPressAction={() => {selectReminder(item)}}
            doneAction={() => {setDone(item)}}
            failedAction={() => {setFailed(item)}}
          />
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarHeaderText}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeBackground,
  },
  contentContainer: {
    paddingTop: 30,
  },
  remindersList: {
    paddingTop: 5,
  },
  calendarHeader: {
    padding: 15,
    paddingBottom: 10,
    borderBottomColor: Colors.reminderCardBorder,
    borderBottomWidth: 1,
  },
  calendarHeaderText: {
    color: Colors.textPrimary,
    fontFamily: 'sf-prod-semibold',
    fontSize: 20,
  }
});

// iOS-only stylesheet
const stylesiOS = StyleSheet.create({
  screenHeader: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: Colors.screenHeaderBackground,
    textAlign: 'left',
    paddingTop: 50,
    paddingBottom: 20,
  },
  screenTextHeader: {
    marginLeft: 14,
    color: Colors.textPrimary,
    fontSize: 34,  
    fontFamily: 'sf-prod-bold'
  },
  headerRightButton: {
    position: 'absolute',
    top: 55,
    right: 10,
    width: Layout.headerIcon,
    height: Layout.headerIcon,
  },
});

// Android-only stylesheet
const stylesAndroid = StyleSheet.create({
  // TODO
});