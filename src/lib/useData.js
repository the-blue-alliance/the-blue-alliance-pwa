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
    if (refetchOnLoad) {
      dispatch(dataFetcher);
    }
  }, []);

  return [
    data,
    fetchStatus,
    () => {
      dispatch(dataFetcher);
    },
  ];
};
export default useData;
