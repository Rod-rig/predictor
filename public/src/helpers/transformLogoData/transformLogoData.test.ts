import {transformLogoData} from './transformLogoData';

describe('transformLogoData', () => {
  it('should return correct result', () => {
    expect(transformLogoData([{}])).toEqual({});
    expect(transformLogoData([{teamName: 'name1', logo: 'logo1'}])).toEqual({name1: 'logo1'});
    expect(transformLogoData([
      {teamName: 'teamA', logo: 'logoA'},
      {teamName: 'teamB', logo: 'logoB'},
    ])).toEqual({teamA: 'logoA', teamB: 'logoB'});
  });
});
