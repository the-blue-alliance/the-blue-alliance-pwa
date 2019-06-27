import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import MatchDialog from "../MatchDialog";
import TeamAtEventDialog from "../TeamAtEventDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = "EventPageDialogTransition";

const EventPageDialog = ({ eventKey }) => {
  const router = useRouter();
  const queryMatchKey = router.query.matchKey;
  const queryTeamKey = router.query.teamKey;
  const open = !!queryMatchKey || !!queryTeamKey;

  // The matchKey or teamKey to render
  const [matchKey, setMatchKey] = React.useState(undefined);
  const [teamKey, setTeamKey] = React.useState(undefined);

  // Close dialog by routing back to event
  const onClose = React.useCallback(() => {
    window.history.go(-1);
  }, []);

  // Update keys whenever query keys change, but only if the dialog is open
  // Otherwise, the dialog will render blank when closing
  React.useEffect(() => {
    if (open) {
      setMatchKey(queryMatchKey);
      setTeamKey(queryTeamKey);
    }
  }, [open, queryMatchKey, queryTeamKey]);

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <MatchDialog eventKey={eventKey} matchKey={matchKey} />
      <TeamAtEventDialog eventKey={eventKey} teamKey={teamKey} />
    </Dialog>
  );
};

EventPageDialog.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

export default React.memo(EventPageDialog);
