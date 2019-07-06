import { Record } from "immutable";
import { DateTime } from "luxon";

const COMP_LEVELS = {
  qm: "Quals",
  ef: "Octos",
  qf: "Quarters",
  sf: "Semis",
  f: "Finals",
};
const PLAY_ORDER = {
  qm: 1,
  ef: 2,
  qf: 3,
  sf: 4,
  f: 5,
};
const rpAText = {
  2016: "Defenses Breached",
  2017: "Pressure Reached",
  2018: "Auto Quest",
  2019: "Complete Rocket",
};
const rpBText = {
  2016: "Tower Captured",
  2017: "All Rotors Engaged",
  2018: "Face the Boss",
  2019: "HAB Docking",
};

export default class Match extends Record({
  key: undefined,
  event_key: undefined,
  comp_level: undefined,
  set_number: undefined,
  match_number: undefined,
  alliances: undefined,
  time: undefined,
  predicted_time: undefined,
  winning_alliance: undefined,
  score_breakdown: undefined,
  videos: undefined,
}) {
  getDisplayName(short = false) {
    if (this.comp_level === "qm" || this.comp_level === "f") {
      return `${COMP_LEVELS[this.comp_level]} ${this.match_number}`;
    } else {
      return `${COMP_LEVELS[this.comp_level]} ${this.set_number}${
        short ? "\u00A0-\u00A0" : " Match "
      }${this.match_number}`;
    }
  }

  getYear() {
    return parseInt(this.key.substring(0, 4), 10);
  }

  getNaturalOrder() {
    return (
      PLAY_ORDER[this.comp_level] * 100000 +
      this.set_number * 100 +
      this.match_number
    );
  }

  isDQ(teamKey) {
    return (
      this.getIn(["alliances", "red", "dq_team_keys"]).includes(teamKey) ||
      this.getIn(["alliances", "blue", "dq_team_keys"]).includes(teamKey)
    );
  }

  isSurrogate(teamKey) {
    return (
      this.getIn(["alliances", "red", "surrogate_team_keys"]).includes(
        teamKey
      ) ||
      this.getIn(["alliances", "blue", "surrogate_team_keys"]).includes(teamKey)
    );
  }

  getTimeStr() {
    return DateTime.fromISO(this.time).toFormat("ddd h:mm A");
  }

  getPredictedTimeStr() {
    return DateTime.fromISO(this.predicted_time).toFormat("ddd h:mm A");
  }

  hasBeenPlayed() {
    return (
      this.alliances.getIn(["red", "score"]) !== -1 &&
      this.alliances.getIn(["blue", "score"]) !== -1
    );
  }

  isOnAlliance(teamKey, color) {
    return this.getIn(["alliances", color, "team_keys"]).includes(teamKey);
  }

  rpEarnedA(color) {
    const breakdown = this.getIn(["score_breakdown", color]);
    return !!(
      breakdown &&
      ((this.getYear() === 2017 &&
        (breakdown.get("kPaRankingPointAchieved") ||
          breakdown.get("kPaBonusPoints"))) ||
        (this.getYear() === 2018 && breakdown.get("autoQuestRankingPoint")))
    );
  }

  rpEarnedB(color) {
    const breakdown = this.getIn(["score_breakdown", color]);
    return !!(
      breakdown &&
      ((this.getYear() === 2017 &&
        (breakdown.get("rotorRankingPointAchieved") ||
          breakdown.get("rotorBonusPoints"))) ||
        (this.getYear() === 2018 && breakdown.get("faceTheBossRankingPoint")))
    );
  }

  rpEarnedTextA() {
    return rpAText[this.getYear()];
  }

  rpEarnedTextB() {
    return rpBText[this.getYear()];
  }

  // getPlayOrder() {
  //   return PLAY_ORDER[this.comp_level]*100000 + this.match_number*100 + this.set_number
  // }
  //
  // hasTeamKey(teamKey) {
  //   return this.getIn(['alliances', 'red', 'team_keys']).includes(teamKey) || this.getIn(['alliances', 'blue', 'team_keys']).includes(teamKey)
  // }
}
