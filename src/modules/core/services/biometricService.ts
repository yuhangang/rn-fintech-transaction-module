import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

// src/modules/core/services/IBiometricService.ts
export interface IBiometricService {
  authenticateUser(): Promise<boolean>;
}

export const BiometricService: IBiometricService = {
  authenticateUser: async (): Promise<boolean> => {
    try {
      // Check if biometric authentication is available
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometricAvailable) {
        Alert.alert("Biometric Authentication not available");
        return false;
      }

      // Check the types of biometrics supported (e.g., FaceID, Fingerprint)
      const supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (supportedBiometrics.length === 0) {
        Alert.alert("No supported biometric types available");
        return false;
      }

      // Log the supported biometrics
      console.log("Supported biometrics:", supportedBiometrics);

      // Authenticate the user
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access the app",
        fallbackLabel: "Use Passcode",
        disableDeviceFallback: false,
      });

      if (result.success) {
        console.log("Biometric authentication successful");
        return true;
      } else {
        console.log("Biometric authentication failed");
        return false;
      }
    } catch (error: any) {
      console.error("Error during biometric authentication", error);
      Alert.alert("Authentication Error", error.message);
      return false;
    }
  },
};
