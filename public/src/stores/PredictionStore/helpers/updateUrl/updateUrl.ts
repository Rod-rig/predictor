import { History } from "history";
import { parse, stringify } from "query-string";

export const updateUrl = (
  history: History,
  payload: {
    [key: string]: string;
  },
): void => {
  const params = { ...parse(history.location.search) };

  Object.keys(payload).forEach((key: string) => {
    params[key] = payload[key];
  });

  const search = stringify(params, {
    encode: false,
  });
  history.push({
    search,
  });
};
