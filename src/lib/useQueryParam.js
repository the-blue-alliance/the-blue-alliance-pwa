import React from "react";
import { useRouter } from "next/router";

const useQueryParam = param => {
  const router = useRouter();

  const setParam = React.useCallback(
    value => {
      const query = router.query;
      query[param] = value;
      router.replace(
        {
          pathname: router.pathname,
          query,
        },
        router.asPath,
        { shallow: true }
      );
    },
    [router, param]
  );

  return [router.query[param], setParam];
};

export default useQueryParam;
