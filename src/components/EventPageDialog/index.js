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

  // Keep track of dialog modal depth
  const [modalDepth, setModalDepth] = React.useState(
    // Use history depth if it exists
    (typeof history !== "undefined" &&
      history.state &&
      history.state.modalDepth) ||
      0
  );
  React.useEffect(() => {
    // Set history state whenever modalDepth updates
    history.replaceState({ modalDepth });
  }, [modalDepth]);
  React.useEffect(() => {
    // Update depth whenever query keys change
    if (history.state.modalDepth === undefined) {
      // History is being pushed
      setModalDepth(modalDepth + 1);
    } else if (modalDepth !== history.state.modalDepth) {
      // Navigating to an existing point in history
      setModalDepth(history.state.modalDepth);
    }
  }, [modalDepth, queryMatchKey, queryTeamKey]);

  // Close dialog by backing out of modal
  const onClose = React.useCallback(() => {
    window.history.go(-modalDepth);
  }, [modalDepth]);

  // The matchKey or teamKey to render
  const [matchKey, setMatchKey] = React.useState(undefined);
  const [teamKey, setTeamKey] = React.useState(undefined);

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
