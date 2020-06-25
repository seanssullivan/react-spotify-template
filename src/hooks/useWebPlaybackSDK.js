// src/hooks/useWebPlaybackSDK.js

import { useState, useCallback } from "react";

// TODO: Refactor constants into settings file.
const CLIENT_NAME = "React Spotify Player";

/**
 * Spotify's Web Playback SDK creates a connection between the app and a user's Spotify account.
 */
export default function useWebPlaybackSDK(accessToken, options) {
  const [spotifyPlayer, setSpotifyPlayer] = useState(null);

  const onSpotifyWebPlaybackSDKReady = useCallback(() => {
    // Initialize Spotify Player
    const spotifyPlayer = initializeSpotifyPlayer(accessToken, options);

    // Add listeners to Spotify Player
    addListeners(spotifyPlayer);

    // Connect player to Spotify
    spotifyPlayer.connect().then((success) => {
      if (success) {
        console.log("Connected to Spotify Web Playback SDK!");
      }
    });

    // Store Spotify player in local state
    setSpotifyPlayer(spotifyPlayer);
  }, [accessToken, options]);

  return [spotifyPlayer, onSpotifyWebPlaybackSDKReady];
}

/**
 * Initialize the Spotify Player.
 * @param {*} accessToken - Spotify access token.
 */
const initializeSpotifyPlayer = function (accessToken, options) {
  return new window.Spotify.Player({
    name: CLIENT_NAME,
    getOAuthToken: (cb) => {
      cb(accessToken);
    },
    volume: options.volume,
  });
};

/**
 * Add listeners to the Spotify Player.
 * @param {Object} player
 */
const addListeners = (player) => {
  player.addListener("initialization_error", handleInitializationError);
  player.addListener("authentication_error", handleAuthenticationError);
  player.addListener("account_error", handleAccountError);
  player.addListener("playback_error", handlePlaybackError);
  player.addListener("player_state_changed", handlePlayerStateChange);
  player.addListener("ready", handlePlayerReady);
  player.addListener("not_ready", handlePlayerNotReady);
};

/**
 * Callback to handle initialization errors.
 * @param {Object} player - Player object containing a message property.
 */
const handleInitializationError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle authentication errors.
 * @param {Object} player - Player object containing a message property.
 */
const handleAuthenticationError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle account errors.
 * @param {Object} player - Player object containing a message property.
 */
const handleAccountError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle playback errors.
 * @param {Object} player - Player object containing a message property.
 */
const handlePlaybackError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle whenever the player state changes.
 * @param {Object} player - Player object containing a state property.
 */
const handlePlayerStateChange = ({ state }) => {
  console.error(state);
};

/**
 * Callback to handle when the Spotify Player is ready.
 * @param {Object} player - Player object containing a device_id property.
 */
const handlePlayerReady = ({ device_id }) => {
  console.log("Ready with Device ID", device_id);
};

/**
 * Callback to handle when the Spotify Player is not ready.
 * @param {Object} player - Player object containing a device_id property.
 */
const handlePlayerNotReady = ({ device_id }) => {
  console.log("Device ID has gone offline", device_id);
};
