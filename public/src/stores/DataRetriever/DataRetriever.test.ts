import { DataRetriever } from "./DataRetriever";
import { userStore } from "../UserStore";

describe("DataRetriever", () => {
  let logoutMock: any;
  let object: any;
  let array: any;

  beforeEach(() => {
    logoutMock = jest.spyOn(userStore, "logout");
    object = new DataRetriever({
      url: "/api/tournaments",
    });
    array = new DataRetriever({
      url: "/predictions",
    });
  });

  afterEach(() => {
    logoutMock = null;
    object = null;
    array = null;
  });

  it("should create new instance", () => {
    expect(object).toBeInstanceOf(DataRetriever);
    expect(array).toBeInstanceOf(DataRetriever);
  });

  it("should get data(object)", () => {
    expect(object.data).toBeDefined();
    expect(Object.keys(object.data).length).toBeGreaterThan(0);
    expect(object.isLoaded).toBeTruthy();
    expect(logoutMock).not.toHaveBeenCalled();
  });

  it("should get data(array)", () => {
    expect(array.data).toBeDefined();
    expect(array.data.length).toBeGreaterThan(0);
    expect(array.isLoaded).toBeTruthy();
    expect(logoutMock).not.toHaveBeenCalled();
  });

  it("should handle 403 errors", () => {
    object.fetchDataFailed({ status: 403 });
    expect(logoutMock).toHaveBeenCalled();
  });

  it("should handle other errors", () => {
    object.fetchDataFailed({ status: 100 });
    expect(logoutMock).not.toHaveBeenCalled();
  });
});
