import '../styles/globals.css';
import Navbar from '../components/navbar';
import { ApolloProvider } from "@apollo/client";
import client from "../util/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Navbar/>
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
