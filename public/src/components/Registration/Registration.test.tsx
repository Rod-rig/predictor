import { Button, TextField } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { Registration } from "./Registration";

describe("Registration", () => {
  const changeMock = jest.fn();
  const submitMock = jest.fn();
  const registration = (email: string, name: string, password: string) => (
    <MemoryRouter>
      <Registration
        store={{
          closeSnackbar: jest.fn(),
          handleChange: changeMock,
          handleSubmit: submitMock,
          hasError: false,
          user: { email, name, password },
        }}
      />
    </MemoryRouter>
  );
  const emptyReg = mount(registration("", "", ""));
  const emailReg = mount(registration("email", "", ""));
  const fullReg = mount(registration("email", "name", "pwd"));

  it("should have empty initial fields", () => {
    const fields = emptyReg.find(TextField);
    expect(fields.at(0).prop("value")).toBe("");
    expect(fields.at(1).prop("value")).toBe("");
    expect(fields.at(2).prop("value")).toBe("");
    expect(emptyReg.find(Button).prop("disabled")).toBeTruthy();
  });

  it("should have filled only email field", () => {
    const fields = emailReg.find(TextField);
    expect(fields.at(0).prop("value")).toBe("");
    expect(fields.at(1).prop("value")).toBe("email");
    expect(fields.at(2).prop("value")).toBe("");
    expect(emailReg.find(Button).prop("disabled")).toBeTruthy();
  });

  it("should have filled all fields", () => {
    const fields = fullReg.find(TextField);
    expect(fields.at(0).prop("value")).toBe("name");
    expect(fields.at(1).prop("value")).toBe("email");
    expect(fields.at(2).prop("value")).toBe("pwd");
    expect(fullReg.find(Button).prop("disabled")).toBeFalsy();
  });
});
