// Importing express
const express = require('express');

// Invoke express
const app = express();

// Importing dotenv
require('dotenv').config();

app.get('/', (req, res) => {
	res.send("Testing server");
});

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});