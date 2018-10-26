import {IUser} from '../@types';
import {matchListMock, predictions, scheduleMock, tableMock, tournamentListMock, userMock} from './';

export default {
  get: jest.fn((url: string) => {
    if (url === '/api/tournaments') {
      return Promise.resolve({data: tournamentListMock});
    } else if (url === '/api/standings/id') {
      return Promise.resolve({data: tableMock});
    } else if (url === '/api/results/id') {
      return Promise.resolve({data: matchListMock});
    } else if (url === '/available-predictions/2018-10-26') {
      return Promise.resolve({data: scheduleMock});
    } else if (url === '/predictions') {
      return Promise.resolve({data: predictions});
    } else if (url === '/is-logged-in') {
      return Promise.resolve({data: userMock});
    } else {
      return Promise.reject('No such url');
    }
  }),
  post: jest.fn((url: string, user: IUser) => {
    if (url === '/login' && user.name === 'test') {
      return Promise.resolve({data: {name: user.name}});
    } else {
      return Promise.reject({error: 'No such url'});
    }
  }),
};
