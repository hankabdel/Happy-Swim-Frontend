import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import annonce from "../reducers/annonce";
import mesFavoris from "../reducers/mesFavoris";
import Header from "../components/Shared/Header";
import mesRecherche from "../reducers/mesRecherche";

const store = configureStore({
  reducer: { annonce, user, mesFavoris, mesRecherche },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Happy Swim</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
