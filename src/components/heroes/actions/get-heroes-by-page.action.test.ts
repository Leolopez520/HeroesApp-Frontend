import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-page.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("getHeroesByPageAction", () => {
  beforeEach(() => {
    heroesApiMock.reset;
  });
  const heroesApiMock = new AxiosMockAdapter(heroApi);
  test("Should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: "1.jpg",
        },
        {
          image: "2.jpg",
        },
      ],
    });
    const response = await getHeroesByPageAction(1);
    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpg` },
        { image: `${BASE_URL}/images/2.jpg` },
      ],
    });
  });

  test("should return the correct heroes when page is not a number ", async () => {
    const responseObj = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet("/").reply(200, responseObj);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction("abc" as unknown as number);

    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ limit: 6, offset: 0, category: "all" });
  });

  test("should return the correct heroes when page is a string number ", async () => {
    const responseObj = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet("/").reply(200, responseObj);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction("2" as unknown as number);

    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ limit: 6, offset: 6, category: "all" });
  });

  test("should return the correct heroes page is a correct number ", async () => {
    const responseObj = {
      total: 10,
      pages: 1,
      heroes: [],
    };

    heroesApiMock.onGet("/").reply(200, responseObj);
    heroesApiMock.resetHistory();

    await getHeroesByPageAction(3);

    const params = heroesApiMock.history.get[0].params;
    expect(params).toStrictEqual({ limit: 6, offset: 12, category: "all" });
  });
});
