import MyAlgo from "@randlabs/myalgo-connect";

// Note: the wallet connect and my algo wallets share the same "interface"
export function createMyAlgoWallet() {
  const wallet = new MyAlgo();

  // returns address, if needed for immediate use
  async function connect() {
    try {
      const accounts = await wallet.connect();
      const addresses = accounts.map((account) => account.address);

      var selectedAddress = null;

      if (addresses.length === 0) {
        throw new Error("Please select an address.");
      } else if (addresses.length > 1) {
        throw new Error("Please select only one address.");
      } else {
        const address = addresses[0];
        selectedAddress = address;
        console.log("MyAlgo connected, address: " + selectedAddress);
      }

      return selectedAddress;
    } catch (e) {
      console.error(e);
    }
  }

  function disconnect() {}

  function onPageLoad() {}

  async function signTxs(toSign) {
    let signedTxs = await wallet.signTransaction(toSign.my_algo);
    return signedTxs.map((t) => toSignedTxForRust(t));
  }

  return {
    connect,
    disconnect,
    onPageLoad,
    signTxs,
  };
}

// this maps the msg pack blob to array to array rust understands (rust will deserialize it to SDK signed txs and submit)
const toSignedTxForRust = (myAlgoSignedTx) => {
  return {
    // Uint8Array -> array (can be parsed to Vec<u8> in Rust)
    blob: Array.from(myAlgoSignedTx.blob),
  };
};
