import { Snackbar } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { Message } from "./Message";

describe("Message", () => {
  const onClose = jest.fn();
  const comp = mount(<Message onClose={onClose} open={false} text="test" />);

  it("should exist", () => {
    expect(comp.find(Snackbar)).toHaveLength(1);
  });
});
