// src/device/geolocation.ts

/**
 * Fetch user's geolocation using browser API.
 */
export async function getBrowserGeolocation(): Promise<{ latitude?: number; longitude?: number }> {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.warn('[WebVitalsSDK] Geolocation API is not supported by this browser.');
            return resolve({});
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.warn('[WebVitalsSDK] Browser geolocation failed:', error.message);
                resolve({});
            }
        );
    });
}

/**
 * Fetch user's IP address and geolocation from an IP-based API.
 */
export async function getIPGeolocation(): Promise<{ ip?: string; latitude?: number; longitude?: number }> {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch IP address and location');
        }

        const data = await response.json();
        return {
            ip: data.ip,
            latitude: data.latitude,
            longitude: data.longitude,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('[WebVitalsSDK] IP Geolocation failed:', error.message);
        } else {
            console.error('[WebVitalsSDK] An unknown error occurred during IP Geolocation');
        }
        return {};
    }
}

/**
 * Fetch user geolocation: Prefer browser geolocation, fallback to IP-based geolocation.
 */
export async function getUserGeolocation(): Promise<{ ip?: string; latitude?: number; longitude?: number }> {
    const ipGeo = await getIPGeolocation();
    const browserLocation = await getBrowserGeolocation();

    return {
        ip: ipGeo.ip,
        latitude: browserLocation.latitude || ipGeo.latitude,
        longitude: browserLocation.longitude || ipGeo.longitude,
    };
}