import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const getEthereumContract = async () => {
    console.log(contractABI, contractAddress);
    // const { ethereum } = window;

    // if (!ethereum || !ethereum.isConnected()) {
    //   console.error("Metamask not connected or not available.");
    //   return null;
    // }

    // console.log("ethereum", ethereum);
    if (!isConnected) throw Error("User disconnected");
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();

    console.log("provider", ethersProvider);
    console.log("signer", signer);

    try {
      const USDTContract = new ethers.Contract(contractAddress, contractABI, signer);

      console.log("Contract", USDTContract);
      return USDTContract;
    } catch (error) {
      console.error("Error creating contract instance:", error);
      return null;
    }
  };

  const [currentAccount, setCurrentAccount] = useState("");
  const [messages, setMessages] = useState("0");
  const [isLoggedIn, setIsLoggedIn] = useState("0");
  const [allProp, setAllProp] = useState({});
  const { ethereum } = window;
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount("");
        console.log("No account found");
      }
      console.log("Connected account: ", currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const ConnectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      // .then(
      //   console.log(
      //     "Connected account: connected in connectWallet ",
      //     currentAccount
      //   )
      // );

      // const contracts = getEthereumContract();
      // console.log("Current account under connect wallet",currentAccount);
      // const userData = await contracts.user_data(currentAccount);
      // console.log("userData",userData);
    } catch (error) {
      console.log(error);
    }
  };

  const BuyProperty = async (id, _newDoc, _time, _date) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contracts = await getEthereumContract();

      const costInWei = ethers.utils.toWei(_newDoc.cost, "ether");
      console.log("inside store,", contracts);
      const tx = await contracts.buyProperty(id, _newDoc, _time, _date, {
        value: costInWei,
      });
      await tx.wait();

      console.log("tx", tx);
    } catch (error) {
      console.log(error);
    }
  };

  const GetPropertyById = async (id) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contracts = await getEthereumContract();

      console.log("inside store,", contracts);
      const tx = await contracts.getPropertyById(id);

      console.log("tx", tx[0]);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const CreateUser = async (_name, _phoneNo, _email) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contracts = await getEthereumContract();
      console.log("inside store,", contracts);
      const tx = await contracts.createUser(_name, _phoneNo, _email);
      await tx.wait();

      console.log("tx", tx);
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contracts = await getEthereumContract();
      console.log("inside store,", contracts);
      const tx = await contracts.getAllProperties();

      console.log("tx", tx[0]);
      setAllProp(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const CreateProperty = async (
    _heading,
    _address,
    _cost,
    _area,
    _images,
    _city,
    _document,
    _bhk,
    _desc
  ) => {
    try {
      const contracts = await getEthereumContract();
      console.log("_heading:", _heading);
        console.log("_address:", _address);
        console.log("_cost:", _cost);
        console.log("_area:", _area);
        console.log("_images:", _images);
        console.log("_city:", _city);
        console.log("_document:", _document);
        console.log("_bhk:", _bhk);
        console.log("_desc:", _desc);
      // console.log("inside store,", contracts, ethers.BigNumber.from(_images).toString());
      // let temp =  ethers.BigNumber.from(_images).toString()
      const tx = await contracts.createProperty(
        _heading,
        _address,
        _cost,
        _area,
        'temp',
        _city,
        _document,
        _bhk,
        _desc
      );
      await tx.wait();
      console.log("tx", tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        if (!isConnected) throw Error("User disconnected");

        // Call your function to fetch property data using the address

        // Update the propertyData state with the fetched data
        setCurrentAccount(address);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the fetchPropertyData function when the address changes
    if (address) {
      fetchPropertyData();
    }
  }, [address, isConnected]);

  return (
    <ChatContext.Provider
      value={{
        GetPropertyById,
        address,
        currentAccount,
        CreateUser,
        CreateProperty,
        GetAllTransaction,
        allProp,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
