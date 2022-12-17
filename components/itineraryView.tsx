import React, { useEffect, useMemo, useRef, useState } from "react";
import { Itinerary } from "../types/itinerary";
import PrimaryButton from "./primaryButton";
import Heading from "./heading";
import FlyingPlaneLoader from "./flyingPlaneLoader";
import buildMarkerContent from "../util/buildMarkerContent";

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
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map>();
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [markers, setMarkers] = useState<
    { id: string; marker: google.maps.Marker }[]
  >([]);
  const [activePlace, setActivePlace] =
    useState<google.maps.places.PlaceResult>();

  const infoWindow = useMemo(
    () => new google.maps.InfoWindow(),
    [google.maps.InfoWindow]
  );

  useEffect(() => {
    if (!mapRef.current) {
      throw new Error("no map");
    }
    if (map) {
      return;
    }
    var center = new google.maps.LatLng(0, 0);
    const newMap = new google.maps.Map(mapRef.current, {
      center,
      zoom: 1,
    });
    setMap(newMap);
  }, [google, map]);

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
      const allPlaces = [
        ...new Set(itinerary.days.flatMap((day) => day.placesToVisit)),
      ];
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
            const place = result[0];
            setPlaces((places) => places.concat(place));
            const marker = new google.maps.Marker({
              position: result[0].geometry?.location,
              clickable: true,
              map,
            });
            marker.addListener("click", () => {
              const content = buildMarkerContent(place);
              infoWindow.setContent(content);
              infoWindow.open(map, marker);
              setActivePlace(place);
            });
            if (!place.place_id) {
              throw new Error("Place missing id");
            }
            const id = place.place_id;
            setMarkers((markers) => markers.concat({ id, marker }));
          }
        )
      );
      setLoading(false);
    }

    loadDestination();
  }, [google, itinerary, map, infoWindow]);

  const handlePlaceClick = React.useCallback(
    (place: google.maps.places.PlaceResult) => {
      setActivePlace(place);
      const marker = markers.find((marker) => marker.id === place.place_id);
      const content = buildMarkerContent(place);
      infoWindow.setContent(content);
      infoWindow.open(map, marker?.marker);
    },
    [markers, infoWindow, map]
  );

  return (
    <section className="p-8">
      <Heading level="h3" className="mb-6">
        Explore {itinerary.destination}
      </Heading>
      <div className="relative grid">
        <div
          id="map"
          ref={mapRef}
          className={`w-full h-96 rounded-t-2xl ${
            loading ? "invisible" : "visible"
          }`}
        />
        {loading ? (
          <div className="absolute h-full w-full grid place-content-center">
            <FlyingPlaneLoader />
          </div>
        ) : (
          <div className="rounded-b-2xl p-6 flex gap-6 overflow-auto bg-white">
            {places.map((place) => (
              <button
                id={place.place_id}
                key={place.place_id}
                className={`rounded-xl w-64 shrink-0 flex flex-col text-left border border-solid transition-all  ${
                  activePlace?.place_id === place.place_id
                    ? "border-sky-700 shadow-lg"
                    : "border-gray-200"
                }`}
                onClick={() => handlePlaceClick(place)}
              >
                {place.photos?.[0] && (
                  <div className="w-full h-48 overflow-hidden rounded-t-xl object-cover">
                    <img
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
              </button>
            ))}
          </div>
        )}
      </div>
      <PrimaryButton className="mx-auto my-6" onClick={onClear}>
        Clear and return to start
      </PrimaryButton>
    </section>
  );
}
