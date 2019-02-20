import { ILogin } from "../../@types";
import { loginStore } from "./LoginStore";

describe("LoginStore", () => {
  let store: ILogin;
  beforeEach(() => {
    store = Object.assign(
      Object.create(Object.getPrototypeOf(loginStore)),
      loginStore,
    );
  });

  it("should have correct initial fields", () => {
    expect(store.user.name).toBe("");
    expect(store.user.password).toBe("");
    expect(store.hasError).toBeFalsy();
  });

  it("should change login fields", () => {
    store.handleChange("name", { target: { value: "user" } });
    store.handleChange("password", { target: { value: "password" } });
    expect(store.user.name).toBe("user");
    expect(store.user.password).toBe("password");
  });

  it("should close snackbar", () => {
    store.closeSnackbar();
    expect(store.hasError).toBeFalsy();
  });

  it("should submit form with correct creds", () => {
    store.handleChange("name", { target: { value: "test" } });
    store.handleSubmit({ preventDefault: jest.fn() });
    expect(store.user.name).toBe("test");
    expect(store.hasError).toBeFalsy();
  });

  it("should submit form with wrong creds", () => {
    store.handleChange("name", { target: { value: "user" } });
    store.handleSubmit({ preventDefault: jest.fn() });
    expect(store.user.name).toBe("user");
  });
});
