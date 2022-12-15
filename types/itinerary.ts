export interface Day {
  number: number;
  placesToVisit: string[];
  restaurants: string[];
}

export interface Itinerary {
  id: string;
  destination?: string;
  days?: Day[];
}
