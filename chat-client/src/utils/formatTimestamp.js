/**
 * Converts timestamp to string of format like "5:05:14 PM"
 * @param {number} timestamp
 * @return {string} Formatted time
 */
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US');
};

export default formatTimestamp;
