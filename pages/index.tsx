import { FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Poppins } from "@next/font/google";
import Heading from "../components/heading";
import Footer from "../components/footer";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  async function fetchItinerary(e: FormEvent) {
    e.preventDefault();
    setItinerary("");
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
      setApiError(
        "Sorry, I wasn't able to make an itinerary for you. I'm still learning. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-auto ${poppins.className}`}
    >
      <Head>
        <title>Vacation Roulette</title>
        <meta
          name="description"
          content="Let AI spint the globe and take you away!"
        />
      </Head>

      <main className="grow p-12">
        <Heading level="h1" className="mb-3 text-center">
          Vacation Roulette
        </Heading>
        <form className="flex flex-col gap-1 mb-6" onSubmit={fetchItinerary}>
          <label htmlFor="prompt" className="px-3 font-semibold">
            What will your next adventure be?
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
        <section className="px-3">
          {loading && <p>Building your next adventure...</p>}
          {itinerary && <p className="whitespace-pre-wrap">{itinerary}</p>}
          {apiError && <p>{apiError}</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
}
