import React from "react";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

// Temporary component for testing
const MatchLink = ({ eventKey, matchKey }) => {
  const as = `/match/${matchKey}`;
  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      Router.replace(`/event?eventKey=${eventKey}&matchKey=${matchKey}`, as, {
        shallow: true,
      });
    },
    [eventKey, matchKey, as]
  );
  return (
    <Link href={as} onClick={onClick}>
      {matchKey}
    </Link>
  );
};
MatchLink.propTypes = {
  eventKey: PropTypes.string.isRequired,
  matchKey: PropTypes.string.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = "TeamAtEventDialogTransition";

const TeamAtEventDialog = ({ eventKey }) => {
  const router = useRouter();
  const queryTeamKey = router.query.teamKey;

  // The teamKey to render
  const [teamKey, setMatchKey] = React.useState(undefined);

  // Close dialog by routing back to event
  const onClose = React.useCallback(() => {
    Router.replace(`/event?eventKey=${eventKey}`, `/event/${eventKey}`, {
      shallow: true,
    });
  }, [eventKey]);

  // Update teamKey whenever queryTeamKey changes but only if it defined
  // Otherwise, the dialog will render blank when closing
  React.useEffect(() => {
    if (queryTeamKey) {
      setMatchKey(queryTeamKey);
    }
  }, [queryTeamKey]);

  return (
    <Dialog
      open={!!queryTeamKey}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <>
        <Typography>
          {teamKey} @ {eventKey}
        </Typography>
        <MatchLink
          key={teamKey}
          eventKey={eventKey}
          matchKey={`${eventKey}_qm1`}
        />
      </>
    </Dialog>
  );
};

TeamAtEventDialog.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

export default React.memo(TeamAtEventDialog);
