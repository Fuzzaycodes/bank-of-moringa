import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchWord, setSearchWord] = useState("")

//to fetch the transactions
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error:", error));
  }, []);


  //add transaction
  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };


  //search input
 const handleSearch = (word) => {
  setSearchWord(word);
 };

 //filter transaction
 const filteredTransactions = transactions.filter((transaction) =>
  transaction.description.toLowerCase().includes(searchWord.toLowerCase())
);
  return (
    <div>
      <Search onSearch={handleSearch}/>
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
