import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { encode as base64Encode } from 'base-64';
import { AppContext } from '../../Context';

const SmsSender = () => {
  const [issueText, setIssueText] = useState('');

  const {Gphno,Gname} = AppContext();
  const handleTextChange = (text) => {
    setIssueText(text);
  };

  const sid = 'AC32b8d07e47723d8ec994943c3b651cf9';
  const token = '15a0e0b128a263e3ac1610c4ca5e3bf6';

  const sendIssue = async () => {
    try {
      const credentials = base64Encode(`${sid}:${token}`);
      const response = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
        {
          To: '+919345577617', 
          From: '+18177178384', 
          Body: `User's Details\nName : ${Gname}\nPhone Number : ${Gphno}\nIssues Faced : ${issueText}`,
        },
        {
          headers: {
            Authorization: 'Basic ' + credentials,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Issue sent successfully!');
        setIssueText('');
      } else {
        Alert.alert('Failed to send issue. Please try again.');
      }
    } catch (error) {
      console.error('Error sending issue:', error);
      Alert.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report an Issue</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your issue here"
        value={issueText}
        onChangeText={handleTextChange}
      />
      <Button title="Send Issue" onPress={sendIssue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    textAlign:'center'
  },
});

export default SmsSender;
