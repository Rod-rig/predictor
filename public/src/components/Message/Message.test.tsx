import { Snackbar } from "@material-ui/core";
import { shallow } from "enzyme";
import * as React from "react";
import { Message } from "./Message";

describe("Message", () => {
  const comp = shallow(<Message />);
  it("should exist", () => {
    expect(comp.find(Snackbar)).toHaveLength(1);
  });
});
