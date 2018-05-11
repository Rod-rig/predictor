export const transformLogoData = (data: object[]): object => {
  const collection: any = {};
  data.forEach((logo: {logo: string, teamName: string}) => {
    collection[logo.teamName] = logo.logo;
  });
  return collection;
};
