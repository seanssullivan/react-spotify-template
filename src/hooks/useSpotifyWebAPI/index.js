// src/hooks/useSpotifyWebAPI/index.js

export default function useSpotifyWebAPI(props) {
  const { spotifyPlayer } = props;

  const play = () => {};
  const pause = () => {};
  const resume = () => {};

  return [play, pause, resume];
}
