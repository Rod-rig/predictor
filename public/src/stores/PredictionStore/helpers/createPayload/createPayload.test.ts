import { company, date, random } from "faker";
import { createPayload } from "./createPayload";

const getRandomNumber = () => random.number().toString();

describe("createPayload", () => {
  let matches: any[];
  let homeName: string;
  let awayName: string;
  let homeUserPrediction: number;
  let awayUserPrediction: number;
  let scheduled: string;
  let seasonId: string;
  let tournamentId: string;
  let id: string;

  beforeEach(() => {
    homeName = company.companyName();
    awayName = company.companyName();
    homeUserPrediction = random.number({ min: 0, max: 9 });
    awayUserPrediction = random.number({ min: 0, max: 9 });
    scheduled = date.future().toString();
    seasonId = getRandomNumber();
    tournamentId = getRandomNumber();
    id = getRandomNumber();

    matches = [
      {
        competitors: [
          {
            name: homeName,
            userPrediction: homeUserPrediction,
          },
          {
            name: awayName,
            userPrediction: awayUserPrediction,
          },
        ],
        id,
        scheduled,
        season: {
          id: seasonId,
        },
        tournament: {
          id: tournamentId,
        },
      },
      {
        competitors: [
          {
            name: company.companyName(),
          },
          {
            name: company.companyName(),
          },
        ],
        id: getRandomNumber(),
        scheduled: date.future().toString(),
        season: {
          id: getRandomNumber(),
        },
        tournament: {
          id: getRandomNumber(),
        },
      },
    ];
  });

  it("should return correct result", () => {
    expect(createPayload(matches)[0]).toEqual({
      awayScore: awayUserPrediction,
      awayTeam: awayName,
      homeScore: homeUserPrediction,
      homeTeam: homeName,
      matchId: id,
      scheduled,
      seasonId,
      tournamentId,
    });
  });

  it("should have correct length", () => {
    expect(createPayload(matches)).toHaveLength(1);
  });

  it("should return empty matches", () => {
    expect(createPayload([])).toHaveLength(0);
  });
});
