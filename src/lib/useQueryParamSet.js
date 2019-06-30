import React from "react";
import useQueryParam from "./useQueryParam";

const useQueryParamSet = param => {
  const [array, setArray] = useQueryParam(param);
  const set = array ? new Set(array) : new Set();

  const addItem = React.useCallback(
    item => {
      set.add(item);
      setArray(Array.from(set));
    },
    [set, setArray]
  );
  const deleteItem = React.useCallback(
    item => {
      set.delete(item);
      setArray(Array.from(set));
    },
    [set, setArray]
  );
  const clearSet = React.useCallback(() => setArray([]), [setArray]);

  return [set, addItem, deleteItem, clearSet];
};

export default useQueryParamSet;
