import React, { useState, useEffect } from 'react';
import { StatusBar, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActionSheetIOS, NativeModules, FlatList } from 'react-native';
import { Notifications } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { ReminderCard } from '../components/ReminderCard';
import { CreateRemModal } from '../components/CreateRemModal';
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

  const [createRemModal, setCreateRemModal] = useState(false); // Modal for creating reminders
  const [remsList, setRemsList] = useState([]); // Complete reminders list
  const [calendarList, setCalendarList] = useState([]);
  const [currId, setCurrId] = useState(0); 
  const [listRefresh, setListRefresh] = useState(false);
  const appData = [
    {name: 'remsList', func: setRemsList}, 
    {name: 'calendarList', func: setCalendarList},
    {name: 'currId', func: setCurrId},
  ]; // States and its' functions those must be stored
  
  useEffect(() => {
    // Get stored data
    for(let item in appData) {
      getStoredData(appData[item]);
    }
  }, []);

  const getStoredData = async (item) => {
    let id = item.name;
    const data = await AsyncStorage.getItem(id);
    if(data !== null) {
      item.func(JSON.parse(data));
    }    
    else {
      if(__DEV__) 
        console.log("Unable to get stored data with id '" + id + "' ");
    }
  };

  useEffect(() => { storeData('remsList', remsList); }, [remsList]);
  useEffect(() => { storeData('calendarList', calendarList); }, [calendarList]);
  useEffect(() => { storeData('currId', currId); }, [currId]);

  const storeData = (id, data) => {
    AsyncStorage.setItem(id, JSON.stringify(data));
  };

  const addReminder = (rem) => {
    rem.listId = (currId).toString();
    setCurrId(currId + 1);
    setRemsList([...remsList, rem]);
  };

  const refreshRemsList = () => {
    setListRefresh(true);
    getStoredData('remsList');
    setRemsList([...remsList]);
    setTimeout(() => { 
      setListRefresh(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>

      {
        createRemModal &&
        <CreateRemModal
          hide={() => {setCreateRemModal(false)}}
          addReminder={(rem) => {addReminder(rem)}}
        />
      }

      <View style={platformStyles.screenHeader}>  
        <Text style={platformStyles.screenTextHeader}>All reminders</Text>
        <TouchableOpacity 
          style={platformStyles.headerRightButton}
          onPress={() => {setCreateRemModal(true)}}
        >
          <Ionicons name="ios-add" size={48} color={primaryColor} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.remindersList}
        data={remsList}
        refreshing={listRefresh}
        onRefresh={refreshRemsList}
        renderItem={({item}) => 
          <ReminderCard 
            title={item.reminder.title} 
            icon={item.reminder.icon} 
            time={item.reminder.time}
            timeUntill={getFormattedDate(item.schedulingOptions.time)}
            longPressAction={() => {selectReminder(item)}}
            doneAction={() => {setDone(item)}}
            failedAction={() => {setFailed(item)}}
          />
        }
        keyExtractor={item => item.listId}
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