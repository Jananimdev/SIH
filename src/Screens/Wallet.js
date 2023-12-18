import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import App from "../../App";
import { AppContext } from "../../Context";

const Wallet = () => {

  const con = AppContext()
  const [credits, setCredits] = useState([
    { id: 1, amount: 10 },
    { id: 2, amount: 20 },
    { id: 3, amount: 50 },
    { id: 4, amount: 100 },
  ]);

  const walletBalance = con.cash;
  const transactionHistory = [
    {
      id: 1,
      date: "2023-12-01",
      amount: -100,
      
    },
    {
      id: 2,
      date: "2023-12-05",
      amount: 200,
      
    },
    { id: 3, date: "2023-12-10", amount: -50,  },
  ];

  const renderTransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text>Date: {item.date}</Text>
      <Text>Amount: {item.amount}</Text>
      
    </View>
  );

  const handleCreditPurchase = (amount) => {
    console.log(`Purchased ${amount} credits`);
   
  };

  const renderCreditItem = ({ item }) => (
    <TouchableOpacity
      style={styles.creditItem}
      onPress={() => {
        
        con.setCash(item.amount+con.cash)
        Alert.alert(`Amount RS.${item.amount} Added`)
      }}
    >
      <Text style={styles.creditAmount}>Buy {item.amount} Credits</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Wallet Balance</Text>
        <Text style={styles.amount}>Rs.{walletBalance}</Text>
        {walletBalance<20?(
        <Button
        color="red"
          title="Recharge 200 instant"
          onPress={()=>{
              con.setCash(con.cash+200)
              Alert.alert("Recharged")
          }}
          // style={}
        />):""}
      </View>

      <View style={styles.creditsContainer}>
        <Text style={styles.creditsTitle}>Select Credits</Text>
        <FlatList
          data={credits}
          renderItem={renderCreditItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>
        <FlatList
          data={transactionHistory}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  amount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  creditsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  creditItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  creditAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  historyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Wallet;
