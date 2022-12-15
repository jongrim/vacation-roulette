import { assign, createMachine } from "xstate";
import fetchItinerarySource from "../sources/fetchItinerary";
import { Itinerary } from "../types/itinerary";

const itineraryMachine = createMachine(
  {
    schema: {
      context: {} as { itinerary: Itinerary },
      events: {} as { type: "CREATE_NEW"; prompt: string } | { type: "CLEAR" },
    },
    initial: "search",
    states: {
      search: {
        on: {
          CREATE_NEW: {
            target: "building",
          },
        },
      },
      building: {
        invoke: {
          src: async (ctx, event) => {
            if (event.type !== "CREATE_NEW") return;
            return fetchItinerarySource(event);
          },
          onDone: {
            target: "viewing",
            actions: ["fetchItinerary"],
          },
          onError: "errored",
        },
      },
      viewing: {
        on: {
          CLEAR: {
            target: "search",
          },
        },
      },
      errored: {},
    },
  },
  {
    actions: {
      fetchItinerary: assign({
        itinerary: (ctx, event) => {
          // @ts-expect-error
          return event.data;
        },
      }),
    },
  }
);

export default itineraryMachine;
