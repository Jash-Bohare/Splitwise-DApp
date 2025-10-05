import React, { useState, useEffect } from "react";
import WalletConnect from "./WalletConnect";
import AddExpense from "./AddExpense";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const contractAddress = "0x3CA5F241E3e9D594984D50BB6A110bf2655D8b7B";

  const handleWalletConnect = async (prov, sign) => {
    setProvider(prov);
    setSigner(sign);
    setWalletConnected(true);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Decentralized Expense Splitter</h1>
      {!walletConnected ? (
        <WalletConnect onConnect={handleWalletConnect} />
      ) : (
        <AddExpense contractAddress={contractAddress} provider={provider} signer={signer} />
      )}
    </div>
  );
}

export default App;
