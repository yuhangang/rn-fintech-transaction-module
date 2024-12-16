import * as LocalAuthentication from "expo-local-authentication";
import { BiometricAuthException } from "../model/expections/authenticationExceptions";

export interface IBiometricService {
  authenticateUser(): Promise<boolean>;
}

export const BiometricService: IBiometricService = {
  authenticateUser: async (): Promise<boolean> => {
    try {
      // Check if biometric authentication is available
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometricAvailable) {
        throw <BiometricAuthException>{
          title: "Biometric Error",
          message: "Biometric authentication is not available on this device",
        };
      }

      const supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (supportedBiometrics.length === 0) {
        throw <BiometricAuthException>{
          title: "Biometric Error",
          message: "Biometric authentication is not supported on this device",
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access the app",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error: any) {
      throw <BiometricAuthException>{
        title: "Biometric Error",
        message: error.message,
      };

      return false;
    }
  },
};
