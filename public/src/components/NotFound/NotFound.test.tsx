import { Paper } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "./";

describe("NotFound", () => {
  it("should exist", () => {
    const notFound = mount(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const notFoundContent = notFound.find(Paper);
    expect(notFoundContent).toHaveLength(1);
  });
});
