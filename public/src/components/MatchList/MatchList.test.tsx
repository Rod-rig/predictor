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
          data: {
            results: undefined,
          },
          isLoaded: false,
          url: 'test',
        }}
      />);
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it('should render correctly', () => {
    const comp = (
      <MatchList
        store={{
          data: {
            results: matchListMock.results,
          },
          isLoaded: true,
          url: 'test',
        }}
      />);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
