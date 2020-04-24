import React, { useState, useEffect } from 'react';
import { StatusBar, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ActionSheetIOS, NativeModules, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';

import Colors from '../constants/Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function HomeScreen() {

  const [createRemModal, setCreateRemModal] = useState(false); // Modal for creating reminders
  const [remsList, setRemsList] = useState([{item: 's'}]);
  const [calendarList, setCalendarList] = useState([{item: 'wz'}, {item: 'cu'}]);
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
  }

  return (
    <View style={styles.container}>
      {/* TODO : status bar must change it's color within app's color theme */}
      <StatusBar barStyle='dark-content' /> 
      <Text>Items</Text>
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
