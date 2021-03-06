// src/hooks/useSpotifyWebAPI/endpoints/library.js

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
   * Return list of saved albums.
   */
  get albums() {
    return this.getSavedAlbums();
  }

  /**
   * Return list of saved shows.
   */
  get shows() {
    return this.getSavedShows();
  }

  /**
   * Return list of saved tracks.
   */
  get tracks() {
    return this.getSavedTracks();
  }

  /**
   * Method to handle all GET requests to retrieve items from the library endpoint.
   * @param {String} itemType - Saved item type (either albums, shows or tracks).
   * @param {Object} options
   */
  _getSavedItems(itemType, options = {}) {
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
  getSavedAlbums(options = {}) {
    return this._getSavedItems("albums", options);
  }

  /**
   * Get a list of shows saved in the current user’s library.
   * @param {Object} options - Optional parameters can be used to limit the number of shows returned.
   * - `limit`: Maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * - `offset`: The index of the first object to return. Default: 0.
   */
  getSavedShows(options = {}) {
    return this._getSavedItems("shows", options);
  }

  /**
   * Get a list of the songs saved in the current user’s library.
   * @param {Object} options - Optional parameters can be used to limit the number of songs returned.
   * - `limit`: Maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * - `offset`: The index of the first object to return. Default: 0.
   * - `market`: An ISO 3166-1 alpha-2 country code or the string `from_token`. (Applies track relinking.)
   */
  getSavedTracks(options = {}) {
    return this._getSavedItems("tracks", options);
  }

  /**
   * Method to handle all GET requests to check if items are already saved in the current user's library.
   * @param {String} itemType - Saved item type (either albums, shows or tracks).
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
   * https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-albums/
   * @param {*} albumIds - A comma-separated list of the IDs for the albums. Maximum: 50 IDs.
   */
  containsAlbums(albumIds) {
    return this._containsItems("albums", albumIds);
  }

  /**
   * Check if one or more shows are already saved in the current user’s library.
   * https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-shows/
   * @param {*} showIds - A comma-separated list of the IDs for the shows. Maximum: 50 IDs.
   */
  containsShows(showIds) {
    return this._containsItems("shows", showIds);
  }

  /**
   * Check if one or more tracks are already saved in the current user’s library.
   * https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-tracks/
   * @param {*} trackIds - A comma-separated list of the IDs for the tracks. Maximum: 50 IDs.
   */
  containsTracks(trackIds) {
    return this._containsItems("tracks", trackIds);
  }

  /**
   * Method to handle all PUT requests to save items to the current user's library.
   * @param {String} itemType - Saved item type (either albums, shows or tracks).
   * @param {Array} itemIds
   */
  _saveItems(itemType, itemIds) {
    const config = {
      url: [this._url, itemType].join("/"),
      params: {
        ids: itemIds.join(","),
      },
    };
    return this._api.put(config);
  }

  /**
   * Save one or more albums to the current user’s library.
   * https://developer.spotify.com/documentation/web-api/reference/library/save-albums-user/
   * @param {*} albumIds - A comma-separated list of the IDs for the albums. Maximum: 50 IDs.
   */
  saveAlbums(albumIds) {
    return this._saveItems("albums", albumIds);
  }

  /**
   * Save one or more shows to current user’s library.
   * https://developer.spotify.com/documentation/web-api/reference/library/save-shows-user/
   * @param {*} showIds - A comma-separated list of the IDs for the shows. Maximum: 50 IDs.
   */
  saveShows(showIds) {
    return this._saveItems("shows", showIds);
  }

  /**
   * Save one or more tracks to the current user’s library.
   * https://developer.spotify.com/documentation/web-api/reference/library/save-tracks-user/
   * @param {*} trackIds - A comma-separated list of the IDs for the tracks. Maximum: 50 IDs.
   */
  saveTracks(trackIds) {
    return this._csaveItems("tracks", trackIds);
  }
}
