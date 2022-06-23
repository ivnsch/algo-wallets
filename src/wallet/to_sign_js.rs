// TODO port or abstract

// This serializes SDK transactions to an object containing *both* My Algo and WalletConnect formats
// the wallets in js use their respective field
// this is a bit inefficient, but keeps the implementation simpler as WASM doesn't need to know what wallet is connected
// with JS-only app it's probably easier to return only the serialization needed

use super::common::to_my_algo_tx1;
use crate::service::wallet_connect_tx::WalletConnectTx;
use algonaut::transaction::Transaction;
use anyhow::{Error, Result};
use serde::Serialize;
use serde_json::Value;

#[derive(Debug, Clone, Serialize)]
pub struct ToSignJs {
    pub my_algo: Vec<Value>,
    pub wc: Vec<WalletConnectTx>,
}

impl ToSignJs {
    pub fn new(txs: Vec<Transaction>) -> Result<ToSignJs> {
        let mut my_algo_txs = vec![];
        let mut wc_txs = vec![];

        for tx in txs {
            my_algo_txs.push(to_my_algo_tx1(&tx).map_err(Error::msg)?);
            wc_txs.push(WalletConnectTx::new(&tx, "")?);
        }

        Ok(ToSignJs {
            my_algo: my_algo_txs,
            wc: wc_txs,
        })
    }
}
