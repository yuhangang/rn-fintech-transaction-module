export interface IErrorTrackingService {
  captureException(params: { error: any; fatal?: boolean }): void;
}

export const ErrorTrackingService: IErrorTrackingService = {
  captureException: ({
    error,
    fatal = false,
  }: {
    error: any;
    fatal?: boolean;
  }) => {
    // TODO: Implement error tracking service to capture and log errors to Sentry or Crashlytics
  },
};
