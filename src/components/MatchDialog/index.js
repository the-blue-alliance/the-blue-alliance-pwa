import React from "react";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

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

  return (
    <Dialog
      open={!!queryMatchKey}
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <Typography>Match: {matchKey}</Typography>
    </Dialog>
  );
};

MatchDialog.propTypes = {
  eventKey: PropTypes.string.isRequired,
};

export default React.memo(MatchDialog);
