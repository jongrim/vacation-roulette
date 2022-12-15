import parseTextItinerary from "./parseTextItinerary";

const sampleText = `
Destination: Bangkok, Thailand 

Day 1: 
Places to Visit: Grand Palace, Wat Pho, Wat Arun, Khao San Road
Restaurants: Som Tam Nua, Jay Fai, Gai Yang Nai Kai

Day 2:
Places to Visit: Chatuchak Weekend Market, Jim Thompson House, Suan Pakkard Palace
Restaurants: Thip Samai, Krua Apsorn, Somboon Seafood

Day 3:
Places to Visit: Lumphini Park, The Golden Mount, Wat Saket
Restaurants: Pratunam Chicken Rice, Baan Khanitha, Jok Prince
`;

describe("parseTextItinerary", () => {
  test("it pulls out the destination", () => {
    const result = parseTextItinerary({
      itineraryText: sampleText,
      countOfDays: 3,
    });
    expect(result.destination).toBe("Bangkok, Thailand");
  });
  test("it pulls out the days", () => {
    const result = parseTextItinerary({
      itineraryText: sampleText,
      countOfDays: 3,
    });
    expect(result.days).toHaveLength(3);
    expect(result.days[0].placesToVisit).toEqual([
      "Grand Palace",
      "Wat Pho",
      "Wat Arun",
      "Khao San Road",
    ]);
    expect(result.days[0].restaurants).toEqual([
      "Som Tam Nua",
      "Jay Fai",
      "Gai Yang Nai Kai",
    ]);
  });

  test("it returns empty if it cannot parse the itinerary", () => {
    const result = parseTextItinerary({ itineraryText: "", countOfDays: 3 });
    expect(result.destination).toBe(undefined);
  });
});
