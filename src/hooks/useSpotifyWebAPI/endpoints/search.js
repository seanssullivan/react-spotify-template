// src/hooks/useSpotifyWebAPI/endpoints/search.js

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
   * @param {Array} searchTypes
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
   * @param {String} keywords
   * @param {Array} searchTypes
   * @param {Objects} options
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
   * @param {String} keywords
   * @param {Object} options
   */
  forAlbums(keywords, options = {}) {
    const itemTypes = ["album"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for artists.
   * @param {String} keywords
   * @param {Object} options
   */
  forArtists(keywords, options = {}) {
    const itemTypes = ["artist"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for playlists.
   * @param {String} keywords
   * @param {Object} options
   */
  forPlaylists(keywords, options = {}) {
    const itemTypes = ["playlist"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for tracks.
   * @param {String} keywords
   * @param {Object} options
   */
  forTracks(keywords, options = {}) {
    const itemTypes = ["track"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for shows.
   * @param {String} keywords
   * @param {Object} options
   */
  forShows(keywords, options = {}) {
    const itemTypes = ["show"];
    return this.query(keywords, itemTypes, options);
  }

  /**
   * Shortcut method to query the search endpoint for episodes.
   * @param {String} keywords
   * @param {Object} options
   */
  forEpisodes(keywords, options = {}) {
    const itemTypes = ["episode"];
    return this.query(keywords, itemTypes, options);
  }
}
