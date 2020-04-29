import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, NativeModules FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReminderCard } from '../components/ReminderCard';
import { CreateRemModal } from '../components/CreateRemModal';
import { getFormattedDate, isEqualDates, countTimeUntill } from '../components/DateFunctions';
import AsyncStorage from '@react-native-community/async-storage';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function TodayScreen() {

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
  const [todayRemsList, setTodayRemsList] = useState(remsList); // Reminders planned for current day
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
      if(id == 'remsList') {
        // todayRemsList depends on remsList, so we need to set them in the same time
        setRemsList(JSON.parse(data));
        setTodayRemsList(JSON.parse(data).filter(item => isEqualDates(item.schedulingOptions.time, new Date())));
      }
      else item.func(JSON.parse(data));
    }    
    else {
      if(__DEV__) 
        console.log("Unable to get stored data with id '" + id + "' ");
    }
  };

  const storeData = (id, data) => {
    AsyncStorage.setItem(id, JSON.stringify(data));
  };
  
  useEffect(() => { storeData('remsList', remsList); }, [remsList]);
  useEffect(() => { storeData('calendarList', calendarList); }, [calendarList]);
  useEffect(() => { storeData('currId', currId); }, [currId]);

  const addReminder = (rem) => {
    rem.listId = (currId).toString();
    setCurrId(currId + 1);
    setRemsList([...remsList, rem]);
    let today = getFormattedDate(new Date());
    if(getFormattedDate(rem.schedulingOptions.time) == today) {
      setTodayRemsList([...todayRemsList, rem]);
    }
  };

  const refreshRemsList = () => {
    setListRefresh(true);
    getStoredData('remsList');
    setRemsList([...remsList]);
    setTodayRemsList(remsList.filter(item => isEqualDates(item.schedulingOptions.time, new Date())));
    setTimeout(() => { 
      setListRefresh(false);
    }, 1000);
  }

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
        <Text style={platformStyles.screenTextHeader}>Today</Text>
        <TouchableOpacity 
          style={platformStyles.headerRightButton}
          onPress={() => {setCreateRemModal(true)}}
        >
          <Ionicons name="ios-add" size={48} color={primaryColor} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.remindersList}
        data={todayRemsList}
        refreshing={listRefresh}
        onRefresh={refreshRemsList}
        renderItem={({item}) => 
          <ReminderCard 
            title={item.reminder.title} 
            icon={item.reminder.icon} 
            time={item.reminder.time}
            timeUntill={countTimeUntill(item.schedulingOptions.time)}
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

TodayScreen.navigationOptions = {
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