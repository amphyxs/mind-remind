// Default fucntions for dates converting

export function getFormattedDate(dateObject, separator = '.', monthIncr = true) {  
  dateObject = new Date(dateObject);
  if(!monthIncr) {
    return dateObject.getUTCDate() + separator + dateObject.getUTCMonth() + separator + dateObject.getUTCFullYear()
  }
  return dateObject.getUTCDate() + separator + (dateObject.getUTCMonth() + 1) + separator + dateObject.getUTCFullYear()
};

export function getFormattedTime(dateObject, separator = ':') {
  dateObject = new Date(dateObject);
  let hours = dateObject.getHours();
  let mins = (dateObject.getUTCMinutes()).toString();
  if(mins.length < 2) mins = '0' + mins 
  return hours + separator + mins;
};

export function isEqualDates(dateA, dateB) {
  dateA = new Date(dateA);
  dateB = new Date(dateB);
  if(dateA.getUTCDate() == dateB.getUTCDate() && 
     dateA.getUTCMonth() == dateB.getUTCMonth() &&
     dateA.getUTCFullYear() == dateB.getUTCFullYear()) {
    return true;
  }
  return false;
};

export function countTimeUntill(date) {
  date = new Date(date);
  let current = new Date();
  let diff;
  if(date > current) {
    diff = date.getTime() - current.getTime();
    diff = new Date(diff);
    let hours = diff.getUTCHours();
    let mins = diff.getUTCMinutes() + 1;
    let value = '';
    if(hours != 0) {
      if(hours == 1) value += hours + ' hour ';
      else value += hours + ' hours ';
    }
    if(mins != 0) {
      if(mins == 1) value += mins + ' minute ';
      else value += mins + ' minutes ';
    }
    return value;
  }
  else if(date.getUTCHours() - current.getUTCHours() == 0 && date.getUTCMinutes() - current.getUTCMinutes() == 0) {
    return 'Now';
  }
  else {
    diff = current.getTime() - date.getTime();
    diff = new Date(diff);
    let hours = diff.getUTCHours();
    let mins = diff.getUTCMinutes() + 1;
    let value = 'Was ';
    if(hours != 0) {
      if(hours == 1) value += hours + ' hour ';
      else value += hours + ' hours ';
    }
    if(mins != 0) {
      if(mins == 1) value += mins + ' minute ';
      else value += mins + ' minutes ';
    }
    return value + 'ago';
  }
  // console.log(diff.getUTCHours() + ':' + diff.getUTCMinutes());
  return 'Null';
}