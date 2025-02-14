export interface HealthCheckResponse {
  status: string;
  timestamp: string;
}

export interface SSRDataResponse {
  message: string;
  timestamp: string;
  serverInfo: {
    node: string;
    platform: string;
  };
}
