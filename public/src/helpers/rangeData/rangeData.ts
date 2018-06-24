export const rangeData = (data: any[], from: number, to: number) => {
  if (from > to) {
    [from, to] = [to, from];
  }
  const dataSize: number = data.length;
  if (from > dataSize) {
    return [{team_standings: data}];
  }
  from = from > 0 ? from - 1 : 0;
  to = to < dataSize ? to : dataSize;
  return [{
    team_standings: data.slice(from, to),
  }];
};
