import React from "react";
import PropTypes from "prop-types";
import { AutoSizer, WindowScroller, List } from "react-virtualized";

const WindowScrollerList = ({ rowCount, startingOffset, ...restProps }) => {
  const listRef = React.useRef();
  // React.useEffect(() => {
  //   listRef.current.measureAllRows();
  // }, [rowCount]);

  // Scroll to startingOffset after first render
  const [firstRender, setFirstRender] = React.useState(false);
  React.useLayoutEffect(() => {
    if (firstRender && startingOffset) {
      listRef.current.scrollToPosition(startingOffset);
    }
  }, [firstRender, startingOffset]);
  const onRowsRendered = React.useCallback(() => {
    if (!firstRender && startingOffset) {
      setFirstRender(true);
    }
  }, [firstRender, startingOffset]);

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => {
        return (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={listRef}
                autoHeight
                width={width}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowCount={rowCount}
                tabIndex={null}
                onRowsRendered={onRowsRendered}
                {...restProps}
              />
            )}
          </AutoSizer>
        );
      }}
    </WindowScroller>
  );
};

WindowScrollerList.propTypes = {
  rowCount: PropTypes.number.isRequired,
  startingOffset: PropTypes.number,
};

export default React.memo(WindowScrollerList);
