export interface Day {
  number: number;
  places: string[];
}

export interface Itinerary {
  id: string;
  days: Day[];
}
