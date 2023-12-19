// router.js
const express = require('express');
const User = require('../Model/Model');

const router = express.Router();
const mqtt = require('mqtt');

const mqttBrokerUrl = 'mqtt://broker.hivemq.com';
const mqttTopic = 'kt-datavim/7.9';
const mqttQoS = 2;
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});
router.post('/receiveData', (req, res) => {
  const dataFromReact = req.body;

  // Publish the received data to MQTT
  const message = JSON.stringify(dataFromReact);
  mqttClient.publish(mqttTopic, message, { qos: mqttQoS }, (err) => {
    if (!err) {
      console.log(`Published message to ${mqttTopic}: ${message}`);
      res.status(200).send('Data received and published to MQTT');
    } else {
      console.error('Error publishing message to MQTT:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.log("Called");
    // res.sent("Hehhh")
    const { name, email, password, phno, aadharNumber,isAdmin } = req.body;
    const newUser = new User({ name, email, password, phno, aadharNumber,isAdmin });
    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/signin', (req, res) => {
    // Replace this with your logic to handle the GET request
    console.log("Called");
    const responseData = { message: 'GET request handled on the server!' };
    res.json(responseData);
  });
module.exports = router;
