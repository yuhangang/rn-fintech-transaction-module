import { IErrorTrackingService } from "./errorTrackingService";

export interface ILoggerService {
  errorTrackingService: IErrorTrackingService;

  logInfo(message: string, data?: any): void;
  logError(message: string, error?: any): void;
  logWarning(message: string, data?: any): void;
}
