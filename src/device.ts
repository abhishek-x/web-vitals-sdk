// src/device.ts

export interface DeviceInfo {
    userAgent: string;
    browserName: string;
    browserVersion: string;
    os: string;
    screenWidth: number;
    screenHeight: number;
}

export function getDeviceInfo(): DeviceInfo {
    const ua = navigator.userAgent || '';

    return {
        userAgent: ua,
        browserName: detectBrowserName(ua),
        browserVersion: detectBrowserVersion(ua),
        os: detectOS(ua),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
    };
}

function detectBrowserName(ua: string): string {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    return 'Unknown';
}

function detectBrowserVersion(ua: string): string {
    const match = ua.match(/(Chrome|Firefox|Safari|Edg)\/(\d+\.\d+)/);
    return match ? match[2] : 'Unknown';
}

function detectOS(ua: string): string {
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('like Mac')) return 'iOS';
    return 'Unknown';
}