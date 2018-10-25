import {matchListMock, scheduleMock, tableMock, tournamentListMock, userMock} from './';

export default {
  get: jest.fn((url) => {
    if (url === '/api/tournaments') {
      return Promise.resolve({data: tournamentListMock});
    } else if (url === '/api/standings/id') {
      return Promise.resolve({data: tableMock});
    } else if (url === '/api/results/id') {
      return Promise.resolve({data: matchListMock});
    } else if (url === '/api/daily-schedule') {
      return Promise.resolve({data: scheduleMock});
    } else if (url === '/is-logged-in') {
      return Promise.resolve({data: userMock});
    } else {
      return Promise.reject('No such url');
    }
  }),
};
