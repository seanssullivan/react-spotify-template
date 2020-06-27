// src/hooks/useSpotifyWebAPI/endpoints/player.js

export default class PlayerEndpoint {
  constructor(api) {
    this._api = api;
    this._url = "/me/player";
  }

  /**
   * Return list of available devices.
   */
  get devices() {
    return this.getDevices();
  }

  /**
   * Return current playback context.
   */
  get context() {
    return this.currentPlayback();
  }

  /**
   * Return currently playing track.
   */
  get current() {
    return this.currentlyPlaying();
  }

  /**
   * Get list of available devices.
   */
  getDevices() {
    const config = {
      url: this._url + "/devices",
    };
    return this._api.get(config);
  }

  /**
   * Method to get information about the current playback context.
   */
  currentPlayback() {
    const config = {
      url: this._url,
    };
    return this._api.get(config);
  }

  /**
   * Method to get the currently playing track.
   */
  currentlyPlaying() {
    const config = {
      url: this._url + "/currently-playing",
    };
    return this._api.get(config);
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
      url: this._url + "/recently-played",
    };
    if (options) {
      config.params = options;
    }
    return this._api.get(config);
  }

  /**
   * Add an item to the playback queue.
   * @param {*} deviceId
   * @param {*} contentUri
   */
  addToQueue(deviceId, contentUri) {
    const config = {
      url: this._url + "/queue",
      params: {
        device_id: deviceId,
        uri: contentUri,
      },
    };
    return this._api.post(config);
  }

  /**
   * Method to transfer playback to the provided device.
   * @param {String} deviceId - Id of the device this request is targeting.
   * @param {Boolean} autoplay
   */
  transferPlayback(deviceId, autoplay = false) {
    const config = {
      url: this._url,
      data: {
        device_ids: [deviceId],
        play: autoplay,
      },
    };
    return this._api.put(config);
  }

  /**
   * Method to start playback on the provided device.
   * @param {String} deviceId - Id of the device this request is targeting.
   * @param {String} contextUri
   */
  startPlayback(deviceId, contextUri = null) {
    const config = {
      url: this._url + "/play",
      params: {
        device_id: deviceId,
      },
    };
    if (contextUri) {
      config.data = {
        context_uri: contextUri,
      };
    }
    return this._api.put(config);
  }

  /**
   * Method to pause playback on the provided device.
   * @param {String} deviceId - Id of the device this request is targeting.
   */
  pausePlayback(deviceId) {
    const config = {
      url: this._url + "/pause",
      params: {
        device_id: deviceId,
      },
    };
    return this._api.put(config);
  }

  /**
   * Method to resume playback on the provided device.
   * @param {String} deviceId - Id of the device this request is targeting.
   */
  resumePlayback(deviceId) {
    return this.startPlayback(deviceId);
  }

  /**
   * Method to seek position in currently playing track.
   * @param {String} deviceId - Id of the device this request is targeting.
   * @param {Number} position - The position in milliseconds to seek to.
   * - `position` must be a positive number.
   * - Passing in a `position` that is greater than the length of the track will cause the player to start playing the next song.
   */
  seekPosition(deviceId, position) {
    const config = {
      url: this._url + "/seek",
      params: {
        position_ms: position,
        device_id: deviceId,
      },
    };
    return this._api.put(config);
  }

  /**
   * Method to skip playback to the next track on the provided device.
   * @param {String} deviceId - Id of the device this request is targeting.
   */
  nextTrack(deviceId) {
    const config = {
      url: this._url + "/next",
      params: {
        device_id: deviceId,
      },
    };
    return this._api.post(config);
  }

  /**
   * Method to skip playback to the previous track on the provided device.
   * @param {String} deviceId - Id of the device this request is targeting.
   */
  previousTrack(deviceId) {
    const config = {
      url: this._url + "/previous",
      params: {
        device_id: deviceId,
      },
    };
    return this._api.post(config);
  }

  /**
   * Method to set volume for playback.
   * @param {String} deviceId - Id of the device this request is targeting.
   * @param {Number} percent
   */
  setVolume(deviceId, percent) {
    const config = {
      url: this._url + "/volume",
      params: {
        volume_percent: percent,
        device_id: deviceId,
      },
    };
    return this._api.put(config);
  }

  /**
   * Set repeat mode on playback.
   * @param {String} deviceId - Id of the device this request is targeting.
   * @param {String} targetState - Repeat state (either `track`, `context` or `off`)
   * - `track` will repeat the current track.
   * - `context` will repeat the current context.
   * - `off` will turn repeat off.
   */
  setRepeat(deviceId, repeatState) {
    // repeatState must be either 'track', 'context' or 'off'
    if (!["track", "context", "off"].includes(repeatState)) {
      throw Error("invalid repeat state");
    }

    const config = {
      url: this._url + "/repeat",
      params: {
        state: repeatState,
        device_id: deviceId,
      },
    };
    return this._api.put(config);
  }

  /**
   * Toggle shuffle for playback.
   * @param {String} deviceId - Id of the device this request is targeting.
   * @param {Boolean} shuffleState - Shuffle state:
   * - `true` : Shuffle user’s playback.
   * - `false` : Do not shuffle user’s playback.
   */
  setShuffle(deviceId, shuffleState) {
    if (typeof shuffleState !== "boolean") {
      throw Error("invalid shuffle state");
    }

    const config = {
      url: this._url + "/shuffle",
      params: {
        state: shuffleState,
        device_id: deviceId,
      },
    };
    return this._api.put(config);
  }
}
