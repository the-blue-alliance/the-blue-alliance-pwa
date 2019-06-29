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
        data={[
          "Teams",
          redTeams.map(team => (
            <span key={team} style={{ display: "block" }}>
              {team}
            </span>
          )),
          blueTeams.map(team => (
            <span key={team} style={{ display: "block" }}>
              {team}
            </span>
          )),
        ]}
        vertical={true}
        subtotal={true}
      />

      <BreakdownRow
        data={[
          "Robot 1 Sandstorm Bonus",
          getSandstormBonusFor(redBreakdown, 1),
          getSandstormBonusFor(blueBreakdown, 1),
        ]}
      />

      <BreakdownRow
        data={[
          "Robot 2 Sandstorm Bonus",
          getSandstormBonusFor(redBreakdown, 2),
          getSandstormBonusFor(blueBreakdown, 2),
        ]}
      />

      <BreakdownRow
        data={[
          "Robot 3 Sandstorm Bonus",
          getSandstormBonusFor(redBreakdown, 3),
          getSandstormBonusFor(blueBreakdown, 3),
        ]}
      />

      <BreakdownRow
        data={[
          "Total Sandstorm Bonus",
          redBreakdown.sandStormBonusPoints,
          blueBreakdown.sandStormBonusPoints,
        ]}
        total={true}
      />

      <BreakdownRow
        data={[
          "Cargo Ship",
          getCargoShipDataFor(redBreakdown),
          getCargoShipDataFor(blueBreakdown),
        ]}
      />

      <BreakdownRow
        data={[
          "Rocket 1",
          getRocketShipDataFor(redBreakdown, "Near"),
          getRocketShipDataFor(blueBreakdown, "Near"),
        ]}
      />

      <BreakdownRow
        data={[
          "Rocket 2",
          getRocketShipDataFor(redBreakdown, "Far"),
          getRocketShipDataFor(blueBreakdown, "Far"),
        ]}
      />

      <BreakdownRow
        data={[
          "Total Hatch Panels",
          ImageCount(
            hatchPanelImage,
            `${redBreakdown.hatchPanelPoints / 2} (+${
              redBreakdown.hatchPanelPoints
            })`
          ),
          ImageCount(
            hatchPanelImage,
            `${blueBreakdown.hatchPanelPoints / 2} (+${
              blueBreakdown.hatchPanelPoints
            })`
          ),
        ]}
        subtotal={true}
      />

      <BreakdownRow
        data={[
          "Total Points Cargo",
          ImageCount(
            cargoImage,
            `${redBreakdown.cargoPoints / 3} (+${redBreakdown.cargoPoints})`
          ),
          ImageCount(
            cargoImage,
            `${blueBreakdown.cargoPoints / 3} (+${blueBreakdown.cargoPoints})`
          ),
        ]}
        subtotal={true}
      />

      <BreakdownRow
        data={[
          "Robot 1 HAB Climb",
          getHABClimbFor(redBreakdown, 1),
          getHABClimbFor(blueBreakdown, 1),
        ]}
      />

      <BreakdownRow
        data={[
          "Robot 2 HAB Climb",
          getHABClimbFor(redBreakdown, 2),
          getHABClimbFor(blueBreakdown, 2),
        ]}
      />

      <BreakdownRow
        data={[
          "Robot 3 HAB Climb",
          getHABClimbFor(redBreakdown, 3),
          getHABClimbFor(blueBreakdown, 3),
        ]}
      />

      <BreakdownRow
        data={[
          "HAB Climb Points",
          redBreakdown.habClimbPoints,
          blueBreakdown.habClimbPoints,
        ]}
        subtotal={true}
      />

      <BreakdownRow
        data={[
          "Total Teleop",
          redBreakdown.teleopPoints,
          blueBreakdown.teleopPoints,
        ]}
        total={true}
      />

      <BreakdownRow
        data={[
          "Complete Rocket",
          redBreakdown.completeRocketRankingPoint ? vIcon : xIcon,
          blueBreakdown.completeRocketRankingPoint ? vIcon : xIcon,
        ]}
      />

      <BreakdownRow
        data={[
          "HAB Docking",
          redBreakdown.habDockingRankingPoint ? vIcon : xIcon,
          blueBreakdown.habDockingRankingPoint ? vIcon : xIcon,
        ]}
      />

      <BreakdownRow
        data={[
          "Fouls",
          `+${redBreakdown.foulPoints}`,
          `+${blueBreakdown.foulPoints}`,
        ]}
      />

      <BreakdownRow
        data={[
          "Adjustments",
          redBreakdown.adjustPoints,
          blueBreakdown.adjustPoints,
        ]}
      />

      <BreakdownRow
        data={[
          "Total Score",
          redBreakdown.totalPoints,
          blueBreakdown.totalPoints,
        ]}
        total={true}
      />

      {match.comp_level === "qm" ? (
        <BreakdownRow
          data={[
            "Ranking Points",
            `+${redBreakdown.rp} RP`,
            `+${blueBreakdown.rp} RP`,
          ]}
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

const getSandstormBonusFor = (breakdown, robotNumber) => {
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

const getHABClimbFor = (breakdown, robotNumber) => {
  const result = breakdown["endgameRobot" + robotNumber];
  if (result.includes("HabLevel")) {
    const level = result.substr(-1);
    const climbPoints = [3, 6, 12];
    return `Level ${level} (+${climbPoints[level - 1]})`;
  }
  return xIcon;
};

const getCargoShipDataFor = breakdown => {
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

const getRocketShipDataFor = (breakdown, rocketLocation) => {
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
