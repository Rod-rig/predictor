import { Button, TextField } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "./Login";

describe("Login", () => {
  const changeMock = jest.fn();
  const submitMock = jest.fn();
  const login = (name: string, password: string) => (
    <MemoryRouter>
      <Login
        store={{
          closeSnackbar: jest.fn(),
          handleChange: changeMock,
          handleSubmit: submitMock,
          hasError: false,
          user: { name, password },
        }}
      />
    </MemoryRouter>
  );
  const loginWithName = mount(login("test", ""));
  const filledLogin = mount(login("test", "123"));
  const emptyLogin = mount(login("", ""));

  it("should have empty text fields", () => {
    const fields = emptyLogin.find(TextField);
    expect(fields).toHaveLength(2);
    expect(fields.at(0).prop("value")).toBe("");
    expect(fields.at(1).prop("value")).toBe("");
    expect(emptyLogin.find(Button).prop("disabled")).toBeTruthy();
  });

  it("should have empty pwd field", () => {
    const fields = loginWithName.find(TextField);
    expect(fields.at(0).prop("value")).toBe("test");
    expect(fields.at(1).prop("value")).toBe("");
    expect(loginWithName.find(Button).prop("disabled")).toBeTruthy();
  });

  it("should have filled field", () => {
    const fields = filledLogin.find(TextField);
    expect(fields.at(0).prop("value")).toBe("test");
    expect(fields.at(1).prop("value")).toBe("123");
    expect(filledLogin.find(Button).prop("disabled")).toBeFalsy();
  });
});
