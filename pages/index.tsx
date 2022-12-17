import Head from "next/head";
import Image from "next/image";
import { Loader } from "@googlemaps/js-api-loader";
import { Poppins } from "@next/font/google";
import Footer from "../components/footer";
import PlanePic from "../public/paper-plane-with-globe.png";
import Navigation from "../components/navigation";
import ItineraryForm from "../components/itineraryForm";
import { useMachine } from "@xstate/react";
import itineraryMachine from "../machines/itineraryMachine";
import FlyingPlaneLoader from "../components/flyingPlaneLoader";
import ItineraryView from "../components/itineraryView";
import { useEffect, useState } from "react";
import { comfortaa } from "../util/comfortaa";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function Home() {
  const [google, setGoogle] = useState<typeof globalThis.google>();
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then((loaded) => {
      setGoogle(loaded);
    });
  }, []);
  const [state, send] = useMachine(itineraryMachine);
  return (
    <div
      className={`grow w-screen flex flex-col overflow-auto ${poppins.className}`}
    >
      <Head>
        <title>Vacation Roulette</title>
        <meta
          name="description"
          content="Let AI spin the globe and take you away!"
        />
      </Head>
      <div className="grow bg-yellow-400 flex flex-col ">
        <Navigation />
        {state.value === "search" && (
          <section className="grow w-full p-12 grid place-content-center">
            <div className="w-full max-w-6xl mx-auto grid sm:grid-cols-2 gap-12 md:gap-24">
              <Image
                src={PlanePic}
                alt=""
                className="rounded-xl shadow-xl w-96"
                priority
              />
              <ItineraryForm
                onSubmit={(prompt: string) => send("CREATE_NEW", { prompt })}
              />
            </div>
          </section>
        )}
        {state.value === "building" && (
          <div className="grow grid place-content-center">
            <p
              className={`relative -top-12 font-semibold text-lg sm:text-2xl text-center ${comfortaa.className}`}
            >
              Building your next adventure!
            </p>
            <FlyingPlaneLoader />
          </div>
        )}
        {state.value === "viewing" && google && (
          <ItineraryView
            itinerary={state.context.itinerary}
            onClear={() => send("CLEAR")}
            google={google}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
