import config from '../config/config';
import {matchListMock, scheduleMock, tableMock, tournamentListMock} from './';

export default {
  get: jest.fn((url) => {
    const rootUrl = `${config.apiUrl}/en`;
    const urlWithoutKey = url.split('?')[0];
    if (urlWithoutKey === `${rootUrl}/tournaments.json`) {
      return Promise.resolve({data: tournamentListMock});
    } else if (urlWithoutKey === `${rootUrl}/tournaments/test/standings.json`) {
      return Promise.resolve({data: tableMock});
    } else if (urlWithoutKey === `${rootUrl}/tournaments/test_id/results.json`) {
      return Promise.resolve({data: matchListMock});
    } else if (urlWithoutKey === `${rootUrl}/schedules/2018-07-07/schedule.json`) {
      return Promise.resolve({data: scheduleMock});
    } else {
      return Promise.reject('No such url');
    }
  }),
};
