/**
 * Callback to handle initialization errors.
 * @param {Object} player - Player object containing a message property.
 */
export const handleInitializationError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle authentication errors.
 * @param {Object} player - Player object containing a message property.
 */
export const handleAuthenticationError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle account errors.
 * @param {Object} player - Player object containing a message property.
 */
export const handleAccountError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle playback errors.
 * @param {Object} player - Player object containing a message property.
 */
export const handlePlaybackError = ({ message }) => {
  console.error(message);
};

/**
 * Callback to handle whenever the player state changes.
 * @param {Object} player - Player object containing a state property.
 */
export const handlePlayerStateChange = ({ state }) => {
  console.error(state);
};

/**
 * Callback to handle when the Spotify Player is ready.
 * @param {Object} player - Player object containing a device_id property.
 */
export const handlePlayerReady = ({ device_id }) => {
  console.log("Ready with Device ID", device_id);
};

/**
 * Callback to handle when the Spotify Player is not ready.
 * @param {Object} player - Player object containing a device_id property.
 */
export const handlePlayerNotReady = ({ device_id }) => {
  console.log("Device ID has gone offline", device_id);
};
