"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";
import { useState, useEffect } from "react";

interface FundStatus {
  id: string; // Unique ID for the fund
  assetType: string;
  amount: number;
  status: string;
}

const mockFunds: FundStatus[] = [
  {
    id: "fund1",
    assetType: "ADA",
    amount: 5000000,
    status: "Locked",
  },
  {
    id: "fund2",
    assetType: "ADA",
    amount: 10000000,
    status: "Pending",
  },
  {
    id: "fund3",
    assetType: "customToken",
    amount: 2500,
    status: "Released",
  },
  {
    id: "fund4",
    assetType: "customToken",
    amount: 10000,
    status: "Locked",
  },
];

const P2POnRamp = () => {
  const network =
    process.env.NODE_ENV === "development"
      ? NetworkType.TESTNET
      : NetworkType.MAINNET;

  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: network,
  });

  const [fundsStatus, setFundsStatus] = useState<FundStatus[]>(mockFunds); // Initialize with mock data
  const [selectedFund, setSelectedFund] = useState<FundStatus | null>(null); // Track selected fund for unlocking
  const [isLoading, setIsLoading] = useState(false);

  const fetchFundsStatus = async () => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFundsStatus(mockFunds); // Use mock data here
    } catch (error) {
      console.error("Error fetching funds status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const depositFunds = async (assetType: string, depositAmount: number) => {
    if (!isConnected || !enabledWallet) {
      console.error("Wallet not connected");
      return;
    }
    try {
      setIsLoading(true);
      const lucid = await Lucid(new Emulator([]), "Preprod");
      const api = await window.cardano[enabledWallet].enable();
      lucid.selectWallet.fromAPI(api);

      const contractAddress = "addr_test1xyz..."; // Replace with your smart contract address

      const tx = await lucid
        .newTx()
        .pay.ToAddress(contractAddress, {
          lovelace: BigInt(depositAmount),
          [assetType]: BigInt(depositAmount),
        })
        .complete();

      const signedTx = await tx.sign.withWallet().complete();
      const txHash = await signedTx.submit();
      console.log(`Funds deposited. Transaction Hash: ${txHash}`);
      fetchFundsStatus(); // Refresh status after deposit
    } catch (error) {
      console.error("Error depositing funds:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const releaseFunds = async (proof: string, fund: FundStatus) => {
    if (!isConnected || !enabledWallet) {
      console.error("Wallet not connected");
      return;
    }
    try {
      setIsLoading(true);
      const lucid = await Lucid(new Emulator([]), "Preprod");
      const api = await window.cardano[enabledWallet].enable();
      lucid.selectWallet.fromAPI(api);

      // Simulate releasing funds
      console.log(`Releasing funds for ${fund.id} with proof: ${proof}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(`Funds released for ${fund.id}`);
      fetchFundsStatus(); // Refresh status after release
      setSelectedFund(null); // Close buyer panel after successful release
    } catch (error) {
      console.error("Error releasing funds:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFundsStatus();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full p-6">
      {/* Seller Panel on the left */}
      <div className="flex-1 order-1">
        <SellerPanel onDeposit={depositFunds} isLoading={isLoading} />
      </div>

      {/* Status Panel in the middle */}
      <div className="flex-1 order-2">
        <StatusPanel
          fundsStatus={fundsStatus}
          onUnlock={(fund) => setSelectedFund(fund)}
          isLoading={isLoading}
        />
      </div>

      {/* Buyer Panel on the right */}
      <div className="flex-1 order-3">
        {selectedFund ? (
          <BuyerPanel
            fund={selectedFund}
            onRelease={releaseFunds}
            onCancel={() => setSelectedFund(null)}
            isLoading={isLoading}
          />
        ) : (
          <div className="text-center text-gray-500 italic">
            Select a fund to unlock from the Status Panel.
          </div>
        )}
      </div>
    </div>
  );
};

const SellerPanel: React.FC<{
  onDeposit: (assetType: string, depositAmount: number) => void;
  isLoading: boolean;
}> = ({ onDeposit, isLoading }) => {
  const [assetType, setAssetType] = useState("lovelace");
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (!amount || !assetType) {
      console.error("Invalid input");
      return;
    }
    onDeposit(assetType, Number(amount));
  };

  return (
    <div className="p-4 border rounded shadow-md ">
      <h2 className="text-lg font-bold mb-4">Seller Panel</h2>
      <select
        className="p-2 border rounded w-full mb-4"
        value={assetType}
        onChange={(e) => setAssetType(e.target.value)}
      >
        <option value="lovelace">ADA</option>
        <option value="customToken">Custom Token</option>
      </select>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="p-2 border rounded w-full mb-4"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded w-full"
        onClick={handleDeposit}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Deposit Funds"}
      </button>
    </div>
  );
};

const BuyerPanel: React.FC<{
  fund: FundStatus;
  onRelease: (proof: string, fund: FundStatus) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ fund, onRelease, onCancel, isLoading }) => {
  const [proof, setProof] = useState("");

  const handleRelease = () => {
    if (!proof) {
      console.error("Proof is required");
      return;
    }
    onRelease(proof, fund);
  };

  return (
    <div className="p-4 border rounded shadow-md ">
      <h2 className="text-lg font-bold mb-4">
        Unlock Funds for {fund.assetType}
      </h2>
      <input
        type="text"
        value={proof}
        onChange={(e) => setProof(e.target.value)}
        placeholder="Enter cryptographic proof"
        className="p-2 border rounded w-full mb-4"
      />
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleRelease}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Unlock Funds"}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const StatusPanel: React.FC<{
  fundsStatus: FundStatus[];
  onUnlock: (fund: FundStatus) => void;
  isLoading: boolean;
}> = ({ fundsStatus, onUnlock, isLoading }) => {
  return (
    <div className="p-4 border rounded shadow-md ">
      <h2 className="text-lg font-bold mb-4">
        Smart Contract Status
        {/* <span className="text-center text-gray-500 italic">
          (Select a fund to unlock from the Status Panel.)
        </span> */}
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {fundsStatus.map((fund) => (
            <li
              key={fund.id}
              className={`p-2 border rounded ${
                fund.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : fund.status === "Locked"
                  ? "bg-orange-200 text-orange-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <div>
                <strong>Asset:</strong> {fund.assetType}
              </div>
              <div>
                <strong>Amount:</strong> {fund.amount}
              </div>
              <div>
                <strong>Status:</strong> {fund.status}
              </div>
              {fund.status === "Locked" && (
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => onUnlock(fund)}
                >
                  Unlock
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default P2POnRamp;
