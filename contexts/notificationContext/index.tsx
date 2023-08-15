import { notification } from 'antd';
import { ArgsProps } from 'antd/es/notification/interface';
import { FC, createContext, useCallback, useMemo } from 'react';

type TNotificationConfig = ArgsProps;

type TNotificationContext = {
  notify: (cofig: TNotificationConfig) => void;
};

export const NotificationContext = createContext<TNotificationContext>(
  {} as TNotificationContext
);

export const NotificationProvider: FC<
  React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
  const [api, notificationHolder] = notification.useNotification();

  const notify = useCallback((config: TNotificationConfig) => {
    api.open({
      placement: 'top',
      type: 'info',
      closeIcon: null,
      ...config,
    });
  }, []);

  const value = useMemo(
    () => ({
      notify,
    }),
    []
  );

  return (
    <NotificationContext.Provider value={value}>
      {notificationHolder}
      {children}
    </NotificationContext.Provider>
  );
};
