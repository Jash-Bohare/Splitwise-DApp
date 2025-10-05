// WalletConnect.jsx
import React, { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect({ onConnect }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(account);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const rawBalance = await provider.getBalance(account);
      const formattedBalance = ethers.formatEther(rawBalance);
      setBalance(formattedBalance);

      // ✅ THIS IS CRUCIAL
      if (onConnect) {
        onConnect(provider, signer);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!walletAddress ? (
        <button onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p><strong>Wallet Address:</strong> {walletAddress}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      )}
    </div>
  );
}
