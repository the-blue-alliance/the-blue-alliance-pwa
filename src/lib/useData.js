import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useData = (
  fetchStatusSelector,
  dataSelector,
  dataFetcher,
  refetchOnLoad
) => {
  const fetchStatus = useSelector(fetchStatusSelector);
  const data = useSelector(dataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    // This should only fire once on load
    if (refetchOnLoad) {
      dispatch(dataFetcher);
    }
  }, [dataFetcher, dispatch, refetchOnLoad]); // These deps should never change

  return [
    data,
    fetchStatus,
    () => {
      dispatch(dataFetcher);
    },
  ];
};
export default useData;
