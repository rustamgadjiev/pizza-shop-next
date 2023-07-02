import "../styles/app.scss";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { Header } from "../components/Header";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Pizza Shop</title>
      </Head>
      <div className="App">
        <Header />
        <div className="content">
          <div className="container">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
