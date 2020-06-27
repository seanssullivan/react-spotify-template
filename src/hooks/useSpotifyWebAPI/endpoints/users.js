// src/hooks/useSpotifyWebAPI/endpoints/users.js

/**
 * Endpoints for retrieving information about a user’s profile.
 * @param {Object} api - An instance of the SpotifyWebAPI parent class object.
 */
export default class UsersEndpoint {
  constructor(api) {
    this._api = api;
    this._url = "";
  }

  /**
   * Get detailed profile information about the current user.
   */
  getCurrentUserProfile() {
    const config = {
      url: this._url + "/me",
    };
    return this._api.get(config);
  }

  /**
   * Get public profile information about a user.
   * @param {String} userId
   */
  getAnotherUsersProfile(userId) {
    const config = {
      url: this._url + `/users/${userId}`,
    };
    return this._api.get(config);
  }
}
