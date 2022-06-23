import "./App.css";
import { SelectWalletModal } from "./wallet/SelectWalletModal";
import { useEffect, useState } from "react";
import { initWcWalletIfAvailable } from "./wallet/walletConnectWallet";
import OpenWalletModal from "./wallet/OpenWalletModal";

function App() {
  // this is only used when the selected wallet is wallet connect
  const [wcShowOpenWalletModal, setWcShowOpenWalletModal] = useState(false);

  const [showSelectWalletModal, setShowSelectWalletModal] = useState(false);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    initWcWalletIfAvailable(setWallet, setWcShowOpenWalletModal);
  }, []);

  return (
    <div className="App">
      <button onClick={() => setShowSelectWalletModal(true)}>
        Select Wallet
      </button>
      <button onClick={() => wallet.disconnect()}>Disconnect</button>

      {wcShowOpenWalletModal && (
        <OpenWalletModal setShowModal={setWcShowOpenWalletModal} />
      )}
      {showSelectWalletModal && (
        <SelectWalletModal
          setWallet={setWallet}
          setWcShowOpenWalletModal={setWcShowOpenWalletModal}
          setShowModal={setShowSelectWalletModal}
        />
      )}
    </div>
  );
}

export default App;
