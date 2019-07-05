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
    <WindowScroller>
      {({ height, scrollTop }) => {
        const startRenderY = scrollTop - overscan * itemHeight;
        const endRenderY = scrollTop + height + overscan * itemHeight;

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
                    (groupStartingY >= startRenderY && // Top edge is in view
                      groupStartingY <= endRenderY) ||
                    (groupEndingY >= startRenderY && // Bottom edge is in view
                      groupEndingY <= endRenderY) ||
                    (groupStartingY <= startRenderY && // Top edge is above view & bottom edge is below view
                      groupEndingY >= endRenderY)
                  ) {
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
                        {items.map((item, itemIdx) => {
                          const itemStartingY =
                            HEADER_HEIGHT + itemHeight * itemIdx;
                          const itemEndingY = itemStartingY + itemHeight;
                          const shiftedStartRenderY =
                            startRenderY - groupStartingY;
                          const shiftedEndRenderY = endRenderY - groupStartingY;
                          if (
                            (itemStartingY >= shiftedStartRenderY && // Top edge is in view
                              itemStartingY <= shiftedEndRenderY) ||
                            (itemEndingY >= shiftedStartRenderY && // Bottom edge is in view
                              itemEndingY <= shiftedEndRenderY) ||
                            (itemStartingY <= shiftedStartRenderY && // Top edge is above view & bottom edge is below view
                              itemEndingY >= shiftedEndRenderY)
                          ) {
                            return itemRenderer({
                              item,
                              style: {
                                position: "absolute",
                                top: itemStartingY,
                                width,
                              },
                            });
                          }
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
