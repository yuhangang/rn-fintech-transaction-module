import { Provider } from "react-redux";
import { DependencyContainer } from "../modules/core/di/dependencyContainer";
import {
  BiometricService,
  IBiometricService,
} from "../modules/core/services/biometricService";
import { TransactionService } from "../modules/transaction-history/services/transctionService";
import { createAuthStore } from "../modules/core/store/auth/authStore";
import { ErrorTrackingService } from "../modules/core/services/errorTrackingService";
import {
  ILoggerService,
  LoggerService,
} from "../modules/core/services/loggerService";
import { useEffect, useState } from "react";
import {
  IToastService,
  ToastService,
} from "../modules/core/services/toastService";

function AppProvider(props: { children?: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      // Set up global dependencies
      const diContainer = DependencyContainer.getInstance();
      const errorTrackingService = ErrorTrackingService;
      const loggerService = new LoggerService(errorTrackingService);

      diContainer.registerSingletons({
        biometricService: BiometricService,
        transactionService: TransactionService,
        loggerService: loggerService,
        errorLoggingService: errorTrackingService,
        toastService: ToastService,
      });

      setIsReady(true);
    };

    initApp();
  }, []);

  if (isReady) {
    const dependencyContainer = DependencyContainer.getInstance();

    return (
      <Provider
        store={createAuthStore({
          biometricService:
            dependencyContainer.resolve<IBiometricService>("biometricService"),
          toastService:
            dependencyContainer.resolve<IToastService>("toastService"),
          loggerService:
            dependencyContainer.resolve<ILoggerService>("loggerService"),
        })}
      >
        {props.children}
      </Provider>
    );
  } else {
    return null;
  }
}

export default AppProvider;
