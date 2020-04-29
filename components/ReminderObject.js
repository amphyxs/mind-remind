import React, { useState, useEffect } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

var permissionsGranted = false;

export class ReminderObject {
  
  // Class for creating reminder instance

  // Notificatons options
  reminder = {
    title: '',
    body: '', 
    icon: 'bell',
    ios: { 
      sound: true,
      _displayInForeground: true,
    },
    android: {
      sound: true, 
      priority: 'high', 
      sticky: false, 
      vibrate: true 
    }
  };
  schedulingOptions = {
    time: new Date(), 
  };

  constructor(name, description, time, repeat, icon) {
    this.reminder.title = name;
    this.reminder.body = description;
    this.schedulingOptions.time = time;
    this.reminder.icon = icon;
    // Converting to UTC format
    this.schedulingOptions.time.setHours(this.schedulingOptions.time.getHours());
    this.schedulingOptions.time.setMonth(this.schedulingOptions.time.getUTCMonth());
    this.schedulingOptions.time.setSeconds(0);
    if(repeat != 'none') this.schedulingOptions.repeat = repeat; 
  };

  static getPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if(status == 'granted') permissionsGranted = true;
    else permissionsGranted = false;
  };

  scheduleNotification = async () => {
    if(!permissionsGranted) ReminderObject.getPermissions();
    let promiseId = Notifications.scheduleLocalNotificationAsync(this.reminder, this.schedulingOptions);
    return promiseId;
  };
}