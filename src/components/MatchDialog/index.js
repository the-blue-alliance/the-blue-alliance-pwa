import React from "react";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

import useData from "../../lib/useData";
import { getMatchFetchStatus, getMatch } from "../../selectors/MatchSelectors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = "MatchDialogTransition";

const MatchDialog = ({ eventKey }) => {
  const router = useRouter();
  const queryMatchKey = router.query.matchKey;

  // The matchKey to render
  const [matchKey, setMatchKey] = React.useState(undefined);

  // Close dialog by routing back to event
  const onClose = React.useCallback(() => {
    Router.replace(`/event?eventKey=${eventKey}`, `/event/${eventKey}`, {
      shallow: true,
    });
  }, [eventKey]);

  // Update matchKey whenever queryMatchKey changes but only if it defined
  // Otherwise, the dialog will render blank when closing
  React.useEffect(() => {
    if (queryMatchKey) {
      setMatchKey(queryMatchKey);
    }
  }, [queryMatchKey]);

  const [match, matchFetchStatus] = useData(
    state => getMatchFetchStatus(state, matchKey),
    state => getMatch(state, matchKey)
  );

  if (!match) {
    return null;
  }

  return (
    <Dialog
      open={!!queryMatchKey}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      {matchFetchStatus === "success" ? (
        <Typography>{match.getDisplayName()}</Typography>
      ) : (
        <Typography>Something went wrong</Typography>
      )}
    </Dialog>
  );
};

MatchDialog.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

export default React.memo(MatchDialog);
