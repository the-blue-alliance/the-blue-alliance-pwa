import React from "react";
import { Record } from "immutable";
import { DateTime } from "luxon";
import escape from "escape-html";

export const REGIONAL = 0;
export const DISTRICT = 1;
export const DISTRICT_CMP = 2;
export const CMP_DIVISION = 3;
export const CMP_FINALS = 4;
export const DISTRICT_CMP_DIVISION = 5;
export const FOC = 6;
export const OFFSEASON = 99;
export const PRESEASON = 100;

const CMP_TYPES = new Set([CMP_DIVISION, CMP_FINALS]);

const OFFICIAL_TYPES = new Set([
  REGIONAL,
  DISTRICT,
  DISTRICT_CMP_DIVISION,
  DISTRICT_CMP,
  CMP_DIVISION,
  CMP_FINALS,
  FOC,
]);

class Event extends Record({
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
  address: undefined,
  city: undefined,
  state_prov: undefined,
  country: undefined,
  postal_code: undefined,
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

  // Time
  getDateString() {
    if (this.dateStr === undefined) {
      const startDate = DateTime.fromISO(this.start_date);
      const endDate = DateTime.fromISO(this.end_date);
      // like "Aug 6, 2019"
      this.dateStr = endDate.toFormat("LLL d, yyyy").replace(/ /g, "\u00a0");
      if (this.start_date !== this.end_date) {
        // Like "Aug 5"
        const startDateStr = startDate.toFormat("LLL d");
        this.dateStr = `${startDateStr.replace(
          / /g,
          "\u00a0"
        )} to ${this.dateStr.replace(/ /g, "\u00a0")}`;
      }
    }
    return this.dateStr;
  }

  startDateTime() {
    return DateTime.fromISO(this.start_date, { zone: this.timezone });
  }

  endDateTime() {
    // Add time because end_date is 11:59:59 PM
    return DateTime.fromISO(this.end_date, { zone: this.timezone }).plus({
      hours: 23,
      minutes: 59,
      seconds: 59,
    });
  }

  // withinDays(negativeDaysBefore, daysAfter) {
  //   const now = moment.now()
  //   const afterStart = this.startDateTime().add(negativeDaysBefore, 'days') < now
  //   const beforeEnd = this.endDateTime().add(daysAfter, 'days') > now
  //   return afterStart && beforeEnd
  // }
  //
  isNow() {
    return !this.isPast() && !this.isFuture();
  }

  isPast() {
    return this.endDateTime() < DateTime.local();
  }

  isFuture() {
    return this.startDateTime() > DateTime.local();
  }

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
  //   const offset = moment.duration(this.startDateTime() - closestWed).asDays()
  //   return Math.abs(offset) <= 4
  // }

  // Event type
  isCMP() {
    return CMP_TYPES.has(this.event_type);
  }

  isDistrictQual() {
    return this.event_type === DISTRICT;
  }

  isFOC() {
    return this.event_type === FOC;
  }

  isOfficial() {
    return OFFICIAL_TYPES.has(this.event_type);
  }

  isRegional() {
    return this.event_type === REGIONAL;
  }

  structuredData() {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Event",
            name: escape(this.name),
            startDate: escape(this.startDateTime().toISO()),
            endDate: escape(this.endDateTime().toISO()),
            location: {
              "@type": "Place",
              name: escape(this.location_name),
              address: {
                "@type": "PostalAddress",
                streetAddress: escape(this.address),
                addressLocality: escape(this.city),
                addressRegion: escape(this.state_prov),
                addressCountry: escape(this.country),
                postalCode: escape(this.postal_code),
              },
            },
          }),
        }}
      />
    );
  }
}

Event.sortByDate = (a, b) => {
  // Sort by date
  if (a.start_date < b.start_date) {
    return -1;
  }
  if (a.start_date > b.start_date) {
    return 1;
  }
  if (a.end_date < b.end_date) {
    return -1;
  }
  if (a.end_date > b.end_date) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export default Event;
