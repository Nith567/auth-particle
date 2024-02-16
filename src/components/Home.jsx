"use client";
import { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from "react-hot-toast"
import { useAccount } from "wagmi";
import { useEthereum, useConnect, useAuthCore } from '@particle-network/auth-core-modal';
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
import { notification } from 'antd';
import { opBNBTestnet } from '@particle-network/chains';
import { useMemo } from 'react';
export default function Home() {
  const {address, provider } = useEthereum();
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();
  const [balance, setBalance] = useState(null);

  const smartAccount = new SmartAccount(provider, {
    projectId: '4097120b-e9f5-493a-9644-0b6d4f8f553a',
    clientKey:'cheVyDJ9S8XEhqncTjOVu0GwjzZF1anQNTiPwczB',
    appId:'3cb901f9-b766-4e59-9c62-0abf7ee9394d',
    aaOptions: {
      simple: [{ chainId: opBNBTestnet.id, version: '1.0.0' }]
    }
  });

  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, smartAccount, customProvider]);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress();
    const balanceResponse = await customProvider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceResponse));
  };

  const handleLogin = async (authType) => {
    if (!userInfo) {
      await connect({
        socialType: authType,
        chain: opBNBTestnet,
      });
    }
  };
  const executeUserOp = async () => {
    const signer = customProvider.getSigner();
    const tx = {
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseEther("0.0001"),
    };
    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();
    notification.success({
      message: 'Transaction Successful',
      description: (
        <div>
          Transaction Hash: <a href={`https://snowtrace.io/tx/${txReceipt.transactionHash}`} target="_blank" rel="noopener noreferrer">{txReceipt.transactionHash}</a>
        </div>
      )
    });
  };

  const executeBatchUserOp = async () => {
    const tx = { tx: [{
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseEther("0.0001"),
    },
    {
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseEther("0.0001"),
    }]};
    const txResponse = await smartAccount.sendTransaction(tx);
    notification.success({
      message: 'Transaction Successful',
      description: (
        <div>
          Transaction Hash: <a href={`https://snowtrace.io/tx/${txResponse}`} target="_blank" rel="noopener noreferrer">{txResponse}</a>
        </div>
      )
    });
  };
  const onsubmit=async()=>{
    try {
      const response = await axios.post('/api/profile', {
        eoa:address
      });
      console.log(response.data);
      toast.success("Confirmed your profile")
    } catch (e) {
      console.error(e);
      toast.error("something wrong or already created your acc",e )
    }
  };
  return (
<div>
  dice witcher poker game 
  <div className="App">
  <div className="flex justify-between items-center p-4">
    <div className="logo-section flex space-x-4">
      <span className="font-bold text-lg">logo</span>
      <span className="font-bold text-lg">logo2</span>
    </div>
    
    {!userInfo ? (
      <div className="login-section flex space-x-4">
        <button
          className="sign-button google-button px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleLogin('')}
        >
          Sign in with Google
        </button>
        
        <button
          className="sign-button twitter-button px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleLogin('twitter')}
        >
          Sign in with X
        </button>
      </div>
    ) : (
      <div className="profile-card" >
      <span>{userInfo.name}</span> 
        <div className="balance-section flex space-x-4 items-center">
          <small className="text-gray-500">{balance} opbnb</small>
          <small className="text-gray-500">so the adres {address}</small>
          <button
            className="sign-message-button px-4 py-2 bg-blue-500 text-white rounded"
            onClick={executeUserOp}
          >
            Execute User Operation
          </button>
          <button
            className="sign-message-button px-4 py-2 bg-blue-500 text-white rounded"
            onClick={executeBatchUserOp}
          >
            Execute Batch User Operation
          </button>
          <button
            className="sign-message-button px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onsubmit}
          >
           Register
          </button>
          <button
            className="disconnect-button px-4 py-2 bg-red-500 text-white rounded"
            onClick={disconnect}
          >
            Logout
          </button>
        </div>
      </div>
    )}
  </div>
</div>


              </div>
  )
}