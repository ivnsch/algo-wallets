import Modal from "../Modal";
import { SelectWallet } from "./SelectWallet";

export const SelectWalletModal = ({
  setWallet,
  setWcShowOpenWalletModal,
  setShowModal,
}) => {
  return (
    <Modal title={"Choose a wallet"} onCloseClick={() => setShowModal(false)}>
      <SelectWallet
        setWallet={setWallet}
        setWcShowOpenWalletModal={setWcShowOpenWalletModal}
        onConnected={async () => setShowModal(false)}
      />
    </Modal>
  );
};
