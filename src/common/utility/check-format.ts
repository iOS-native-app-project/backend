/**
 * 날짜 형식 변경
 * @param date
 * @returns yyyy-MM-dd
 */
export const checkDateFormat = (date: Date) => {
  return new Date(+date + 3240 * 10000).toISOString().split('T')[0];
};

/**
 * 날짜 형식 변경
 * @param date
 * @returns yyyy-MM-dd HH:mm:ss
 */
export const checkDateFormatHH = (checkDate: Date) => {
  const date = new Date(checkDate);
  const year = date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let hour = '' + date.getUTCHours();
  let minute = '' + date.getUTCMinutes();
  let second = '' + date.getUTCSeconds();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (minute.length < 2) minute = '0' + minute;
  if (second.length < 2) second = '0' + second;

  return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
};
