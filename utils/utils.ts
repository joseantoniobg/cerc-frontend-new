import { notification } from 'antd';

const openNotificationWithIcon = (type: string, message: string, description: string) => {
  notification[type]({
    message,
    description
  });
};

export const msgSuccess = (message: string, description: string) => {
  openNotificationWithIcon('success', message, description);
}

export const msgInfo = (message: string, description: string) => {
  openNotificationWithIcon('info', message, description);
}

export const msgWarning = (message: string, description: string) => {
  openNotificationWithIcon('warning', message, description);
}

export const msgError = (message: string, description: string) => {
  openNotificationWithIcon('error', message, description);
}