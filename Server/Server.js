// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Router/router');

const app = express();
const PORT = process.env.PORT || 3000;

const uri =
  "mongodb+srv://rc-balaji:Balaji2003@cluster0.ousbmhk.mongodb.net/ProGG?retryWrites=true&w=majority";


app.use(cors());
app.use(express.json());
app.use(userRouter);

mongoose.connect(uri)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
