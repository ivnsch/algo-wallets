import { createMyAlgoWallet } from "./myAlgoWallet";
import { createWcWallet } from "./walletConnectWallet";

export const SelectWallet = ({
  setWallet,
  setWcShowOpenWalletModal,
  onConnected,
}) => {
  return (
    <div>
      <div>
        <button
          onClick={async () =>
            selectWallet(
              setWallet,
              createWcWallet(setWcShowOpenWalletModal),
              onConnected
            )
          }
        >
          WalletConnect
        </button>
        <button
          onClick={async () =>
            selectWallet(setWallet, createMyAlgoWallet(), onConnected)
          }
        >
          My Algo
        </button>
      </div>
    </div>
  );
};

const selectWallet = async (setWallet, wallet, onConnected) => {
  await wallet.connect();
  setWallet(wallet);

  onConnected();
};
