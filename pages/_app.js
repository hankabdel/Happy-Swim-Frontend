import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import Header from "../components/Header";

const store = configureStore({
  reducer: { user },
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
