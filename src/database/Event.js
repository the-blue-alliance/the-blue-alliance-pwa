import { Record } from "immutable";
// import moment from 'moment-timezone'

export const REGIONAL = 0;
export const DISTRICT = 1;
export const DISTRICT_CMP = 2;
export const CMP_DIVISION = 3;
export const CMP_FINALS = 4;
export const DISTRICT_CMP_DIVISION = 5;
export const FOC = 6;
export const OFFSEASON = 99;
export const PRESEASON = 100;

// const CMP_TYPES = new Set([
//   CMP_DIVISION,
//   CMP_FINALS,
// ])

// const OFFICIAL_TYPES = new Set([
//   REGIONAL,
//   DISTRICT,
//   DISTRICT_CMP_DIVISION,
//   DISTRICT_CMP,
//   CMP_DIVISION,
//   CMP_FINALS,
//   FOC,
// ])

export default class Event extends Record({
  key: undefined,
  name: undefined,
  short_name: undefined,
  year: undefined,
  event_code: undefined,
  week: undefined,
  event_type: undefined,
  district: undefined,
  start_date: undefined,
  end_date: undefined,
  timezone: undefined,
  city: undefined,
  state_prov: undefined,
  country: undefined,
  location_name: undefined,
  gmaps_url: undefined,
  website: undefined,
  webcasts: undefined,
  playoff_type: undefined,
}) {
  // Name
  safeShortName() {
    return this.short_name ? this.short_name : this.name;
  }

  // Location
  getCityStateCountry() {
    if (this.cityStateCountry === undefined) {
      this.cityStateCountry = "";
      if (this.city) {
        this.cityStateCountry += `${this.city}`;
      }
      if (this.state_prov) {
        this.cityStateCountry += `, ${this.state_prov}`;
      }
      if (this.country) {
        this.cityStateCountry += `, ${this.country}`;
      }
      if (this.cityStateCountry === "") {
        this.cityStateCountry = null;
      }
    }
    return this.cityStateCountry;
  }

  // getCityStateCountryLower() {
  //   if (this.cityStateCountryLower === undefined) {
  //     if (this.getCityStateCountry()) {
  //       this.cityStateCountryLower = this.getCityStateCountry().toLowerCase()
  //     } else {
  //       this.cityStateCountryLower = null
  //     }
  //   }
  //   return this.cityStateCountryLower
  // }

  // // Time
  // getDateString() {
  //   if (this.dateStr === undefined) {
  //     const startDate = moment(this.start_date)
  //     const endDate = moment(this.end_date)
  //     this.dateStr = endDate.format('MMM D, YYYY').replace(/ /g, '\u00a0')
  //     if (this.start_date !== this.end_date) {
  //       const startDateStr = startDate.format('MMM D')
  //       this.dateStr = `${startDateStr.replace(/ /g, '\u00a0')} to ${this.dateStr.replace(/ /g, '\u00a0')}`
  //     }
  //   }
  //   return this.dateStr
  // }
  //
  // startMoment() {
  //   return moment.tz(this.start_date, this.timezone)
  // }
  //
  // endMoment() {
  //   // Add one day because end_date is 12 AM
  //   return moment.tz(this.end_date, this.timezone).add(1, 'days')
  // }

  // withinDays(negativeDaysBefore, daysAfter) {
  //   const now = moment.now()
  //   const afterStart = this.startMoment().add(negativeDaysBefore, 'days') < now
  //   const beforeEnd = this.endMoment().add(daysAfter, 'days') > now
  //   return afterStart && beforeEnd
  // }
  //
  // isNow() {
  //   return !this.isPast() && !this.isFuture()
  // }
  //
  // isPast() {
  //   return this.endMoment() < moment.now()
  // }
  //
  // isFuture() {
  //   return this.startMoment() > moment.now()
  // }

  // isThisWeek() {
  //   // An event is this week iff
  //   // 1) The event is within 1 day of now
  //   // OR
  //   // 2) The event start date is on or within 4 days of the closest Wednesday
  //   if (this.withinDays(-1, 1)) {
  //     return true
  //   }
  //   const wed = 4
  //   const thisWed = moment().isoWeekday(4)
  //   const nextWed = moment().add(1, 'weeks').isoWeekday(wed)
  //   const today = moment.now()
  //   let closestWed
  //   if (Math.abs(thisWed.diff(today)) < Math.abs(nextWed.diff(today))) {
  //     closestWed = thisWed
  //   } else {
  //     closestWed = nextWed
  //   }
  //   const offset = moment.duration(this.startMoment() - closestWed).asDays()
  //   return Math.abs(offset) <= 4
  // }

  // // Event type
  // isCMP() {
  //   return CMP_TYPES.has(this.event_type)
  // }

  // isDistrictQual() {
  //   return this.event_type === DISTRICT
  // }

  // isFOC() {
  //   return this.event_type === FOC
  // }

  // isPreseason() {
  //   return this.event_type === PRESEASON
  // }

  // isOfficial() {
  //   return OFFICIAL_TYPES.has(this.event_type)
  // }

  // isRegional() {
  //   return this.event_type === REGIONAL
  // }
}
