import { IRegistration } from "../../@types";
import { registrationStore } from "./";

describe("RegistrationStore", () => {
  let store: IRegistration;
  beforeEach(() => {
    store = Object.assign(
      Object.create(Object.getPrototypeOf(registrationStore)),
      registrationStore,
    );
  });

  it("should have correct fields", () => {
    expect(store.user.name).toBe("");
    expect(store.user.email).toBe("");
    expect(store.user.password).toBe("");
  });

  it("should change fields", () => {
    const changeSpy = jest.fn(store.handleChange.bind(store));
    changeSpy("name", { target: { value: "test" } });
    changeSpy("email", { target: { value: "test@gmail.com" } });
    changeSpy("password", { target: { value: "1234" } });
    expect(store.user.name).toBe("test");
    expect(store.user.email).toBe("test@gmail.com");
    expect(store.user.password).toBe("1234");
    expect(changeSpy.mock.calls).toHaveLength(3);
    expect(changeSpy.mock.calls[0][0]).toBe("name");
  });

  it("should submit form", () => {
    store.handleChange("name", { target: { value: "test" } });
    store.handleChange("email", { target: { value: "test" } });
    store.handleChange("password", { target: { value: "test" } });
    const submitSpy = jest.fn(store.handleSubmit.bind(store));
    submitSpy(new Event("submit"));
    expect(submitSpy.mock.calls).toHaveLength(1);
    expect(store.user.name).toBe("test");
  });

  it("should submit form with incorrect creds", () => {
    store.handleChange("name", { target: { value: "user" } });
    store.handleChange("email", { target: { value: "user" } });
    store.handleChange("password", { target: { value: "user" } });
    const submitSpy = jest.fn(store.handleSubmit.bind(store));
    submitSpy(new Event("submit"));
    expect(submitSpy.mock.calls).toHaveLength(1);
    expect(store.user.name).toBe("user");
  });

  it("should close snackbar", () => {
    store.closeSnackbar();
    expect(store.hasError).toBeFalsy();
  });
});
