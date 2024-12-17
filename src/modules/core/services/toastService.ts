import Toast from "react-native-toast-message";

export interface IToastService {
  showErrorMsg({ title, message }: { title: string; message: string }): void;
}

export const ToastService: IToastService = {
  showErrorMsg({ title, message }) {
    Toast.show({
      type: "error",
      text1: title,
      text2: message,
      visibilityTime: 3000,
      position: "bottom",
    });
  },
};
