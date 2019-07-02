import React from "react";
import Close from "@material-ui/icons/Close";
import CheckRounded from "@material-ui/icons/CheckRounded";
import LensIcon from "@material-ui/icons/Lens";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import BreakdownRow from "../BreakdownRow";

const MatchBreakdown2019 = ({ match }) => {
  match = match.toJS();
  const redTeams = match.alliances.red.team_keys.map(teamKey =>
    teamKey.replace("frc", "")
  );
  const blueTeams = match.alliances.blue.team_keys.map(teamKey =>
    teamKey.replace("frc", "")
  );
  const redBreakdown = match.score_breakdown.red;
  const blueBreakdown = match.score_breakdown.blue;
  return (
    <div>
      <BreakdownRow
        label="Teams"
        red={redTeams.map(team => (
          <span key={team} style={{ display: "block" }}>
            {team}
          </span>
        ))}
        blue={blueTeams.map(team => (
          <span key={team} style={{ display: "block" }}>
            {team}
          </span>
        ))}
        vertical={true}
        subtotal={true}
      />

      <BreakdownRow
        label="Robot 1 Sandstorm Bonus"
        red={getSandstormBonus(redBreakdown, 1)}
        blue={getSandstormBonus(blueBreakdown, 1)}
      />

      <BreakdownRow
        label="Robot 2 Sandstorm Bonus"
        red={getSandstormBonus(redBreakdown, 2)}
        blue={getSandstormBonus(blueBreakdown, 2)}
      />

      <BreakdownRow
        label="Robot 3 Sandstorm Bonus"
        red={getSandstormBonus(redBreakdown, 3)}
        blue={getSandstormBonus(blueBreakdown, 3)}
      />

      <BreakdownRow
        label="Total Sandstorm Bonus"
        red={redBreakdown.sandStormBonusPoints}
        blue={blueBreakdown.sandStormBonusPoints}
        total={true}
      />

      <BreakdownRow
        label={"Cargo Ship"}
        red={getCargoShipData(redBreakdown)}
        blue={getCargoShipData(blueBreakdown)}
      />

      <BreakdownRow
        label="Rocket 1"
        red={getRocketShipData(redBreakdown, "Near")}
        blue={getRocketShipData(blueBreakdown, "Near")}
      />

      <BreakdownRow
        label={"Rocket 2"}
        red={getRocketShipData(redBreakdown, "Far")}
        blue={getRocketShipData(blueBreakdown, "Far")}
      />

      <BreakdownRow
        label="Total Hatch Panels"
        red={ImageCount(
          hatchPanelImage,
          `${redBreakdown.hatchPanelPoints / 2} (+${
            redBreakdown.hatchPanelPoints
          })`
        )}
        blue={ImageCount(
          hatchPanelImage,
          `${blueBreakdown.hatchPanelPoints / 2} (+${
            blueBreakdown.hatchPanelPoints
          })`
        )}
        subtotal={true}
      />

      <BreakdownRow
        label="Total Points Cargo"
        red={ImageCount(
          cargoImage,
          `${redBreakdown.cargoPoints / 3} (+${redBreakdown.cargoPoints})`
        )}
        blue={ImageCount(
          cargoImage,
          `${blueBreakdown.cargoPoints / 3} (+${blueBreakdown.cargoPoints})`
        )}
        subtotal={true}
      />

      <BreakdownRow
        label="Robot 1 HAB Climb"
        red={getHABClimb(redBreakdown, 1)}
        blue={getHABClimb(blueBreakdown, 1)}
      />

      <BreakdownRow
        label="Robot 2 HAB Climb"
        red={getHABClimb(redBreakdown, 2)}
        blue={getHABClimb(blueBreakdown, 2)}
      />

      <BreakdownRow
        label="Robot 3 HAB Climb"
        red={getHABClimb(redBreakdown, 3)}
        blue={getHABClimb(blueBreakdown, 3)}
      />

      <BreakdownRow
        label="HAB Climb Points"
        red={redBreakdown.habClimbPoints}
        blue={blueBreakdown.habClimbPoints}
        subtotal={true}
      />

      <BreakdownRow
        label="Total Teleop"
        red={redBreakdown.teleopPoints}
        blue={blueBreakdown.teleopPoints}
        total={true}
      />

      <BreakdownRow
        label="Complete Rocket"
        red={redBreakdown.completeRocketRankingPoint ? vIcon : xIcon}
        blue={blueBreakdown.completeRocketRankingPoint ? vIcon : xIcon}
      />

      <BreakdownRow
        label="HAB Docking"
        red={redBreakdown.habDockingRankingPoint ? vIcon : xIcon}
        blue={blueBreakdown.habDockingRankingPoint ? vIcon : xIcon}
      />

      <BreakdownRow
        label="Fouls"
        red={`+${redBreakdown.foulPoints}`}
        blue={`+${blueBreakdown.foulPoints}`}
      />

      <BreakdownRow
        label="Adjustments"
        red={redBreakdown.adjustPoints}
        blue={blueBreakdown.adjustPoints}
      />

      <BreakdownRow
        label="Total Score"
        red={redBreakdown.totalPoints}
        blue={blueBreakdown.totalPoints}
        total={true}
      />

      {match.comp_level === "qm" ? (
        <BreakdownRow
          label="Ranking Points"
          red={`+${redBreakdown.rp} RP`}
          blue={`+${blueBreakdown.rp} RP`}
        />
      ) : null}
    </div>
  );
};

const nullHatchPanelImage = (
  <Tooltip title="Null Hatch Panel" placement="top">
    <TripOriginIcon style={{ fill: "#616161" }} />
  </Tooltip>
);
const hatchPanelImage = (
  <Tooltip title="Hatch Panel" placement="top">
    <TripOriginIcon style={{ fill: "#ffeb3b" }} />
  </Tooltip>
);
const cargoImage = (
  <Tooltip title="Cargo" placement="top">
    <LensIcon style={{ fill: "#ff6d00" }} />
  </Tooltip>
);
const xIcon = <Close />;
const vIcon = <CheckRounded />;

const ImageCount = (image, count) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {image}
      <div
        style={{ paddingLeft: 1, paddingRight: 4, lineHeight: 1, fontSize: 14 }}
      >
        {count}
      </div>
    </div>
  );
};

const getSandstormBonus = (breakdown, robotNumber) => {
  if (breakdown["habLineRobot" + robotNumber] === "CrossedHabLineInSandstorm") {
    const result = breakdown["preMatchLevelRobot" + robotNumber];
    if (result.includes("HabLevel")) {
      const level = result.substr(-1);
      const climbPoints = [3, 6];
      return `Level ${level} (+${climbPoints[level - 1]})`;
    }
  }
  return xIcon;
};

const getHABClimb = (breakdown, robotNumber) => {
  const result = breakdown["endgameRobot" + robotNumber];
  if (result.includes("HabLevel")) {
    const level = result.substr(-1);
    const climbPoints = [3, 6, 12];
    return `Level ${level} (+${climbPoints[level - 1]})`;
  }
  return xIcon;
};

const getCargoShipData = breakdown => {
  let nullPanelCount = 0;
  let panelCount = 0;
  let cargoCount = 0;

  for (let i = 1; i <= 8; i++) {
    let key = `bay${i}`;

    if (breakdown[key].includes("Panel")) {
      let nullKey = `preMatchBay${i}`;

      // Safeguard against against bays 4 and 5, which will never have null hatches
      let isNullHatch =
        breakdown.hasOwnProperty(nullKey) &&
        breakdown[nullKey].includes("Panel");

      if (isNullHatch) {
        nullPanelCount++;
      } else {
        panelCount++;
      }
    }
    if (breakdown[key].includes("Cargo")) {
      cargoCount++;
    }
  }

  return [
    ImageCount(nullHatchPanelImage, nullPanelCount),
    ImageCount(hatchPanelImage, panelCount),
    ImageCount(cargoImage, cargoCount),
  ];
};

const getRocketShipData = (breakdown, rocketLocation) => {
  const locations = [
    "topLeftRocket",
    "topRightRocket",
    "midLeftRocket",
    "midRightRocket",
    "lowLeftRocket",
    "lowRightRocket",
  ];
  let panelCount = 0;
  let cargoCount = 0;
  locations.forEach(location => {
    if (breakdown[location + rocketLocation].includes("Panel")) {
      panelCount++;
    }
    if (breakdown[location + rocketLocation].includes("Cargo")) {
      cargoCount++;
    }
  });

  return [
    ImageCount(hatchPanelImage, panelCount),
    ImageCount(cargoImage, cargoCount),
  ];
};

MatchBreakdown2019.propTypes = {
  match: PropTypes.object.isRequired,
};

export default React.memo(MatchBreakdown2019);
