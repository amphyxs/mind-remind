import React, { useState } from 'react';
import Svg, { Path } from "react-native-svg"

// Default SVG Icons

export function getIconsList() {
  return [
    {label: 'Bell', value: 'bell'},
    {label: 'Dumbell', value: 'dumbell'},
    {label: 'Computer', value: 'computer'},
  ];
}

export function SVGIcon(props) {
  if(props.icon == "dumbbell") {
    return (
      <Svg
        style={{
          width: props.width,
          height: props.height,
        }}
        viewBox="0 0 24 24"
        {...props}
      >
        <Path
          fill={props.color}
          d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
        />
      </Svg>
    )
  }
  if(props.icon == "computer") {
    return (
      <Svg
        style={{
          width: props.width,
          height: props.height,
        }}
        viewBox="0 0 24 24"
        {...props}
      >
        <Path
          fill="currentColor"
          d="M4 6h16v10H4m16 2a2 2 0 002-2V6a2 2 0 00-2-2H4c-1.11 0-2 .89-2 2v10a2 2 0 002 2H0v2h24v-2h-4z"
        />
      </Svg>
    )
  }
  if(props.icon == "bell") {
    return (
      <Svg
        style={{
          width: props.width,
          height: props.height,
        }}
        viewBox="0 0 24 24"
        {...props}
      >
        <Path
          fill="currentColor"
          d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 012-2 2 2 0 012 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 01-2 2 2 2 0 01-2-2"
        />
      </Svg>
    )
  }
}