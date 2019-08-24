import * as React from "react";
import { create } from "react-test-renderer";
import { Rating } from "./";

describe("Rating", () => {
  const comp = <Rating />;
  const tree = create(comp).toJSON();
  it("should ", () => {
    expect(tree).toMatchSnapshot();
  });
});
