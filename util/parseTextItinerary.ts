import { Day, Itinerary } from "../types/itinerary";
import { v4 as uuidv4 } from "uuid";

export default function parseTextItinerary({
  itineraryText,
  countOfDays,
}: {
  itineraryText: string;
  countOfDays: number;
}): Itinerary {
  const destinationRegex = /Destination:(.*)\b/gm;
  const placesToVisitRegex = /Places to Visit:(.*)\b/gm;
  const restaurantsRegex = /Restaurants:(.*)\b/gm;

  const destination = [...itineraryText.matchAll(destinationRegex)].map(
    cleanMatch
  )[0];
  const placesToVisit = [...itineraryText.matchAll(placesToVisitRegex)].map(
    cleanMatch
  );
  const restaurants = [...itineraryText.matchAll(restaurantsRegex)].map(
    cleanMatch
  );

  const days: Day[] = [];
  for (let i = 0; i < countOfDays; i++) {
    days.push({
      number: i,
      placesToVisit: placesToVisit[i]?.split(", "),
      restaurants: restaurants[i]?.split(", "),
    });
  }

  return {
    id: uuidv4(),
    destination,
    days,
  };
}

const cleanMatch = (match: RegExpMatchArray) => match[1].trim();
