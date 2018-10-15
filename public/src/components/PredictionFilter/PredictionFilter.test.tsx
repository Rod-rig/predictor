import {shallow} from 'enzyme';
import * as React from 'react';
import {PredictionFilter} from './PredictionFilter';

describe('PredictionFilter', () => {
  it('should render correctly', () => {
    const predFilt = shallow(<PredictionFilter
      store={{
        currentDate: 'date',
        dates: ['date1', 'date2'],
        fetchMatches: () => ({}),
        handleChange: () => ({}),
        handleSubmit: () => ({}),
        isLoaded: true,
        isSuccessSubmit: false,
        matches: [],
        setCurrentDate: () => ({}),
      }}
    />);
  });
});
