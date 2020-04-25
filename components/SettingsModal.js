import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
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

  const updateSetting = (property, value) => {
    settings.property = value;
    setSettings(setting);
  }
  
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
            <View style={styles.singleField}>
              <FormPicker
                title='Color theme'
                items={themes}
                value={themeForm}
                updater={(value) => {setThemeForm(value)}}
                icon='ios-arrow-down'
              />
            </View>
            <View style={styles.groupedFields}>
              <FormSwitch
                title='Sound'
                toggle={() => {setSoundForm(!soundForm)}}
                value={soundForm}
              />
              <View style={styles.separator}></View>
              <FormSwitch
                title='Sound'
                toggle={() => {setSoundForm(!soundForm)}}
                value={soundForm}
              />
              <View style={styles.separator}></View>
              <FormSwitch
                title='Sound'
                toggle={() => {setSoundForm(!soundForm)}}
                value={soundForm}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function FormPicker(props) {
  return (
    <View style={styles.formView}>
      <Text style={styles.inputLabel}>{props.title}</Text>
      <View style={{...styles.formInput, paddingTop: 10}}>
        <RNPickerSelect
          style={{
            iconContainer: {
              top: -2,
              right: -10,
            },
            alignSelf: 'flex-end'
          }}
          placeholder={{}}
          items={props.items}
          onValueChange={value => {props.updater(value)}}
          value={props.value}
          useNativeAndroidPickerStyle={true}
          Icon={() => {
            return <Ionicons name={props.icon} size={21} color="gray" />;
          }}
        />
      </View> 
    </View>
  );
};

function FormSwitch(props) {
  return (
    <View style={styles.formView}>
      <Text style={styles.inputLabel}>{props.title}</Text>
      <View style={styles.formInput}>
        <Switch 
          style={{alignSelf: 'flex-end'}}
          trackColor={{false: '#acacac', true: Colors.iOSGreen }}
          thumbColor='#fafafa'
          ios_backgroundColor='#fafafa'
          onValueChange={props.toggle}
          value={props.value}
        />
      </View> 
    </View>
  );
};

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
    backgroundColor: Colors.themeBackground,
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
  inputLabel: {
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