import Head from "next/head";
import Image from "next/image";
import { Poppins } from "@next/font/google";
import Footer from "../components/footer";
import PlanePic from "../public/paper-plane-with-globe.png";
import Navigation from "../components/navigation";
import ItineraryForm from "../components/itineraryForm";
import { useMachine } from "@xstate/react";
import itineraryMachine from "../machines/itineraryMachine";
import FlyingPlaneLoader from "../components/flyingPlaneLoader";
import PrimaryButton from "../components/primaryButton";

const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export default function Home() {
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
              />
              <ItineraryForm
                onSubmit={(prompt: string) => send("CREATE_NEW", { prompt })}
              />
            </div>
          </section>
        )}
        {state.value === "building" && <FlyingPlaneLoader />}
        {state.value === "viewing" && (
          <section className="p-8">
            <p className="whitespace-pre-wrap mb-12">
              {state.context.itinerary}
            </p>
            <PrimaryButton onClick={() => send("CLEAR")}>
              Clear and return to start
            </PrimaryButton>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}
