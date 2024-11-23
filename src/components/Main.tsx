"use client";
import dynamic from "next/dynamic";
// const Stake = dynamic(() => import("./Delegate"), { ssr: false });
const P2POnRamp = dynamic(() => import("./P2POnRamp"), { ssr: false });

export default function Main() {
  return (
    <div className="flex">
      <P2POnRamp />
    </div>
  );
}
