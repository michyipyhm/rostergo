// lib/cors.ts

import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the CORS middleware
const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
    origin: '*', // Replace '*' with your allowed origins
});

// Helper function to wait for middleware to execute before continuing
const runCors = (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject) => {
        cors(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

export default runCors;