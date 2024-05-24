import React, { createContext, useEffect, useState } from "react";
import web3modal from "web3modal";
import { TheCapsuleAddress, TheCapsuleAbi } from "./constants.ts";
import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { ethers } from "ethers";
import { Buffer } from "buffer";
import { getPinataImageURL } from "../config/api.ts";

const projectId = "";
const projectSecretKey = "";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecretKey).toString("base64");
const subdomain = "";

const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
  // url: "https://ipfs.infura.io:5001/api/v0",
});

const fetchContract = (signerOrProvider: any) => {
  return new ethers.Contract(
    TheCapsuleAddress,
    TheCapsuleAbi,
    signerOrProvider
  );
};

const connectingWithSmartContract = async () => {
  try {
    const web3 = new web3modal();
    const connection = await web3.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const TheCapsuleContext = createContext({
  // checkContract: async () => {},
  theCapsule: null,
  titleData: "",
  currentAccount: "",
  checkIfWalletConnected: async () => {},
  connectWallet: async () => {},
  uploadToIPFS: async (file: File) => {
    return "";
  },
  buyCapsule: async (nft: any) => {},
  createSale: async (
    url: string,
    formInputPrice: number,
    isReselling: boolean,
    id: string
  ) => {},
  createCapsule: async (
    formInput: { name: string; description: string; price: number },
    fileUrl: string
  ) => {},
  fetchCapsule: async () => {
    return [] as any[];
  },
  fetchMyCapsulesOrListedCapsules: async (type: any) => {
    return [] as any[];
  },
  mintCapsule: async (url: string, price: number) => {},
});

export const TheCapsuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theCapsule, setTheCapsule] = useState<any>(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const titleData = "The Capsule";

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install MetaMask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }

      console.log(currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Install MetaMask");
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log("Error connecting wallet", error);
    }
  };

  const uploadToIPFS = async (file: File) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log("Error uploading file", error);
      return "";
    }
  };

  const createSale = async (
    url: string,
    formInputPrice: number,
    isReselling?: boolean,
    id?: string
  ) => {
    try {
      const price = ethers.parseUnits(formInputPrice.toString(), "ether");
      const contract = await connectingWithSmartContract();

      if (!contract) {
        return;
      }
      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellCapsule(url, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const mintCapsule = async (url: string, price: number) => {
    try {
      const contract = await connectingWithSmartContract();
      if (!contract) {
        return;
      }
      const listingPrice = await contract.getListingPrice();
      const transaction = await contract.createToken(
        url,
        listingPrice.toString(),
        {
          value: listingPrice.toString(),
        }
      );

      const res = await transaction.wait();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const createCapsule = async (
    formInput: { name: string; description: string; price: number },
    fileUrl: string
  ) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) {
      return;
    }

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCapsule = async () => {
    try {
      // const provider = new ethers.JsonRpcProvider();
      const contract = await connectingWithSmartContract();
      if (!contract) {
        return;
      }

      const data = await contract.fetchCapsuleItem();

      console.log(data[0]);
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
      };

      const res = await axios.get(
        "https://api.pinata.cloud/data/pinList",
        options
      );
      const resData = await res.data.rows;
      console.log(resData);

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              metadata: { name: title },
            } = resData.find((item: any) => item.ipfs_pin_hash === tokenURI);

            const price = ethers.parseUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId,
              seller,
              owner,
              image: getPinataImageURL(tokenURI),
              name: title,
              capsuleName: name,
              // kyc,
              capsuleImage: "QmYZ9WJqwPSi622xgzPxrPVb343q7kdHoiu2ezevfZXqwy",
              // description,
              tokenURI,
              revealed: false,
            };
          }
        )
      );
      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchMyCapsulesOrListedCapsules = async (type: any) => {
    try {
      const contract = await connectingWithSmartContract();

      if (!contract) {
        return [];
      }

      const data =
        type == "fetchItemListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFT();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);

            const price = ethers.parseUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const buyCapsule = async (nft: any) => {
    try {
      const contract = await connectingWithSmartContract();

      if (!contract) {
        return;
      }

      const price = ethers.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createCapsuleSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      return transaction;
    } catch (error) {
      console.log(error);
    }
  };

  // const checkContract = async () => {
  //   const contract = await connectingWithSmartContract();
  //   console.log(contract);
  // };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TheCapsuleContext.Provider
      value={{
        theCapsule,
        titleData,
        currentAccount,
        // checkContract,
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        buyCapsule,
        createSale,
        createCapsule,
        fetchCapsule,
        fetchMyCapsulesOrListedCapsules,
        mintCapsule,
      }}
    >
      {children}
    </TheCapsuleContext.Provider>
  );
};
