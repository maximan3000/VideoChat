const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US");
};

export default formatTimestamp;
