// src/hooks/useSpotifyWebAPI/endpoints/search.js

/**
 * The search endpoint allows access to catalog information about
 * albums, artists, playlists, tracks, shows or episodes that match a keyword string.
 * @param {Object} api - An instance of the SpotifyWebAPI parent class object.
 */
export default class SearchEndpoint {
  constructor(api) {
    this._api = api;
    this._url = "/search";
    this._validSearchTypes = [
      "album",
      "artist",
      "playlist",
      "track",
      "show",
      "episode",
    ];
  }

  /**
   * Confirms that each search type in the array is valid.
   * @param {Array} searchTypes - Array of search types.
   * - Valid search types are `album`, `artist`, `playlist`, `track`, `show` and `episode`
   */
  confirmSearchTypes(searchTypes) {
    searchTypes.forEach((searchType) => {
      if (!this._validSearchTypes.includes(searchType)) {
        throw Error(`${searchType} is not a valid search type`);
      }
    });
  }

  /**
   * Query the search endpoint.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Array} searchTypes - Array of search types.
   * - Valid search types are `album`, `artist`, `playlist`, `track`, `show` and `episode`
   * @param {Objects} options - Optional query parameters.
   */
  query(keywords, searchTypes, options = {}) {
    this.confirmSearchTypes(searchTypes);
    const config = {
      q: keywords,
      type: searchTypes.join(","),
      ...options,
    };
    return this._api.get(config);
  }

  /**
   * Shortcut method to query the search endpoint for albums.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Object} options - Optional query parameters.
   */
  albums(keywords, options = {}) {
    const itemTypes = ["album"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for artists.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Object} options - Optional query parameters.
   */
  artists(keywords, options = {}) {
    const itemTypes = ["artist"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for playlists.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Object} options - Optional query parameters.
   */
  playlists(keywords, options = {}) {
    const itemTypes = ["playlist"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for tracks.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Object} options - Optional query parameters.
   */
  tracks(keywords, options = {}) {
    const itemTypes = ["track"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for shows.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Object} options - Optional query parameters.
   */
  shows(keywords, options = {}) {
    const itemTypes = ["show"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for episodes.
   * @param {String} keywords - Keywords to include in the search query.
   * @param {Object} options - Optional query parameters.
   */
  episodes(keywords, options = {}) {
    const itemTypes = ["episode"];
    return this.query(keywords, itemTypes, options);
  }
}
