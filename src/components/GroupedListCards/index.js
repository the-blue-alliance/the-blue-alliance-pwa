import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { AutoSizer, WindowScroller } from "react-virtualized";
import StickySectionHeader from "../StickySectionHeader";

const HEADER_HEIGHT = 41;

const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
  },
  card: {
    marginBottom: theme.spacing(1),
  },
  header: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
  },
}));

const GroupedListCards = ({
  groups,
  itemRenderer,
  itemHeight,
  overscan = 10,
}) => {
  const classes = useStyles();
  const ref = React.useRef();
  React.useEffect(() => {
    // Force scroll event on mount to deal with restored scroll state
    ref.current.__handleWindowScrollEvent();
  }, []);

  // Precompute dimensions of groups
  const groupHeights = [];
  let containerHeight = 0;
  const groupStartingYs = [];
  const groupEndingYs = [];
  groups.forEach(group => {
    const groupHeight = itemHeight * group.items.length + HEADER_HEIGHT;
    groupHeights.push(groupHeight);
    groupStartingYs.push(containerHeight);
    containerHeight += groupHeight + 8; // + marginBottom
    groupEndingYs.push(containerHeight);
  });

  return (
    <WindowScroller ref={ref}>
      {({ height, scrollTop }) => {
        // Top of viewport - overscan
        const startViewportY = scrollTop - overscan * itemHeight;
        // Bottom of viewport + oversan
        const endViewportY = scrollTop + height + overscan * itemHeight;

        return (
          <AutoSizer disableHeight>
            {({ width }) => (
              <div
                className={classes.container}
                style={{ width, height: containerHeight }}
              >
                {groups.map(({ key, header, items }, groupIdx) => {
                  const groupStartingY = groupStartingYs[groupIdx];
                  const groupEndingY = groupEndingYs[groupIdx];
                  if (
                    (groupStartingY >= startViewportY && // Top edge is in view
                      groupStartingY <= endViewportY) ||
                    (groupEndingY >= startViewportY && // Bottom edge is in view
                      groupEndingY <= endViewportY) ||
                    (groupStartingY <= startViewportY && // Top edge is above view & bottom edge is below view
                      groupEndingY >= endViewportY)
                  ) {
                    // Shift viewport pixes into group pixels
                    const shiftedStartViewportY =
                      startViewportY - groupStartingY;
                    const shiftedEndViewportY = endViewportY - groupStartingY;

                    const startItemIdx = Math.max(
                      Math.floor(
                        (shiftedStartViewportY - HEADER_HEIGHT) / itemHeight
                      ),
                      0
                    );
                    const endItemIdx = Math.min(
                      Math.ceil(
                        (shiftedEndViewportY - HEADER_HEIGHT) / itemHeight
                      ),
                      items.length
                    );

                    return (
                      <Paper
                        key={key}
                        className={classes.card}
                        style={{
                          position: "absolute",
                          top: groupStartingY,
                          height: groupHeights[groupIdx],
                          width,
                        }}
                      >
                        <StickySectionHeader>
                          <div className={classes.header}>
                            <Typography variant="h6">{header}</Typography>
                          </div>
                        </StickySectionHeader>
                        {items
                          .slice(startItemIdx, endItemIdx)
                          .map((item, itemIdx) => {
                            return itemRenderer({
                              item,
                              style: {
                                position: "absolute",
                                top:
                                  HEADER_HEIGHT +
                                  itemHeight * (startItemIdx + itemIdx),
                                width,
                              },
                            });
                          })}
                      </Paper>
                    );
                  }
                })}
              </div>
            )}
          </AutoSizer>
        );
      }}
    </WindowScroller>
  );
};

GroupedListCards.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      items: PropTypes.array.isRequired,
    })
  ).isRequired,
  itemRenderer: PropTypes.func.isRequired,
  itemHeight: PropTypes.number.isRequired,
  overscan: PropTypes.number,
};

export default React.memo(GroupedListCards);
