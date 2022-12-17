export default function buildMarkerContent(
  place: google.maps.places.PlaceResult
) {
  return `
  <div className="p-3">
    <p style="font-weight: 600; margin-bottom: 0.5rem; font-size: 1rem; line-height: 1.25rem">${place.name}</p>
    <p style="color: #475569; font-size: 0.875rem; line-height: 1.25rem">
      ${place.formatted_address}
    </p>
  </div>
`;
}
