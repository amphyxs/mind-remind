import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Switch } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FormSwitch, FormTextInput, FormMultilineTextInput, SingleField, GroupedFields, FormPicker, FormDatePicker, Separator } from '../components/Forms';
import { getIconsList } from '../components/SVGIcons';
import { ReminderObject } from '../components/ReminderObject';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export function CreateRemModal(props) {

  const [remTitle, setRemTitle] = useState('');
  const [remDescription, setRemDescription] = useState('');
  const [remDate, setRemDate] = useState(new Date());
  const [remTime, setRemTime] = useState(new Date());
  const [remRepeat, setRemRepeat] = useState('none');
  const [remNotification, setRemNotification] = useState(true);
  const [remIcon, setRemIcon] = useState('bell');

  // Function for assembling a reminder object from given values
  const createReminder = () => {
    if(remTitle == '') setRemTitle(' ');
    if(remDescription == '') setRemDescription(' ');
    let remFullDate = new Date(remDate);
    remFullDate.setHours(remTime.getHours());
    remFullDate.setMinutes(remTime.getUTCMinutes());
    let remObject = new ReminderObject(remTitle, remDescription, remFullDate, remRepeat, remIcon);
    if(remNotification) {
      let id = remObject.scheduleNotification();
      remObject.reminder.id = id;
    }
    return remObject;
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
            <Text style={styles.modalHeader}>New reminder</Text>
            <TouchableOpacity style={styles.modalRightAction}
              onPress={() => {
                props.addReminder(createReminder());
                props.hide();
              }}
            >
              <Text style={styles.modalRightActionText}>Save</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <GroupedFields>
              <FormTextInput
                placeholder='Name'
                valueHandler={(value) => {setRemTitle(value)}}
                value={remTitle}
                maxLength={30}
              />
              <Separator/>
              <FormMultilineTextInput
                placeholder='Description'
                valueHandler={(value) => {setRemDescription(value)}}
                value={remDescription}
                maxLength={130}
              />
              <Separator/>
              <FormPicker
                title='Icon'
                icon='none'
                items={getIconsList()}
                value={remIcon}
                updater={(value) => {setRemIcon(value)}}
              />
            </GroupedFields>
            <GroupedFields>
              <FormDatePicker
                title='Date'
                icon='none'
                mode='date'
                valueHandler={(value) => {setRemDate(value)}}
                value={remDate}
              />
              <Separator/>
              <FormDatePicker
                title='Time'
                icon='none'
                mode='time'
                valueHandler={(value) => {setRemTime(value)}}
                value={remTime}
              />
              <Separator/>
              <FormPicker
                title='Repeat'
                icon='none'
                items={[
                  {label: 'None', value: 'none'},
                  {label: 'Minute', value: 'minute'},
                  {label: 'Hour', value: 'hour'},
                  {label: 'Month', value: 'month'},
                  {label: 'Year', value: 'year'},
                ]}
                value={remRepeat}
                updater={(value) => {setRemRepeat(value)}}
              />
            </GroupedFields>
            <GroupedFields>
              <FormSwitch
                title='Notification'
                icon='none'
                toggle={() => {setRemNotification(!remNotification)}}
                value={remNotification}
              />
            </GroupedFields>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
    backgroundColor: Colors.modalHeaderBackground,
    borderBottomColor: Colors.iOSBorder,
    borderBottomWidth: 1,
    textAlign: 'center',
    alignContent: 'center',
  },
  modalHeader: {
    position: 'absolute',
    left: '42%',
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
});