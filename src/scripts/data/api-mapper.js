import Map from '../utils/map';

export async function storyMapper(story) {
  const lat = story.location?.lat ?? story.lat;
  const lon = story.location?.lon ?? story.lon;

  if (!lat || !lon) {
    return {
      ...story,
      location: {
        lat: lat,
        lon: lon,
        placeName: 'Lokasi tidak tersedia',
      },
    };
  }

  const placeName = await Map.getPlaceNameByCoordinate(lat, lon);

  return {
    ...story,
    location: {
      lat: lat,
      lon: lon,
      placeName: placeName,
    },
  };
}
