import { IErrorTrackingService } from "./errorTrackingService";

export interface ILoggerService {
  errorTrackingService: IErrorTrackingService;

  logInfo(params: { funName: string; message: string; data?: any }): void;
  logError(params: {
    funName: string;
    message: string;
    error?: any;
    fatal?: boolean;
  }): void;
  logWarning(params: { funName: string; message: string; data?: any }): void;
}

export class LoggerService implements ILoggerService {
  constructor(public errorTrackingService: IErrorTrackingService) {
    this.errorTrackingService = errorTrackingService;
  }

  private isDevMode(): boolean {
    return (
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    );
  }

  logInfo({
    funName,
    message,
    data,
  }: {
    funName: string;
    message: string;
    data?: any;
  }): void {
    if (this.isDevMode()) {
      console.log(`[INFO] [${funName}] ${message}`, data);
    }
  }

  logError({
    funName,
    message,
    error,
    fatal = false,
  }: {
    funName: string;
    message: string;
    error?: any;
    fatal?: boolean;
  }): void {
    if (this.isDevMode()) {
      if (fatal) {
        console.error(`[FATAL] [${funName}] ${message}`, error);
      } else {
        console.error(`[ERROR] [${funName}] ${message}`, error);
      }
    }

    this.errorTrackingService.captureException({ error, fatal });
  }

  logWarning({
    funName,
    message,
    data,
  }: {
    funName: string;
    message: string;
    data?: any;
  }): void {
    if (this.isDevMode()) {
      console.warn(`[WARNING] [${funName}] ${message}`, data);
    }
  }
}
