import {mount} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Loader, MatchList} from '../';
import {matchListMock} from '../../__mocks__';

describe('MatchList', () => {
  it('should render loader', () => {
    const notRenderedComp = mount(
      <MatchList
        store={{
          id: 'test',
          isLoaded: false,
          list: undefined,
          type: 'test',
        }}
      />);
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it('should render correctly', () => {
    const comp = (
      <MatchList
        store={{
          id: 'test',
          isLoaded: true,
          list: matchListMock.results,
          type: 'test',
        }}
      />
    );
    const mountedComp = mount(comp);
    const tree = renderer.create(comp).toJSON();
    expect(mountedComp.find('Paper').length).toBeGreaterThanOrEqual(1);
    expect(tree).toMatchSnapshot();
  });
});
