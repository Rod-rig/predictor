import {shallow} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Loader, MatchList} from '../';
import {matchListMock} from '../../__mocks__';

describe('MatchList', () => {
  it('should render loader', () => {
    const notRenderedComp = shallow(
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
    const tree = renderer
      .create(
        <MatchList
          store={{
            id: 'test',
            isLoaded: true,
            list: matchListMock.results,
            type: 'test',
          }}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
