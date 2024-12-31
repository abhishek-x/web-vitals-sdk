// src/init.ts

import { WebVitalsConfig } from './config';
import { getDeviceInfo } from './device';
import { collectMetrics } from './metrics';

/**
 * Initialize WebVitalsSDK, collect metrics and device info,
 * and send them to the configured endpoint.
 */
export async function initWebVitalsSDK(config: WebVitalsConfig): Promise<void> {
    if (!config.endpoint) {
        console.warn('[WebVitalsSDK] No endpoint provided. Initialization aborted.');
        return;
    }

    try {
        if (config.debug) {
            console.log('[WebVitalsSDK] Initialization started...');
        }

        // Collect device details
        const deviceInfo = getDeviceInfo();

        // Collect web vitals metrics
        const metrics = await collectMetrics();

        // Build the payload
        const payload = {
            timestamp: Date.now(),
            page_url: window.location.href,
            device: deviceInfo,
            metrics,
        };

        if (config.debug) {
            console.log('[WebVitalsSDK] Payload prepared:', payload);
        }

        // Send to the endpoint
        await fetch(config.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (config.debug) {
            console.log('[WebVitalsSDK] Metrics successfully sent.');
        }
    } catch (error) {
        console.error('[WebVitalsSDK] Error during initialization:', error);
    }
}