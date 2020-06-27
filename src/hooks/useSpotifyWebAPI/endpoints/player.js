// src/hooks/useSpotifyWebAPI/endpoints/player.js

export default class PlayerEndpoint {
  constructor(api) {
    this.api = api;
    this.url = "/me/player";
  }

  /**
   * Method to get the currently playing track.
   */
  currentlyPlaying() {
    const config = {
      url: this.url + "/currently-playing",
    };
    return this.api.get(config);
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

  /**
   * Method to skip playback to the next track on the provided device.
   * @param {String} deviceId
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
   * @param {String} deviceId
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
}
