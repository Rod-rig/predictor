import {Dialog} from '@material-ui/core';
import {mount} from "enzyme";
import * as React from 'react';
import {PredictionMessage} from './PredictionMessage';

describe('PredictionMessage', () => {
  const handleClose = jest.fn();
  const comp = mount(<PredictionMessage handleClose={handleClose} open={true}/>);

  it('should render component', () => {
    expect(comp.find(Dialog)).toHaveLength(1);
    expect(comp.find(Dialog).prop('open')).toBeTruthy();
  });
});
