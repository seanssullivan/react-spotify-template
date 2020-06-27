// src/hooks/useSpotifyWebAPI/endpoints/search.js

export default class SearchEndpoint {
  constructor(api) {
    this._api = api;
    this._url = "/search";
  }

  /**
   * Query the search endpoint.
   * @param {String} keywords
   * @param {Array} itemTypes
   * @param {Objects} options
   */
  query(keywords, itemTypes, options = {}) {
    const config = {
      q: keywords,
      type: itemTypes.join(","),
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
