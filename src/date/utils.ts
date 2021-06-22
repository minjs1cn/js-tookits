import { WeekTexts } from "../constant"

export const date2json = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const weekDay = date.getDay()
  const millisecond = date.getMilliseconds()
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekDay,
    millisecond
  }
}

export const dateFormat = (formatter = 'YYYY-MM-DD', time: Date) => {
  const {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekDay,
    millisecond
  } = date2json(time)
  return formatter
    .replace('YYYY', year + '')
    .replace('MM', String(month)[1] ? month + '' : `0${month}`)
    .replace('DD', String(day)[1] ? day + '' : `0${day}`)
    .replace('hh', String(hour)[1] ? hour + '' : `0${hour}`)
    .replace('mm', String(minute)[1] ? minute + '' : `0${minute}`)
    .replace('ss', String(second)[1] ? second + '' : `0${second}`)
    .replace('SSS', millisecond + '')
    .replace('ww', weekDay + '')
    .replace('WW', WeekTexts[weekDay])
}
