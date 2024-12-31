// src/device/types.ts

/**
 * Device Information Interface
 */
export interface DeviceInfo {
    userAgent: string;
    browserName: string;
    browserVersion: string;
    os: string;
    screenWidth: number;
    screenHeight: number;
    ip?: string;
    latitude?: number;
    longitude?: number;
}