// src/hooks/useWebAPI.js

import axios from "axios";

export default function useSpotifyWebAPI(props) {
  const { player } = props;
}

/**
 * Transfer playback to the current device.
 * @param {Object} spotifyPlayer -
 */
const transferPlaybackToDevice = async (spotifyPlayer) => {
  const {
    _options: { getOAuthToken, id },
  } = spotifyPlayer;
  await getOAuthToken((access_token) => {
    // Transfer Spotify to current device
    axios({
      url: "/v1/me/player",
      baseURL: "https://api.spotify.com/",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        device_ids: [id],
        play: false,
      },
    });
  });
};

/**
 * Initiate playback on the current device.
 * @param {Object} spotifyPlayer
 * @param {String} spotifyUri
 */
const initiatePlaybackOnDevice = async (spotifyPlayer, spotifyUri) => {
  const {
    _options: { getOAuthToken, id },
  } = spotifyPlayer;
  // Begin playback on current device
  await getOAuthToken((access_token) => {
    // TODO: Refactor fetch request into an axios request
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({
        context_uri: spotifyUri,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};
