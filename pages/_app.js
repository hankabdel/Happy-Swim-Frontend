import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import user from "../reducers/user";
import annonce from "../reducers/annonce";
import mesFavoris from "../reducers/mesFavoris";
import Header from "../components/Shared/Header";
import mesRecherche from "../reducers/mesRecherche";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducers = combineReducers({ annonce, user, mesFavoris, mesRecherche });
const persistConfig = { key: "root", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Happy Swim</title>
        </Head>
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
