import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { Itinerary } from "../types/itinerary";
import PrimaryButton from "./primaryButton";
import Heading from "./heading";

interface AppProps {
  itinerary: Itinerary;
  onClear: () => void;
  google: typeof globalThis.google;
}

export default function ItineraryView({
  itinerary,
  onClear,
  google,
}: React.PropsWithChildren<AppProps>) {
  const mapRef = useRef(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [destinationMapData, setDestinationMapData] =
    useState<google.maps.places.PlaceResult[]>();
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useLayoutEffect(() => {
    if (!mapRef.current) {
      throw new Error("no map");
    }
    var center = new google.maps.LatLng(0, 0);
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 1,
    });
    setMap(map);
  }, [google]);

  useEffect(() => {
    if (!map) return;
    const placesService = new google.maps.places.PlacesService(map);

    function loadDestination() {
      if (!map) return;
      if (!itinerary.destination) {
        throw new Error("No destination");
      }
      placesService.findPlaceFromQuery(
        {
          fields: ["geometry", "photos"],
          query: itinerary.destination,
        },
        (results) => {
          if (!results) return;
          setDestinationMapData(results);
          if (results[0].geometry?.viewport) {
            map.fitBounds(results[0].geometry?.viewport);
          }
          if (results[0].geometry?.location) {
            map.setCenter(results[0].geometry.location);
          }
          loadPlaces();
        }
      );
    }

    async function loadPlaces() {
      if (!map) return;
      if (!itinerary.days) {
        throw new Error("No days");
      }
      const allPlaces = itinerary.days.flatMap((day) => day.placesToVisit);
      allPlaces.forEach((place) =>
        placesService.findPlaceFromQuery(
          {
            fields: [
              "geometry",
              "photos",
              "place_id",
              "formatted_address",
              "name",
            ],
            query: place,
          },
          (result) => {
            if (!result) return;
            setPlaces((places) => places.concat(result[0]));
            const marker = new google.maps.Marker({
              position: result[0].geometry?.location,
              map,
            });
            setMarkers((markers) => markers.concat(marker));
          }
        )
      );
    }

    loadDestination();
  }, [google, itinerary, map]);

  return (
    <section className="p-8">
      <Heading level="h3" className="mb-6">
        Explore {itinerary.destination}
      </Heading>
      <div className="grid rounded-2xl shadow-xl bg-white">
        <div id="map" ref={mapRef} className="w-full h-96 rounded-t-2xl" />
        <div className="rounded-b-2xl p-6 flex gap-6 overflow-auto">
          {places.map((place) => (
            <div
              key={place.place_id}
              className="rounded-xl w-64 shrink-0 shadow-lg border border-solid border-gray-200"
            >
              {place.photos?.[0] && (
                <div className="w-full h-48 overflow-hidden rounded-t-xl object-cover">
                  <Image
                    src={place.photos?.[0].getUrl()}
                    className="object-cover rounded-t-xl"
                    alt=""
                    width={256}
                    height={192}
                  />
                </div>
              )}
              <div className="p-3">
                <p className="font-semibold mb-2">{place.name}</p>
                <p className="text-slate-600 text-sm">
                  {place.formatted_address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrimaryButton className="mx-auto my-6" onClick={onClear}>
        Clear and return to start
      </PrimaryButton>
    </section>
  );
}
