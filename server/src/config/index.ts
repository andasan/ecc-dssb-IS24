import dotenv from 'dotenv';
dotenv.config();

const { CLIENT_URL, NODE_ENV, PORT, LOCATION_URL } = process.env;

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = NODE_ENV || 'development';

export default {
    clientUrl: CLIENT_URL,
    locationUrl: LOCATION_URL,
    port: parseInt(PORT, 10),
    api: {
        prefix: '/api',
    },
};