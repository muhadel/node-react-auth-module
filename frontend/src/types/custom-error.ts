// Define a custom error type
export interface CustomError {
  response?: {
    status?: number;
    statusText?: string;
    data?: {
      error?: {
        path: string;
        method: string;
        timestamp: string;
        message: string;
      };
    };
  };
}
