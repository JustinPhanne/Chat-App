import express from 'express';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';

const app = express(); 
const __dirname = path.resolve(); // Get the current directory path

const PORT = ENV.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Serve static files from the frontend
if (ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist'))); 

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html')); // Serve the main HTML file for any other routes
    });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
