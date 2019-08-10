import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { create } from "react-test-renderer";
import { MatchDetails } from "./";

describe("MatchDetails", () => {
  let createTree: any;

  beforeEach(() => {
    createTree = (id: string) =>
      create(
        <ThemeProvider theme={createMuiTheme()}>
          <MatchDetails id={id} />
        </ThemeProvider>,
      ).toJSON();
  });

  afterEach(() => {
    createTree = null;
  });

  it("should render component", () => {
    expect(createTree("test")).toMatchSnapshot();
  });

  it("should render component for future match", () => {
    expect(createTree("future-match")).toMatchSnapshot();
  });
});
