export const constants: {
  defaultSeasonsValue: string;
  defaultTournamentsValue: string;
  seasons: Array<{
    label: string;
    value: string;
  }>;
} = {
  defaultSeasonsValue: "all",
  defaultTournamentsValue: "all",
  seasons: [
    {
      label: "All",
      value: "all",
    },
    {
      label: "2018/2019",
      value: "18/19",
    },
    {
      label: "2019/2020",
      value: "19/20",
    },
    {
      label: "2020/2021",
      value: "20/21",
    },
    {
      label: "2021/2022",
      value: "21/22",
    },
  ],
};
