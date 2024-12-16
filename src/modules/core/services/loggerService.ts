import { IErrorTrackingService } from "./errorTrackingService";

export interface ILoggerService {
  errorTrackingService: IErrorTrackingService;

  logInfo(message: string, data?: any): void;
  logError(message: string, error?: any): void;
  logWarning(message: string, data?: any): void;
}

export class LoggerService implements ILoggerService {
  constructor(public errorTrackingService: IErrorTrackingService) {
    this.errorTrackingService = errorTrackingService;
  }

  logInfo(message: string, data?: any): void {
    console.log(`[INFO] ${message}`, data);
  }

  logError(message: string, error?: any): void {
    console.error(`[ERROR] ${message}`, error);
    this.errorTrackingService.captureException(error);
  }

  logWarning(message: string, data?: any): void {
    console.warn(`[WARNING] ${message}`, data);
  }
}
