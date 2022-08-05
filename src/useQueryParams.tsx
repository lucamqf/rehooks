import { useState } from "react";
import useEventListener from "./useEventListener";
import isBrowser from "./utils/isBrowser";

const getQueryValue = (search: string, param: string) => new URLSearchParams(search).get(param);

function useQueryParams(queryParam: string) {
  const location = window.location;
  const [query, setQuery] = useState(() => getQueryValue(location.search, queryParam));

  const handleChange = () => setQuery(getQueryValue(location.search, queryParam));

  useEventListener("popstate", handleChange);
  useEventListener("pushstate", handleChange);
  useEventListener("replacestate", handleChange);

  return query;
}

function useServerQueryParams() {
  return null;
}

export default isBrowser ? useQueryParams : useServerQueryParams;
