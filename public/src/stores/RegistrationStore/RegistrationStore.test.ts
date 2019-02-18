import { registrationStore } from "./";

describe("RegistrationStore", () => {
  it("should have correct fields", () => {
    expect(registrationStore.user.name).toBe("");
    expect(registrationStore.user.email).toBe("");
    expect(registrationStore.user.password).toBe("");
  });

  it("should change fields", () => {
    const changeSpy = jest.fn(
      registrationStore.handleChange.bind(registrationStore),
    );
    changeSpy("name", { target: { value: "test" } });
    changeSpy("email", { target: { value: "test@gmail.com" } });
    changeSpy("password", { target: { value: "1234" } });
    expect(registrationStore.user.name).toBe("test");
    expect(registrationStore.user.email).toBe("test@gmail.com");
    expect(registrationStore.user.password).toBe("1234");
    expect(changeSpy.mock.calls).toHaveLength(3);
    expect(changeSpy.mock.calls[0][0]).toBe("name");
  });

  it("should submit form", () => {
    registrationStore.handleChange("name", { target: { value: "user" } });
    registrationStore.handleChange("email", { target: { value: "user" } });
    registrationStore.handleChange("password", { target: { value: "user" } });
    const submitSpy = jest.fn(
      registrationStore.handleSubmit.bind(registrationStore),
    );
    submitSpy(new Event("submit"));
    expect(submitSpy.mock.calls).toHaveLength(1);
    expect(registrationStore.user.name).toBe("user");
  });

  it("should close snackbar", () => {
    registrationStore.closeSnackbar();
    expect(registrationStore.hasError).toBeFalsy();
  });
});
