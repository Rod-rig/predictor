import {shallow} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import matchList from '../../__mocks__/matchList';
import {Loader} from '../Loader/Loader';
import MatchList from './MatchList';

describe('MatchList', () => {
  it('should render loader', () => {
    const notRenderedComp = shallow(
      <MatchList
        store={{
          id: 'test',
          isLoaded: false,
          list: [{}],
          // logos: {test1: 'test1', test2: 'test2'},
          // logosUrl: 'test',
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
            list: matchList.matchList,
            // logos: {test1: 'test1', test2: 'test2'},
            // logosUrl: 'test',
            type: 'test',
          }}
        />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
