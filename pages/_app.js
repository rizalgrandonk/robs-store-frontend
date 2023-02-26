import Script from "next/script";
import "react-multi-carousel/lib/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { CartProvider } from "../contexts/CartContext";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>

      {/* <Script
        src="https://cdn.jsdelivr.net/npm/eruda"
        onLoad={() => {
          eruda.init();
        }}
      /> */}
    </>
  );
}

export default MyApp;
