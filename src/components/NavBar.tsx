import dynamic from "next/dynamic";
import Image from "next/image";
const WalletConnect = dynamic(() => import("./WalletConnect"), {
  ssr: false,
});

export default function NavBar() {
  return (
    // <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    <div className="flex flex-wrap w-full max-w-5xl items-center justify-between font-mono text-sm">
      {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"> */}
      <div className="">
        <Image
          src="https://avatars.githubusercontent.com/u/125997902?s=200&v=4"
          alt="AL Logo"
          width={60}
          height={24}
          priority
        />
      </div>
      <WalletConnect />
    </div>
  );
}
