const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require("./database");
const DataModel=require("./Model")

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/alldata', async (req, res) => {
    try {
        const dataArray = req.body;
        const result = await DataModel.insertMany(dataArray);
        res.status(201).json({ message: 'Data saved successfully', data: result });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'An error occurred while saving data', specificError: error.message });
    }
});

 // Retrieve all documents from the database

app.get('/alldata', async (req, res) => {
    try {
        const allData = await DataModel.find().maxTimeMS(30000);;
        res.status(200).json({ data: allData });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'An error occurred while retrieving data', specificError: error.message });
    }
});


app.listen(port, () => {
    dbConnect();
    console.log(`Server is running on http://localhost:${port}`);
});
