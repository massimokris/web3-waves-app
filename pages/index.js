import { useEffect, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import Box from "@components/Box";
import abi from "../utils/WavePortal.json";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  /*
   * All state property to store all waves
   */
  const [allWaves, setAllWaves] = useState([]);

  const [waveMessage, setWaveMessage] = useState("");
  /**
   * Create a variable here that holds the contract address after you deploy!
   */
  const contractAddress = "0xfae03382Ea5D4190Db22EaB852968d4f5DE8a074";
  /**
   * Create a variable here that references the abi content!
   */
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
      getAllWaves();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Create a method that gets all waves from your contract
   */
  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        /*
         * Call the getAllWaves method from your Smart Contract
         */
        const waves = await wavePortalContract.getAllWaves();

        /*
         * We only need address, timestamp, and message in our UI so let's
         * pick those out
         */
        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        wavesCleaned = wavesCleaned.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        /*
         * Store our data in React State
         */
        setAllWaves(wavesCleaned);
        wavePortalContract.on("NewWave", (from, timestamp, message) => {
          console.log("NewWave", from, timestamp, message);

          setAllWaves((prevState) => [
            ...prevState,
            {
              address: from,
              timestamp: new Date(timestamp * 1000),
              message: message,
            },
          ]);
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        /*
         * Execute the actual wave from your smart contract
         */
        const waveTxn = await wavePortalContract.wave(waveMessage, {
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);
        console.log(
          `Check the transaction here https://rinkeby.etherscan.io/tx/${waveTxn.hash}`
        );
        let btnContainer = document.getElementById("btn-container");
        btnContainer.innerHTML += `
        <a
        id="transaction-link"
        className="text-blue-600 underline mt-2 ml-4"
        href="https://rinkeby.etherscan.io/tx/${waveTxn.hash}"
        target="_blank"
        >
        Check transaction 🔗
        </a>
      `;

        await waveTxn.wait();
        let linkTransaction = document.getElementById("transaction-link");
        linkTransaction.remove();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getWaveMessage = async (e) => {
    setWaveMessage(e.target.value);
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen py-4">
      <Head>
        <title>Massi.eth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-4xl font-bold mb-0 sm:mt-8 text-white">
          Welcome to <code className="text-blue-600">Massi.eth</code>
        </h1>

        <input
          className="mt-6 py-4 px-4 bg-transparent border-2 border-blue-500 rounded text-lg text-white"
          type="text"
          placeholder="write sth fun..."
          onChange={getWaveMessage}
        />

        <div id="btn-container" className="mt-6 flex">
          <button
            className="bg-blue-500 border-2 border-blue-500 hover:bg-transparent text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={wave}
          >
            Message me
          </button>
          {currentAccount ? (
            ""
          ) : (
            <button
              className="ml-4 bg-blue-500 border-2 border-blue-500 hover:bg-transparent text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-4xl my-4">
          {allWaves.map((wave, index) => {
            return (
              <Box
                key={index}
                address={wave.address}
                time={wave.timestamp.toLocaleDateString("en-EN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
                message={wave.message}
              />
            );
          })}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24">
        <a
          className="flex items-center justify-center text-white"
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
