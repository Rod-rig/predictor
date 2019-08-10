import { userStore } from "../UserStore";
import { DataRetriever } from "./DataRetriever";

describe("DataRetriever", () => {
  let logoutMock: any;

  beforeEach(() => {
    logoutMock = jest.spyOn(userStore, "logout");
  });

  afterEach(() => {
    logoutMock = null;
  });

  describe("object data", () => {
    let object: any;

    beforeEach(() => {
      object = new DataRetriever({
        url: "/api/tournaments",
      });
    });

    afterEach(() => {
      object = null;
    });

    it("should get data(object)", () => {
      expect(object.data).toBeDefined();
      expect(object).toBeInstanceOf(DataRetriever);
      expect(Object.keys(object.data).length).toBeGreaterThan(0);
      expect(object.isLoaded).toBeTruthy();
      expect(logoutMock).not.toHaveBeenCalled();
    });
  });

  describe("array data", () => {
    let array: any;

    beforeEach(() => {
      array = new DataRetriever({
        url: "/predictions",
      });
    });

    afterEach(() => {
      array = null;
    });

    it("should get data(array)", () => {
      expect(array.data).toBeDefined();
      expect(array).toBeInstanceOf(DataRetriever);
      expect(array.data.length).toBeGreaterThan(0);
      expect(array.isLoaded).toBeTruthy();
      expect(logoutMock).not.toHaveBeenCalled();
    });
  });

  describe("other errors", () => {
    let otherError: any;

    beforeEach(() => {
      otherError = new DataRetriever({
        url: "/other-error",
      });
    });

    afterEach(() => {
      otherError = null;
    });

    it("should get other errors", () => {
      expect(otherError).toBeInstanceOf(DataRetriever);
      expect(otherError.data).toBeUndefined();
      expect(logoutMock).not.toHaveBeenCalled();
    });
  });

  describe("403 error", () => {
    let error: any;

    beforeEach(() => {
      error = new DataRetriever({
        url: "/403-error",
      });
    });

    afterEach(() => {
      error = null;
    });

    it("should get 403 errors", () => {
      expect(error).toBeInstanceOf(DataRetriever);
      expect(error.isLoaded).toBeFalsy();
      expect(error.data).toBeUndefined();
      expect(logoutMock).toHaveBeenCalled();
    });
  });
});
