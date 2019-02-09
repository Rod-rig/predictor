import {mount} from 'enzyme';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Loader, Prediction} from '../';
import {ISportEvent} from '../../@types';
import {scheduleMock} from '../../__mocks__';
import {userStore} from '../../stores';

describe('PredictionForm', () => {
  const createPrediction = (isLoaded: boolean, data: ISportEvent[], isSuccessSubmit: boolean) => {
    const closeSuccessMsgMock = jest.fn();
    const fetchMatchesMock = jest.fn();
    const handleChangeMock = jest.fn();
    const handleSubmitMock = jest.fn();
    const setCurrentDateMock = jest.fn();
    return (
      <Prediction
        store={{
          closeSuccessMsg: closeSuccessMsgMock,
          currentDate: '',
          dates: [],
          fetchMatches: fetchMatchesMock,
          handleChange: handleChangeMock,
          handleSubmit: handleSubmitMock,
          isLoaded,
          isSuccessSubmit,
          matches: data,
          setCurrentDate: setCurrentDateMock,
        }}
      />
    );
  };
  const comp = createPrediction(true, scheduleMock, false);

  it('should render loader', () => {
    const notRenderedComp = mount(createPrediction(false, [], false));
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it('should render success message after form submit', () => {
    const wrapper = mount(createPrediction(true, [], true));
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('should render correctly', () => {
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show message for not logged in user', () => {
    userStore.isLoggedIn = false;
    const wrapper = mount(comp);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
