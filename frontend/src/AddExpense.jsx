import React, { useState } from "react";
import { ethers } from "ethers";
import SplitwiseABI from "./Splitwise.json"; // compiled ABI

export default function AddExpense({ contractAddress, provider, signer }) {
  const [participants, setParticipants] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(""); // For transaction feedback

  const addExpense = async () => {
    // Basic input validation
    if (!participants || !amount || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setStatus("Connecting to contract...");

      // Correct ABI usage
      const contract = new ethers.Contract(contractAddress, SplitwiseABI.abi, signer);

      // Convert comma-separated addresses to array
      const participantArray = participants.split(",").map(addr => addr.trim());

      // Convert amount to token decimals (18)
      const tokenAmount = ethers.parseUnits(amount, 18);

      setStatus("Submitting transaction...");
      const tx = await contract.addExpense(tokenAmount, participantArray, description);

      setStatus("Transaction submitted. Waiting for confirmation...");
      await tx.wait(); // Wait for transaction to be mined

      setStatus("Expense added successfully!");
      // Clear form
      setParticipants("");
      setAmount("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setStatus("Error adding expense. See console.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Add Expense</h3>
      <input
        type="text"
        placeholder="Participants (comma-separated)"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />
      <button onClick={addExpense} style={{ padding: "8px 20px", fontSize: "16px" }}>
        Add Expense
      </button>
      <p style={{ marginTop: "10px", color: "blue" }}>{status}</p>
    </div>
  );
}
