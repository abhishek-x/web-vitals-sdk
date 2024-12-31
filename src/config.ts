// src/config.ts

export interface WebVitalsConfig {
    endpoint: string;  // Required endpoint to send the metrics
    debug?: boolean;   // Optional: Enable debug mode
}