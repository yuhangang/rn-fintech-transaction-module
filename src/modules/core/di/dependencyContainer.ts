import { ITransactionService } from "../../transaction-history/services/transctionService";
import { type IBiometricService } from "../services/biometricService";
import { IErrorTrackingService } from "../services/errorTrackingService";
import { ILoggerService } from "../services/loggerService";
import { IToastService } from "../services/toastService";

export class DependencyContainer {
  private static instance: DependencyContainer;
  private dependencies = new Map<string, any>();

  private constructor() {}

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  register<T>(token: string, dependency: T) {
    this.dependencies.set(token, dependency);
  }

  resolve<T>(token: string): T {
    const dependency = this.dependencies.get(token);
    if (!dependency) {
      throw new Error(`Dependency not found for token: ${token}`);
    }
    return dependency;
  }

  registerSingletons(props: {
    biometricService: IBiometricService;
    transactionService: ITransactionService;
    loggerService: ILoggerService;
    errorLoggingService: IErrorTrackingService;
    toastService: IToastService;
  }) {
    this.register("biometricService", props.biometricService);
    this.register("transactionService", props.transactionService);
    this.register("loggerService", props.loggerService);
    this.register("errorLoggingService", props.errorLoggingService);
    this.register("toastService", props.toastService);
  }
}
