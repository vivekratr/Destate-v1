/* eslint-disable no-unused-vars */
import React from 'react'
import { useWeb3Modal } from '@web3modal/ethers5/react'
import { useContext } from "react";

const WalletButton = () => {
    // const {storeData,readData} = useContext(ChatContext)
    const { open } = useWeb3Modal()
  return (
    <div className=' '>
<w3m-button class=" bg-blue-500 rounded-3xl"  balance='show' size='sm' label='Connect' loadingLabel='Connecting...' />
{/* <w3m-account-button /> */}
{/* <w3m-connect-button /> */}
{/* <w3m-network-button /> */}
      {/* <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button> */}
      
     
    </div>
  )
}

export default WalletButton
