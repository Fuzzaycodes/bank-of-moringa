import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: ''});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
      }

      //form submissionns
  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
   },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newTransaction) => {
        onAddTransaction(newTransaction);
        setFormData({
          date: '',
          description: '',
          category: '',
          amount: ''
        });
      })
      .catch((error) => console.error("Error:", error));
      }

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
