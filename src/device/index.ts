// src/device/index.ts

import { DeviceInfo } from './types';
import { getUserGeolocation } from './geolocation';
import { detectBrowserName, detectBrowserVersion, detectOS } from './userAgent';

/**
 * Fetch Device Information including IP and Location
 */
export async function getDeviceInfo(): Promise<DeviceInfo> {
    const ua = navigator.userAgent || '';
    const geolocation = await getUserGeolocation();

    const deviceInfo: DeviceInfo = {
        userAgent: ua,
        browserName: detectBrowserName(ua),
        browserVersion: detectBrowserVersion(ua),
        os: detectOS(ua),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        ...geolocation,
    };

    return deviceInfo;
}