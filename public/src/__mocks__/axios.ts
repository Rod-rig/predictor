import { getFutureDates } from "../helpers";
import {
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
    } else if (url === "/api/standings/id") {
      return Promise.resolve({ data: tableMock });
    } else if (url === "/api/results/id") {
      return Promise.resolve({ data: matchListMock });
    } else if (url === `/available-events/${getFutureDates()[0]}`) {
      return Promise.resolve({ data: scheduleByDateMock.sport_events });
    } else if (url === "/predictions") {
      return Promise.resolve({ data: predictions });
    } else if (url === "/current-user") {
      return Promise.resolve({ data: userMock });
    } else if (url === "/logout") {
      return Promise.resolve();
    } else {
      return Promise.reject({
        response: { error: "No such url", status: 404 },
      });
    }
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
