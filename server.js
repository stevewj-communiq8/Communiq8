const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = path.join(__dirname, 'data', 'submissions.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.post('/api/enquiry', (req, res) => {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const newEnquiry = {
        id: Date.now(),
        name,
        email,
        company,
        message,
        timestamp: new Date().toISOString()
    };

    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        data.push(newEnquiry);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        
        console.log(`New enquiry received from ${name} (${email})`);
        res.status(201).json({ message: 'Thank you for your enquiry! We will be in touch soon.' });
    } catch (error) {
        console.error('Error saving enquiry:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
