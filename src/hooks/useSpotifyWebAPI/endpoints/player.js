// src/hooks/useSpotifyWebAPI/endpoints/player.js

export default class PlayerEndpoint {
  constructor(api) {
    this.api = api;
    this.url = "/me/player";
  }

  /**
   * Method to get information about the current playback context.
   */
  currentPlayback() {
    const config = {
      url: this.url,
    };
    return this.api.get(config);
  }

  /**
   * Method to get the currently playing track.
   */
  currentlyTrack() {
    const config = {
      url: this.url + "/currently-playing",
    };
    return this.api.get(config);
  }

  /**
   * A method to get recently played tracks.
   * @param {Object} options - Optional parameters
   * - `limit`: Maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * - `after`: Unix timestamp in milliseconds. Returns all items after (but not including) this cursor position. If `after` is specified, `before` must not be specified.
   * - `before`: Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position. If `before` is specified, `after` must not be specified.
   */
  recentlyPlayed(options) {
    const config = {
      url: this.url + "/recently-played",
    };
    if (options) {
      config.params = options;
    }
    return this.api.get(config);
  }

  /**
   * Method to transfer playback to the provided device.
   * @param {String} deviceId - Id of the device this command is targeting.
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
   * @param {String} deviceId - Id of the device this command is targeting.
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
   * @param {String} deviceId - Id of the device this command is targeting.
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
   * @param {String} deviceId - Id of the device this command is targeting.
   */
  resumePlayback(deviceId) {
    return this.startPlayback(deviceId);
  }

  /**
   * Method to seek position in currently playing track.
   * @param {String} deviceId - Id of the device this command is targeting.
   * @param {Number} position - The position in milliseconds to seek to.
   * - `position` must be a positive number.
   * - Passing in a `position` that is greater than the length of the track will cause the player to start playing the next song.
   */
  seekPosition(deviceId, position) {
    const config = {
      url: this.url + "/seek",
      params: {
        position_ms: position,
        device_id: deviceId,
      },
    };
    return this.api.put(config);
  }

  /**
   * Method to skip playback to the next track on the provided device.
   * @param {String} deviceId - Id of the device this command is targeting.
   */
  nextTrack(deviceId) {
    const config = {
      url: this.url + "/next",
      params: {
        device_id: deviceId,
      },
    };
    return this.api.post(config);
  }

  /**
   * Method to skip playback to the previous track on the provided device.
   * @param {String} deviceId - Id of the device this command is targeting.
   */
  previousTrack(deviceId) {
    const config = {
      url: this.url + "/previous",
      params: {
        device_id: deviceId,
      },
    };
    return this.api.post(config);
  }

  /**
   * Method to set volume for playback.
   * @param {String} deviceId - Id of the device this command is targeting.
   * @param {Number} percent
   */
  setVolume(deviceId, percent) {
    const config = {
      url: this.url + "/volume",
      params: {
        volume_percent: percent,
        device_id: deviceId,
      },
    };
    return this.api.put(config);
  }
}
