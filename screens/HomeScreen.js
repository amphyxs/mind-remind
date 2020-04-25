import React, { useState, useEffect } from 'react';
import { StatusBar, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActionSheetIOS, NativeModules, AsyncStorage, FlatList } from 'react-native';
import { Notifications } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { SettingsModal } from '../components/SettingsModal';
import { ReminderCard } from '../components/ReminderCard';

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
  const [settingsModal, setSettinsModal] = useState(false); 
  const [remsList, setRemsList] = useState([]);
  const [calendarList, setCalendarList] = useState([]);
  const [currId, setCurrId] = useState(0); 
  const appData = [
    {name: 'remsList', func: setRemsList}, 
    {name: 'calendarList', func: setCalendarList},
    {name: 'currId', func: setCurrId},
  ]; // States and its' functions those must be stored
  
  useEffect(() => { storeData('remsList', remsList); }, [remsList]);
  useEffect(() => { storeData('calendarList', calendarList); }, [calendarList]);
  useEffect(() => { storeData('currId', currId); }, [currId]);
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

  const storeData = async (id, data) => 
    AsyncStorage.setItem(id, JSON.stringify(data));

  const clearStorage = async () => {
    for(let item in appData) {
      await AsyncStorage.removeItem(appData[item].name);
    }
    NativeModules.DevSettings.reload();
  };

  const toggleModal = (modalName, state) => {
    if(modalName == 'settingsModal') {
      setSettinsModal(state);
    }
  };

  const saveSettings = (settings) => {
    // TODO
  };

  return (
    <View style={styles.container}>
      {/* TODO : status bar must change it's color within app's color theme */}
      {
        Platform.OS === 'ios' &&
        <StatusBar barStyle='dark-content' /> 
      }

      {
        settingsModal && 
        <SettingsModal
          hide={() => {toggleModal('settingsModal', false)}}
          saveSettings={(settings) => {saveSettings(settings)}}
        />
      }

      <View style={platformStyles.screenHeader}>  
        <Text style={platformStyles.screenTextHeader}>Today tasks</Text>
        <TouchableOpacity 
          style={platformStyles.headerRightButton}
          onPress={() => {toggleModal('settingsModal', true)}}
        >
          <Ionicons name="ios-more" size={Layout.headerIcon} color={primaryColor} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.remindersList}
        data={remsList}
        renderItem={({item}) => 
          <ReminderCard 
            title={item.title} 
            icon={item.icon} 
            time={item.time}
            longPressAction={() => {selectReminder(item)}}
            doneAction={() => {setDone(item)}}
            failedAction={() => {setFailed(item)}}
          />
        }
        keyExtractor={item => item.id}
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
    backgroundColor: '#fff',
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
    top: 50,
    right: 0,
    width: Layout.headerIcon,
    height: Layout.headerIcon,
  },
});

// Android-only stylesheet
const stylesAndroid = StyleSheet.create({
  // TODO
});