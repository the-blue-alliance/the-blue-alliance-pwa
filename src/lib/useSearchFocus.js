import React from "react";

const useSearchFocus = () => {
  // Ref to text input
  const searchRef = React.useRef();

  const keydownHandler = e => {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
      // Focus when F3 or ctrl+F is pressed
      e.preventDefault();
      searchRef.current.focus();
    } else if (e.keyCode === 27) {
      // Blur when Esc is pressed
      searchRef.current.blur();
    }
  };

  // Add event listeners
  React.useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return searchRef;
};

export default useSearchFocus;
