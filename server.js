const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory

// Store users and alerts in memory (for demo purposes)
const users = {};
const alerts = [];

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint for adding alerts (admin functionality)
app.post('/addAlert', (req, res) => {
    const { location, severity, impact } = req.body;
    alerts.push({ location, severity, impact });
    res.json({ message: 'Alert added successfully!' });
});

// Endpoint for listing alerts
app.get('/alerts', (req, res) => {
    res.json(alerts);
});

// Endpoint for registering users
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.json({ success: false, message: 'Username already exists!' });
    }
    users[username] = password;
    res.json({ success: true, message: 'Registration successful!' });
});

// Endpoint for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        return res.json({ success: true, message: 'Login successful!' });
    }
    res.json({ success: false, message: 'Invalid username or password!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
