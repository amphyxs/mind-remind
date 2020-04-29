import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Switch, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { getFormattedDate, getFormattedTime } from '../components/DateFunctions'; 
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

// Default input forms

export function FormPicker(props) {

  const [hasIcon, setHasIcon] = useState(props.icon != 'none');
  
  return (
    <View style={styles.formView}>
      {
        hasIcon ?
        <View>
          <Ionicons style={styles.formIcon} name={props.icon} size={32} color={Colors.iconLight} />
          <Text style={styles.inputLabel}>{props.title}</Text>
        </View>
        :
        <Text style={styles.inputLabelNoIcon}>{props.title}</Text>
      }
      <View style={{...styles.formInput, paddingTop: 10}}>
        <RNPickerSelect
          style={{
            iconContainer: {
              top: -2,
              right: -10,
            },
            inputIOS: {
              fontSize: 18,
            },
            inputIOSContainer: {
              position: 'absolute',
              right: 0,
            }
          }}
          placeholder={{}}
          items={props.items}
          onValueChange={value => {props.updater(value)}}
          value={props.value}
          useNativeAndroidPickerStyle={true}
        />
      </View> 
    </View>
  );
};

export function FormSwitch(props) {

  const [hasIcon, setHasIcon] = useState(props.icon != 'none');

  return (
    <View style={styles.formView}>
      {
        hasIcon ?
        <View>
          <Ionicons style={styles.formIcon} name={props.icon} size={32} color={Colors.iconLight} />
          <Text style={styles.inputLabel}>{props.title}</Text>
        </View>
        :
        <Text style={styles.inputLabelNoIcon}>{props.title}</Text>
      }
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

export function FormTextInput(props) {
  return (
    <View style={styles.formView}>
      <View style={styles.formTextInput}>
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          onChangeText={(text) => {props.valueHandler(text)}}
          defaultValue={props.value} 
          maxLength={props.maxLength}   
        />
      </View> 
    </View>
  );
};

export function FormMultilineTextInput(props) {
  return (
    <View style={styles.formView}>
      <View style={styles.formTextInput}>
        <TextInput
          style={styles.multilineTextInput}
          placeholder={props.placeholder}
          onChangeText={(text) => {props.valueHandler(text)}}
          defaultValue={props.value} 
          maxLength={props.maxLength}
          multiline={true}   
        />
      </View> 
    </View>
  );
};

export function FormDatePicker(props) {

  const [showPicker, setShowPicker] = useState(false);
  const [isDate, setIsDate] = useState(props.mode == 'date');
  const [isTime, setIsTiem] = useState(props.mode == 'time');
  const [selectedDate, setSelectedDate] = useState(props.value);
  const [hasIcon, setHasIcon] = useState(props.icon != 'none');

  return(
    <View style={styles.formView}>
      {
        hasIcon ?
        <View>
          <Ionicons style={styles.formIcon} name={props.icon} size={32} color={Colors.iconLight} />
          <Text style={styles.inputLabel}>{props.title}</Text>
        </View>
        :
        <Text style={styles.inputLabelNoIcon}>{props.title}</Text>
      }
      <TouchableWithoutFeedback
        onPress={() => {setShowPicker(!showPicker)}}
      >
        <View style={styles.formDateInput}>
          {
            isDate &&
            <Text style={styles.inputValue}>{getFormattedDate(selectedDate)}</Text>
          }
          {
            isTime &&
            <Text style={styles.inputValue}>{getFormattedTime(selectedDate)}</Text>
          }
        </View>
      </TouchableWithoutFeedback>
      {
        showPicker &&
        <View style={styles.datePicker} >
          <Separator/>
          <DateTimePicker
            value={selectedDate}
            mode={props.mode}
            is24Hour={true}
            display='default'
            onChange={(event, selectedDate) => {
              setSelectedDate(selectedDate);
              props.valueHandler(selectedDate);
            }}
          />
        </View>
      }
    </View>
  );
}

export function FormButton(props) {

  const [hasIcon, setHasIcon] = useState(props.icon != 'none');

  return (
    <View style={styles.formView}>
      <TouchableOpacity
        onPress={props.handler}
      >
        {
          hasIcon ?
          <View>
            <Ionicons style={styles.formIcon} name={props.icon} size={32} color={Colors.iconLight} />
            <Text style={styles.inputLabel}>{props.title}</Text>
          </View>
          :
          <Text style={styles.inputLabelNoIcon}>{props.title}</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

export function SingleField({children}) {
  return (
    <View style={styles.singleField}>
      {children}
    </View>
  );
};

export function GroupedFields({children}) {
  return (
    <View style={styles.groupedFields}>
      {children}
    </View>
  );
};

export function Separator() {
  return (
    <View style={styles.separator}/>
  );
};

const styles = StyleSheet.create({
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
    top: -5,
    // left: 20,
  },
  inputLabel: {
    position: 'relative',
    left: 45,
    fontSize: 18,
    fontFamily: "sf-prot-regular",
    color: Colors.textPrimary,
  },
  inputLabelNoIcon: {
    position: 'relative',
    left: 5,
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
  formTextInput: {
    color: Colors.textPrimary,
  },
  formDateInput: {
    position: 'absolute',
    top: 18,
    right: 25,
    fontSize: 29,
  },
  inputValue: {
    color: Colors.textPrimary,
    fontSize: 18,
  },
  textInput: {
    width: 400,
    height: 20,
    fontSize: 18,
  },
  datePicker: {
    width: '80%',
    marginTop: 35,
  },
  multilineTextInput: {
    width: 390,
    height: 100,
    fontSize: 19,
  }
});