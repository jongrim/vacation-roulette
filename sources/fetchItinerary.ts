import { FormEvent } from "react";

export default async function fetchItinerary({ prompt }: { prompt: string }) {
  const { itinerary } = await fetch("/api/itinerary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  }).then((res) => res.json());
  return itinerary;
}
