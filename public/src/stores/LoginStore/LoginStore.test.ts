import { loginStore } from "./LoginStore";

describe("LoginStore", () => {
  beforeEach(() => {
    loginStore.user = {
      name: "",
      password: "",
    };
  });

  it("should have correct initial fields", () => {
    expect(loginStore.user.name).toBe("");
    expect(loginStore.user.password).toBe("");
    expect(loginStore.hasError).toBeFalsy();
  });

  it("should change login fields", () => {
    loginStore.handleChange("name", { target: { value: "user" } });
    expect(loginStore.user.name).toBe("user");
  });

  it("should close snackbar", () => {
    loginStore.closeSnackbar();
    expect(loginStore.hasError).toBeFalsy();
  });

  it("should submit form with correct creds", () => {
    loginStore.user.name = "test";
    loginStore.handleSubmit({ preventDefault: jest.fn() });
    expect(loginStore.user.name).toBe("test");
    expect(loginStore.hasError).toBeFalsy();
  });

  it("should submit form with wrong creds", () => {
    loginStore.user.name = "user";
    loginStore.handleSubmit({ preventDefault: jest.fn() });
    expect(loginStore.user.name).toBe("user");
  });
});
