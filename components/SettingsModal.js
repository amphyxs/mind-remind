import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Switch, Button,  NativeModules, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FormPicker, FormSwitch, FormTextInput, FormButton, SingleField, GroupedFields, Separator } from '../components/Forms';
import { Notifications } from 'expo';
import RNPickerSelect from 'react-native-picker-select';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export function SettingsModal(props) {

  const [settings, setSettings] = useState({});
  const [themeForm, setThemeForm] = useState('Light');
  const [soundForm, setSoundForm] = useState(true);
  const themes = [
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
  ]
  const appData = ['remsList', 'currId', 'calendarList', 'todayRemsList'];

  const updateSetting = (property, value) => {
    settings.property = value;
    setSettings(setting);
  }
  
  const clearStorage = async () => {
    for(let item in appData) {
      await AsyncStorage.removeItem(appData[item]);
    }
    Notifications.cancelAllScheduledNotificationsAsync();
    NativeModules.DevSettings.reload();
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalTopPanel}>
            <TouchableOpacity style={styles.modalLeftAction}
              onPress={() => {
                props.hide();
              }}
            >
              <Text style={styles.modalLeftActionText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Settings</Text>
            <TouchableOpacity style={styles.modalRightAction}
              onPress={() => {
                props.saveSettings(settings);
                props.hide();
              }}
            >
              <Text style={styles.modalRightActionText}>Save</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <SingleField>
              <FormPicker
                title='Color theme'
                icon='ios-color-palette'
                items={themes}
                value={themeForm}
                updater={(value) => {setThemeForm(value)}}
              />
            </SingleField>
            <GroupedFields>
              <FormSwitch
                title='Notifications'
                icon='ios-notifications'
                toggle={() => {setSoundForm(!soundForm)}}
                value={soundForm}
              />
              <Separator/>
              <FormSwitch
                title='Sound'
                icon='ios-volume-high'
                toggle={() => {setSoundForm(!soundForm)}}
                value={soundForm}
              />
              <Separator/>
              <FormSwitch
                title='Vibration'
                icon='ios-flash'
                toggle={() => {setSoundForm(!soundForm)}}
                value={soundForm}
              />
            </GroupedFields>
            <SingleField>
              <FormButton
                title='Clear data'
                icon='ios-trash'
                handler={clearStorage}
              />
            </SingleField>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: '5%'
  },
  modalView: {
    height: '105%',
    backgroundColor: Colors.iOSLightBackground,
  },
  modalTopPanel: {
    flex: 0,
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 35,
    backgroundColor: Colors.modalHeaderBackground,
    borderBottomColor: Colors.iOSBorder,
    borderBottomWidth: 1,
    textAlign: 'center',
    alignContent: 'center',
  },
  modalHeader: {
    position: 'absolute',
    left: '47%',
    top: 15,
    fontFamily: "sf-prod-semibold",
    fontSize: 18,
    color: Colors.textPrimary,
  },
  modalLeftAction: {
    position: "absolute",
    left: 15,
    top: 15,
  },
  modalRightAction: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  modalLeftActionText: {
    fontFamily: "sf-prot-regular",
    fontSize: 17,
    color: Colors.iOSBlue,
  },
  modalRightActionText: {
    fontSize: 17,
    fontFamily: "sf-prot-semibold",
    color: Colors.iOSBlue,
  },
  singleField: {
    marginTop: 30,
    backgroundColor: Colors.themeBackground,
    borderBottomColor: Colors.iOSBorder,
    borderBottomWidth: 1,
    borderTopColor: Colors.iOSBorder,
    borderTopWidth: 1,
  },
  groupedFields: {
    marginTop: 30,
    backgroundColor: Colors.themeBackground,
    borderBottomColor: Colors.iOSBorder,
    borderBottomWidth: 1,
    borderTopColor: Colors.iOSBorder,
    borderTopWidth: 1,
  },
  separator: {
    width: '93%',
    height: 1,
    marginLeft: '3.5%',
    backgroundColor: Colors.iOSBorder,
  },
  formView: {
    flex: 0,
    flexDirection: 'row',
    padding: 15,
  },
  formIcon: {
    position: 'absolute',
    bottom: 8,
    left: 20,
  },
  inputLabel: {
    position: 'relative',
    left: 45,
    fontSize: 18,
    fontFamily: "sf-prot-regular",
    color: Colors.textPrimary,
  },
  formInput: {
    height: 35,
    width: '20%',
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
    padding: 5,
    paddingTop: 2,
    color: Colors.textPrimary,
    fontSize: 38,
  },
});