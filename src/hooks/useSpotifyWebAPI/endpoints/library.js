// src/hooks/useSpotifyWebAPI/endpoints/player.js

/**
 * Endpoints for retrieving information about, and managing, tracks that the current user has saved in their library.
 * https://developer.spotify.com/documentation/web-api/reference/library/
 * @param {Object} api - An instance of the SpotifyWebAPI parent class object.
 */
export default class LibraryEndpoint {
  constructor(api) {
    this._api = api;
    this._url = "/me";
    this._validItems = ["albums", "shows", "tracks"];
  }

  /**
   * Method to handle all GET requests to retrieve items from the library endpoint.
   * @param {String} itemType
   * @param {Object} options
   */
  _getSavedItems(itemType, options) {
    if (!this._validItems.includes(itemType)) {
      throw Error(`${itemType} is not a valid item type`);
    }
    const config = {
      url: [this._url, itemType].join("/"),
    };
    if (options) {
      config.params = options;
    }
    return this._api.get(config);
  }

  /**
   * Get a list of the albums saved in the current user’s library.
   * @param {Object} options - Optional parameters can be used to limit the number of albums returned.
   * - `limit`: Maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * - `offset`: The index of the first object to return. Default: 0.
   * - `market`: An ISO 3166-1 alpha-2 country code or the string `from_token`. (Applies track relinking.)
   */
  getSavedAlbums(options) {
    return this._getSavedItems("albums", options);
  }

  /**
   * Get a list of shows saved in the current user’s library.
   * @param {Object} options - Optional parameters can be used to limit the number of shows returned.
   * - `limit`: Maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * - `offset`: The index of the first object to return. Default: 0.
   */
  getSavedShows(options) {
    return this._getSavedItems("shows", options);
  }

  /**
   * Get a list of the songs saved in the current user’s library.
   * @param {Object} options - Optional parameters can be used to limit the number of songs returned.
   * - `limit`: Maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * - `offset`: The index of the first object to return. Default: 0.
   * - `market`: An ISO 3166-1 alpha-2 country code or the string `from_token`. (Applies track relinking.)
   */
  getSavedTracks(options) {
    return this._getSavedItems("tracks", options);
  }

  /**
   * Method to handle all GET requests to check if items are already saved in the current user's library.
   * @param {String} itemType
   * @param {Array} itemIds
   */
  _containsItems(itemType, itemIds) {
    const config = {
      url: [this._url, itemType, "contains"].join("/"),
      params: {
        ids: itemIds.join(","),
      },
    };
    return this._api.get(config);
  }

  /**
   * Check if one or more albums are already saved in the current user’s library.
   * @param {*} albumIds - A comma-separated list of the IDs for the albums. Maximum: 50 IDs.
   */
  containsAlbums(albumIds) {
    return this._containsItems("albums", albumIds);
  }

  /**
   * Check if one or more shows are already saved in the current user’s library.
   * @param {*} showIds - A comma-separated list of the IDs for the shows. Maximum: 50 IDs.
   */
  containsShows(showIds) {
    return this._containsItems("shows", showIds);
  }

  /**
   * Check if one or more tracks are already saved in the current user’s library.
   * @param {*} trackIds - A comma-separated list of the IDs for the tracks. Maximum: 50 IDs.
   */
  containsTracks(trackIds) {
    return this._containsItems("tracks", trackIds);
  }
}
