import { persistor, store } from '@/store/store';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { AppPropsWithLayout } from '@/utils/interfaces';
import '@/styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '@/layout/mainLayout';
import { NotificationProvider } from '@/contexts/notificationContext';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider direction='rtl'>
          <NotificationProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotificationProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}
