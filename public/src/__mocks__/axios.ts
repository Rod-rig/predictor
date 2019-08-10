import { getFutureDates } from "../helpers";
import {
  futureMatchDetailsMock,
  matchDetailsMock,
  matchListMock,
  predictions,
  scheduleByDateMock,
  tableMock,
  tournamentListMock,
  userMock,
} from "./";

export default {
  get: jest.fn((url: string) => {
    if (url === "/api/tournaments") {
      return Promise.resolve({ data: tournamentListMock });
    }
    if (url === "/api/standings/id") {
      return Promise.resolve({ data: tableMock });
    }
    if (url === "/api/results/id") {
      return Promise.resolve({ data: matchListMock });
    }
    if (url === `/available-events/${getFutureDates()[0]}`) {
      return Promise.resolve({ data: scheduleByDateMock.sport_events });
    }
    if (url === "/predictions") {
      return Promise.resolve({ data: predictions });
    }
    if (url === "/current-user") {
      return Promise.resolve({ data: userMock });
    }
    if (url === "/logout") {
      return Promise.resolve();
    }
    if (url === "/api/match/test") {
      return Promise.resolve({ data: matchDetailsMock });
    }
    if (url === "/api/match/future-match") {
      return Promise.resolve({ data: futureMatchDetailsMock });
    }
    if (url === "/403-error") {
      return Promise.reject({ error: "No such url", status: 403 });
    }
    return Promise.reject({
      response: { error: "No such url", status: 404 },
    });
  }),
  post: jest.fn((url: string, data: any) => {
    if (url === "/login" && data.name === "test") {
      return Promise.resolve({ data: { name: data.name } });
    } else if (
      url === "/predictions" ||
      (url === "/register" && data.name === "test")
    ) {
      return Promise.resolve();
    } else {
      return Promise.reject({ error: "No such url" });
    }
  }),
};
