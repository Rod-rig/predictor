import { Avatar } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { TeamLogo } from "./";

interface IProps {
  teamName: string;
  modClass?: string;
}

const notExistingLogoUrl =
  "https://cdn2.iconfinder.com/data/icons/sport-items-2/512/football_soccer_badge_shield_ball_heraldic-128.png";

describe("TeamLogo", () => {
  const mountComp = (props: IProps) => mount(<TeamLogo {...props} />);
  it("should render without logo existing url", () => {
    const comp = mountComp({
      teamName: "test",
    }).find(Avatar);
    expect(comp).toHaveLength(1);
    expect(comp.prop("src")).toBe(notExistingLogoUrl);
    expect(comp.prop("className")).toBeUndefined();
  });

  it("should render with logo url", () => {
    const comp = mountComp({
      modClass: "test",
      teamName: "Manchester City FC",
    }).find(Avatar);
    expect(comp).toHaveLength(1);
    expect(comp.prop("src")).not.toBe(notExistingLogoUrl);
    expect(comp.prop("className")).toBe("test");
  });
});
