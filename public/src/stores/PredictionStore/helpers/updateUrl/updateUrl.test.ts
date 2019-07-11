import { createBrowserHistory, History } from "history";
import { updateUrl } from "./updateUrl";

describe("updateUrl", () => {
  let history: History;

  beforeEach(() => {
    history = createBrowserHistory();
  });

  afterEach(() => {
    history = null;
  });

  it("should update history url with single param", () => {
    updateUrl(history, { foo: "bar" });
    expect(history.location.search).toBe("?foo=bar");
  });

  it("should update history url with single param with special chars", () => {
    updateUrl(history, { foo: "foo:bar:baz" });
    expect(history.location.search).toBe("?foo=foo:bar:baz");
  });

  it("shouldn't change history pathname", () => {
    updateUrl(history, { foo: "bar" });
    expect(history.location.pathname).toBe("/");
  });

  it("should update history url with two params", () => {
    updateUrl(history, { foo: "bar", bar: "baz" });
    expect(history.location.search).toBe("?bar=baz&foo=bar");
  });

  it("should update history url with three params", () => {
    updateUrl(history, { foo: "bar", bar: "baz", test: "1" });
    expect(history.location.search).toBe("?bar=baz&foo=bar&test=1");
  });
});
