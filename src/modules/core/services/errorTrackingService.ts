export interface IErrorTrackingService {
  logError(message: string, error?: any): void;
  captureException(error: any): void;
  captureMessage(message: string): void;
}

// TODO: Implement error tracking service to capture and log errors to Sentry or Crashlytics
export const ErrorTrackingService: IErrorTrackingService = {
  logError: (message: string, error?: any) => {
    throw new Error("Method not implemented.");
  },
  captureException: (error: any) => {
    console.error("Capturing exception...", error);
  },
  captureMessage: (message: string) => {
    console.error("Capturing message");
  },
};
