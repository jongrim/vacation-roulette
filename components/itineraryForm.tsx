import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, FormEvent } from "react";
import Heading from "./heading";
import PrimaryButton from "./primaryButton";

export default function ItineraryForm({
  onSubmit,
}: {
  onSubmit: (prompt: string) => void;
}) {
  const [prompt, setPrompt] = useState<string>("");
  async function fetchItinerary(e: FormEvent) {
    e.preventDefault();
    onSubmit(prompt);
  }

  return (
    <div className="flex flex-col justify-center">
      <Heading level="h1" className="mb-2 px-3">
        Vacation Roulette
      </Heading>
      <p className="px-3 mb-6">Let AI spin the globe and take you away!</p>
      <form
        className="flex flex-col gap-1 mb-6 w-full col-span-full"
        onSubmit={fetchItinerary}
      >
        <label htmlFor="prompt" className="font-semibold px-3">
          What will your next adventure be?
        </label>
        <span className="w-full flex flex-col sm:flex-row gap-2">
          <input
            className="sm:grow rounded-full p-3 border border-solid border-gray-300"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Beach vacation with snorkeling"
            required
          />
          <PrimaryButton aria-label="Discover your next adventure">
            <PaperAirplaneIcon className="h-6 w-6" />
          </PrimaryButton>
        </span>
      </form>
    </div>
  );
}
