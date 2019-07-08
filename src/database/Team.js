import { Record } from "immutable";

export default class Team extends Record({
  key: undefined,
  team_number: undefined,
  name: undefined,
  nickname: undefined,
  city: undefined,
  state_prov: undefined,
  country: undefined,
  rookie_year: undefined,
  website: undefined,
}) {
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
  //       this.cityStateCountryLower = this.getCityStateCountry().toLowerCase();
  //     } else {
  //       this.cityStateCountryLower = null;
  //     }
  //   }
  //   return this.cityStateCountryLower;
  // }
  //
  // getNicknameLower() {
  //   if (this.nicknameLower === undefined) {
  //     if (this.nickname) {
  //       this.nicknameLower = this.nickname.toLowerCase();
  //     } else {
  //       this.nicknameLower = null;
  //     }
  //   }
  //   return this.nicknameLower;
  // }
  //
  // getTeamNumberString() {
  //   if (this.teamNumberString === undefined) {
  //     this.teamNumberString = String(this.team_number);
  //   }
  //   return this.teamNumberString;
  // }
  //
  // getTeamNameWithBreaks() {
  //   if (this.teamNameWithBreaks === undefined) {
  //     this.teamNameWithBreaks = this.name
  //       .replace(/\//g, "/\u200B")
  //       .replace(/\?/g, "?\u200B");
  //   }
  //   return this.teamNameWithBreaks;
  // }
}
