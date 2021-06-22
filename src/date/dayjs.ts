const C = {
  INVALID_DATE_STRING: 'Invalid Date'
}

export enum DateUnits {
  Y = 'year',
  M = 'month',
  D = 'day',
  H = 'hour',
  MIN = 'minute',
  S = 'second',
  MS = 'millisecond'
}

const isDayjs = (d: unknown) => d instanceof Dayjs

export class Dayjs {
  private date: Date

  year: number = 0
  month: number = 0
  day: number = 0
  hour: number = 0
  minute: number = 0
  second: number = 0
  millisecond: number = 0

  constructor(date: Date) {
    this.date = date
    this.init()
  }

  init() {
    const { date } = this
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.day = date.getDay()
    this.hour = date.getHours()
    this.minute = date.getMinutes()
    this.second = date.getSeconds()
    this.millisecond = date.getMilliseconds()
  }

  valueOf() {
    return this.date.getTime()
  }

  isValid() {
    return !(this.date.toString() === C.INVALID_DATE_STRING)
  }

  clone() {
    return new Dayjs(this.date)
  }

  add(n: number, units: DateUnits) {
    
  }

}

export function dayjs(date: Dayjs): Dayjs
export function dayjs(date: Date): Dayjs
export function dayjs(date: any) {
  if (isDayjs(date)) {
    return date.clone()
  }

  return new Dayjs(date)
}