import {mount} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {PredictionFilter} from './PredictionFilter';

describe('PredictionFilter', () => {
  const changeMock = jest.fn();
  const fetchMock = jest.fn();
  const predictionFilter = (
    <PredictionFilter
      store={{
        currentDate: 'date',
        dates: ['date1', 'date2'],
        fetchMatches: fetchMock,
        handleChange: changeMock,
        handleSubmit: () => ({}),
        isLoaded: true,
        isSuccessSubmit: false,
        matches: [],
        setCurrentDate: (date: string) => date,
      }}
    />
  );
  const filterWrapper = mount(predictionFilter);

  // it('should trigger change event', () => {
  //   const select = filterWrapper.find('Select');
  //   select.simulate('change', {
  //     target: {
  //       value: 'date2',
  //     },
  //   });
  //   expect(select.prop('value')).toBe('date2');
  //   expect(changeMock.mock.calls).toHaveLength(1);
  // });

  it('should trigger submit event', () => {
    const button = filterWrapper.find('Button');
    button.simulate('click');
    expect(fetchMock.mock.calls).toHaveLength(1);
  });

  it('should render correctly', () => {
    const tree = renderer.create(predictionFilter).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
