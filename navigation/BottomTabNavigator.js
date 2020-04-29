import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import TodayScreen from '../screens/TodayScreen';
import ScheduledScreen from '../screens/ScheduledScreen';
import CalendarScreen from '../screens/CalendarScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          title: 'Today',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-browsers" />,
        }}
      />
      <BottomTab.Screen
        name="Scheduled"
        component={ScheduledScreen}
        options={{
          title: 'Scheduled',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-clock" />,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-calendar" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
