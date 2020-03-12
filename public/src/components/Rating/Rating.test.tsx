import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { create } from "react-test-renderer";
import { Rating } from "./";

describe("Rating", () => {
  let comp: any;

  beforeEach(() => {
    comp = (
      <ThemeProvider theme={createMuiTheme()}>
        <Rating />
      </ThemeProvider>
    );
  });

  it("should render correctly", () => {
    const tree = create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
