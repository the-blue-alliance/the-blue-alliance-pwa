import React from "react";
import PropTypes from "prop-types";
import { AutoSizer, WindowScroller, List } from "react-virtualized";

const WindowScrollerList = ({ rowCount, ...restProps }) => {
  // const listRef = React.useRef();
  // React.useEffect(() => {
  //   listRef.current.measureAllRows();
  // }, [rowCount]);

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => {
        return (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                // ref={listRef}
                autoHeight
                width={width}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowCount={rowCount}
                tabIndex={null}
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
};

export default React.memo(WindowScrollerList);
