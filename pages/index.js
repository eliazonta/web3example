import { useWeb3React } from "@web3-react/core"
import { injected } from "./components/wallet/connector"
import { useEffect } from "react";


export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem('isWalletConnected', true);
    }catch(ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem('isWalletConnected', false);

    }catch(ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectwalletOnPageLoad = async () => {
      if(localStorage?.getItem('isWalletConnected') === 'true'){
        try {
          await activate(injected);
        } catch (ex) {
          console.log(ex);
        }
      }
    }
    connectwalletOnPageLoad();
  }, []);

  return (
    <div className="page">
      <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected.</span>}
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
    </div>
  )
}
