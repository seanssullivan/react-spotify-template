// src/hooks/useWebAPI.js

import axios from "axios";

export default function useSpotifyWebAPI(props) {
  const { spotifyPlayer } = props;
}

class SpotifyWebAPI {
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

class PlayerEndpoint {
  constructor(api) {
    this.api = api;
    this.url = "/me/player";
  }

  /**
   * Method to transfer playback to the provided device.
   * @param {String} deviceId
   * @param {Boolean} autoplay
   */
  transferPlayback(deviceId, autoplay = false) {
    const config = {
      url: this.url,
      data: {
        device_ids: [deviceId],
        play: autoplay,
      },
    };
    return this.api.put(config);
  }

  /**
   * Method to start playback on the provided device.
   * @param {String} deviceId
   * @param {String} contextUri
   */
  startPlayback(deviceId, contextUri = null) {
    const config = {
      url: this.url + "/play",
      params: {
        device_id: deviceId,
      },
    };
    if (contextUri) {
      config.data = {
        context_uri: contextUri,
      };
    }
    return this.api.put(config);
  }

  /**
   * Method to pause playback on the provided device.
   * @param {String} deviceId
   */
  pausePlayback(deviceId) {
    const config = {
      url: this.url + "/pause",
      params: {
        device_id: deviceId,
      },
    };
    return this.api.put(config);
  }

  /**
   * Method to resume playback on the provided device.
   * @param {String} deviceId
   */
  resumePlayback(deviceId) {
    return this.startPlayback(deviceId);
  }
}
