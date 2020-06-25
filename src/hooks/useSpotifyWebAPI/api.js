// src/hooks/useSpotifyWebAPI/api.js

import axios from "axios";
import PlayerEndpoint from "./endpoints/player";

export default class SpotifyWebAPI {
  constructor(accessToken) {
    this.baseURL = "https://api.spotify.com/v1/";
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    // Define API endpoints
    this.player = new PlayerEndpoint(this);
  }

  /**
   * Method to handle all requests made to the Spotify Web API.
   * @param {Object} config
   */
  request(config) {
    return axios({
      baseURL: this.baseURL,
      headers: this.headers,
      ...config,
    });
  }

  /**
   * Shortcut method for making GET requests to the API.
   * @param {Object} config
   */
  get(config) {
    return this.request({ method: "GET", ...config });
  }

  /**
   * Shortcut method for making POST requests to the API.
   * @param {Object} config
   */
  post(config) {
    return this.request({ method: "POST", ...config });
  }

  /**
   * Shortcut method for making PUT requests to the API.
   * @param {Object} config
   */
  put(config) {
    return this.request({ method: "PUT", ...config });
  }
}
