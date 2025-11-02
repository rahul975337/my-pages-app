import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </CartProvider>
  );
}
