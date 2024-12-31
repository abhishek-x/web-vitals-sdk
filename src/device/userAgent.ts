// src/device/userAgent.ts

/**
 * Detect Browser Name
 */
export function detectBrowserName(ua: string): string {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    return 'Unknown';
}

/**
 * Detect Browser Version
 */
export function detectBrowserVersion(ua: string): string {
    const match = ua.match(/(Chrome|Firefox|Safari|Edg)\/(\d+\.\d+)/);
    return match ? match[2] : 'Unknown';
}

/**
 * Detect Operating System
 */
export function detectOS(ua: string): string {
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('like Mac')) return 'iOS';
    return 'Unknown';
}