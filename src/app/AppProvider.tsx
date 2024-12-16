import { Provider } from "react-redux";
import { DependencyContainer } from "../modules/core/di/dependencyContainer";
import {
  BiometricService,
  IBiometricService,
} from "../modules/core/services/biometricService";
import { TransactionService } from "../modules/transaction-history/services/transctionService";
import store from "../modules/core/store/store";
import { ErrorTrackingService } from "../modules/core/services/errorTrackingService";
import { LoggerService } from "../modules/core/services/loggerService";
import { useEffect, useState } from "react";

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
      });

      setIsReady(true);
    };

    initApp();
  }, []);

  if (isReady) {
    const dependencyContainer = DependencyContainer.getInstance();

    return (
      <Provider
        store={store({
          biometricService:
            dependencyContainer.resolve<IBiometricService>("biometricService"),
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
