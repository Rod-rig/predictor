import { shallow } from "enzyme";
import * as React from "react";
import { NotFound } from "./";

describe("NotFound", () => {
  it("should exist", () => {
    const notFound = shallow(<NotFound />);
    const notFoundContent = notFound.find("div");
    expect(notFoundContent).toHaveLength(1);
  });
});
