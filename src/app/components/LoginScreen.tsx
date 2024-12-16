import { Fingerprint } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function LoginScreen(props: {
  onPress: () => Promise<void>;
}): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Logo or App Title */}
        <View style={styles.logoContainer}>
          <Text style={styles.titleText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>Authenticate to continue</Text>
        </View>

        {/* Biometric Login Button */}
        <TouchableOpacity
          style={[styles.biometricButton, styles.disabledButton]}
          onPress={props.onPress}
        >
          <Fingerprint size={50} color={"#007bff"} />
          <Text style={styles.biometricButtonText}>
            {"Tap to Authenticate"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
  },
  biometricButton: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "80%",
  },
  disabledButton: {
    opacity: 0.5,
  },
  biometricButtonText: {
    marginTop: 15,
    fontSize: 16,
    color: "#007bff",
    fontWeight: "600",
  },
});

export default LoginScreen;
