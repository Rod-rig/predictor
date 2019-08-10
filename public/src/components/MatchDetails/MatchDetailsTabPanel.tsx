import * as React from "react";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  index: number;
  tab: number;
}

export const MatchDetailsTabPanel = (props: IProps) => {
  const { children, className, tab, index, ...other } = props;

  return (
    <div
      className={className}
      role="tabpanel"
      hidden={tab !== index}
      {...other}
    >
      {children}
    </div>
  );
};
