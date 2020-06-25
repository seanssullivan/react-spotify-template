// src/hooks/useWebAPI.js

import axios from "axios";

export default function useSpotifyWebAPI(props) {
  const { spotifyPlayer } = props;
}

/**
 * Send request to Spotify Web API to transfer playback to the current device.
 * @param {Object} spotifyPlayer -
 */
const transferPlaybackToDevice = async (spotifyPlayer, autoplay = false) => {
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
        play: autoplay,
      },
    });
  });
};

/**
 * Send request to Spotify Web API to initiate playback on the current device.
 * @param {Object} spotifyPlayer
 * @param {String} spotifyUri
 */
const initiatePlaybackOnDevice = async (spotifyPlayer, spotifyUri) => {
  const {
    _options: { getOAuthToken, id },
  } = spotifyPlayer;
  // Begin playback on current device
  await getOAuthToken((access_token) => {
    axios({
      url: "/me/player/play",
      baseURL: "https://api.spotify.com/v1/",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        device_id: id,
      },
      data: {
        context_uri: spotifyUri,
      },
    });
  });
};

/**
 * Send request to Spotify Web API to start playback.
 * @param {Object} spotifyPlayer
 * @param {String} spotifyUri
 */
const startPlayback = async (spotifyPlayer, spotifyUri) => {
  const {
    _options: { getOAuthToken },
  } = spotifyPlayer;
  // Begin playback on current device
  await getOAuthToken((access_token) => {
    axios({
      url: "/me/player/play",
      baseURL: "https://api.spotify.com/v1/",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        context_uri: spotifyUri,
      },
    });
  });
};

/**
 * Send request to Spotify Web API to resume playback.
 * @param {Object} spotifyPlayer
 */
const resumePlaybackOnDevice = async (spotifyPlayer) => {
  const {
    _options: { getOAuthToken, id },
  } = spotifyPlayer;
  // Resume playback on current device
  await getOAuthToken((access_token) => {
    axios({
      url: "/me/player/play",
      baseURL: "https://api.spotify.com/v1/",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        device_id: id,
      },
    });
  });
};

const pausePlaybackOnDevice = async (spotifyPlayer) => {
  const {
    _options: { getOAuthToken, id },
  } = spotifyPlayer;
  // Pause playback on current device
  await getOAuthToken((access_token) => {
    axios({
      url: "/me/player/pause",
      baseURL: "https://api.spotify.com/v1/",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        device_id: id,
      },
    });
  });
};
