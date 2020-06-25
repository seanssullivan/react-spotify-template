// src/hooks/useWebPlaybackSDK/index.js

import { useState, useCallback } from "react";

import {
  handleInitializationError,
  handleAuthenticationError,
  handleAccountError,
  handlePlaybackError,
  handlePlayerStateChange,
  handlePlayerReady,
  handlePlayerNotReady,
} from "./handlers";

// TODO: Refactor constants into settings file.
const CLIENT_NAME = "React Spotify Player";

/**
 * Spotify's Web Playback SDK creates a connection between the app and a user's Spotify account.
 * @param {String} accessToken - A valid Spotify access token
 * @param {Object} options
 */
export default function useSpotifyWebPlaybackSDK(accessToken, options) {
  const [spotifyPlayer, setSpotifyPlayer] = useState(null);

  const onSpotifyWebPlaybackSDKReady = useCallback(() => {
    // Initialize Spotify Player
    const spotifyPlayer = initializeSpotifyPlayer(accessToken, options);

    // Add listeners to Spotify Player
    attachListeners(spotifyPlayer);

    // Connect player to Spotify
    spotifyPlayer.connect().then((success) => {
      if (success) {
        console.log("The Web Playback SDK successfully connected to Spotify!");
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
const attachListeners = (player) => {
  player.addListener("initialization_error", handleInitializationError);
  player.addListener("authentication_error", handleAuthenticationError);
  player.addListener("account_error", handleAccountError);
  player.addListener("playback_error", handlePlaybackError);
  player.addListener("player_state_changed", handlePlayerStateChange);
  player.addListener("ready", handlePlayerReady);
  player.addListener("not_ready", handlePlayerNotReady);
};
