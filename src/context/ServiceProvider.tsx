// src/contexts/ServiceContext.tsx
import React, { createContext, useContext } from "react";
import {
  BiometricService,
  IBiometricService,
} from "../modules/core/services/biometricService";

interface ServiceContextType {
  biometricService: IBiometricService;
  // Add other services here if needed
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

// Custom hook for accessing services
export const useServices = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};

// Provider component
interface ServiceProviderProps {
  children: React.ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const services: ServiceContextType = {
    biometricService: BiometricService,
  };

  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
};
