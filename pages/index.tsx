import { FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<string>("");
  async function fetchItinerary(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { itinerary } = await fetch("/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }).then((res) => res.json());
      setItinerary(itinerary);
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-screen flex flex-col overflow-auto">
      <Head>
        <title>Vacation Roulette</title>
        <meta
          name="description"
          content="Let AI spint the globe and take you away!"
        />
      </Head>

      <main className="grow p-12">
        <h1 className="text-3xl text-center mb-2">Vacation Roulette</h1>
        <form className="flex flex-col gap-1 mb-6" onSubmit={fetchItinerary}>
          <label htmlFor="prompt" className="px-3">
            What kind of vacation do you want?
          </label>
          <span className="flex gap-2">
            <input
              className="grow rounded-full p-3 border border-solid border-gray-300"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Beach vacation with snorkeling"
              required
            />
            <button
              aria-label="Discover your next adventure"
              className="p-3 rounded-full bg-gradient-to-br from-sky-600 to-sky-700 text-white"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </span>
        </form>
        {loading && <p>Building your next adventure...</p>}
        {itinerary && <p className="whitespace-pre-wrap">{itinerary}</p>}
      </main>

      <footer className="p-8 bg-sky-900 text-white">
        Powered by AI, built by{" "}
        <a
          href="https://github.com/jongrim"
          className="text-orange-300 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jon Grim
        </a>
      </footer>
    </div>
  );
}
