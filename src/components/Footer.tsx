import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10">
      <div>
        <p className="font-bold">
          MoneyKit <br />
          The future of bank connections.
        </p>
        <p>Copyright © MoneyKit Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
