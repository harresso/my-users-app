import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { wrapper } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...props.pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
