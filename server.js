
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// ✅ Correct option key: useNewUrlParser
mongoose.connect(
  'mongodb+srv://jayasankarkiran594_db_user:vcho9Wv9Um2RF5wB@dbms.504ss6h.mongodb.net/test_db?appName=DBMS'
)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ Error connecting to MongoDB:", err));


// Define schema
const FormSchema = new mongoose.Schema({
  patient: String,
  doctor: String,
});

// Define model
const FormData = mongoose.model('FormData', FormSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Insert data
app.post('/insert', async (req, res) => {
  try {
    const { patient, doctor } = req.body;
    const data = new FormData({ patient, doctor });
    await data.save();
    res.redirect('/insert.html');
  } catch (err) {
    res.status(500).send('Error inserting data');
  }
});

// Fetch all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await FormData.find();
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching data');
  }
});

// Delete data by ID
app.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    await FormData.findByIdAndDelete(id);
    res.redirect('/delete.html');
  } catch (err) {
    res.status(500).send('Error deleting data');
  }
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});




