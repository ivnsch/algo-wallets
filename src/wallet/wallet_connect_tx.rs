// TODO port or abstract

// this maps SDK transactions to the format that WalletConnect expects

use algonaut::transaction::Transaction;
use anyhow::Result;
use data_encoding::BASE64;
use serde::Serialize;

// Passed directly to WalletConnect in JS
#[derive(Debug, Clone, Serialize)]
pub struct WalletConnectTx {
    txn: String,
    message: String,
}

impl WalletConnectTx {
    pub fn new(tx: &Transaction, message: &str) -> Result<WalletConnectTx> {
        Ok(Self::new_with_msg_pack(
            &rmp_serde::to_vec_named(tx)?,
            message,
        ))
    }

    pub fn new_with_msg_pack(tx_msg_pack: &[u8], message: &str) -> WalletConnectTx {
        WalletConnectTx {
            txn: BASE64.encode(tx_msg_pack),
            message: message.to_owned(),
        }
    }
}
