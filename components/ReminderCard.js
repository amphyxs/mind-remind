import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SVGIcon } from '../components/SVGIcons' 
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export function ReminderCard(props) {
  return (
    <Swipeable
      renderLeftActions={() => {
        return(
          <View style={styles.itemBackActions}>
            <TouchableOpacity 
              style={styles.leftAction}
              onPress={() => {props.doneAction}}
            >
              <Ionicons style={styles.actionIcon} name='ios-checkmark' size={52} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
        );
      }}
      renderRightActions={() => {
        return (
          <View style={styles.itemBackActions}>
            <TouchableOpacity 
              style={styles.rightAction}
              onPress={() => {props.failedAction}}  
            >
              <Ionicons style={styles.actionIcon} name='ios-close' size={52} color={'#ffffff'} />
            </TouchableOpacity>
          </View>
        );
      }}
      friction={2.5}
    >
      <TouchableWithoutFeedback
        onLongPress={() => {props.longPressAction}}
      >
        <View style={styles.card}>
          <SVGIcon
            style={styles.icon}
            icon={props.icon}
            height='45'
            width='45'
            color={props.iconColor}
          />
          <View style={styles.data}>
            <Text style={styles.header}>{props.title}</Text>
            <Text style={styles.time}>{props.time}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    marginBottom: 2,
    borderColor: Colors.reminderCardBorder,
    borderRadius: 14,
    borderWidth: 0.5,
    backgroundColor: Colors.reminderCardBackground,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 2.62,
    elevation: 3,
  },
  icon: {
    marginTop: '1.5%',
  },
  data: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
    marginLeft: 10,
  },
  header: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontFamily: 'sf-prod-regular'
  },
  time: {
    marginLeft: 2,
    color: Colors.textLight,
    fontSize: 16,
    fontFamily: 'sf-prot-regular',
  },
  itemBackActions: {
    justifyContent: 'center',
  },
  leftAction: {
    height: 70,
    width: 70,
    paddingTop: 5,
    paddingLeft: 25,
    marginLeft: 15,
    justifyContent: 'center',
    backgroundColor: Colors.iOSGreen,
    borderRadius: 100
  },
  rightAction: {
    height: 70,
    width: 70,
    paddingTop: 5,
    paddingLeft: 25,
    marginRight: 15,
    justifyContent: 'center',
    backgroundColor: Colors.iOSRed,
    borderRadius: 100
  },
});