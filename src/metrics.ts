// src/metrics.ts

export interface Metrics {
    ttfb?: number;
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    inp?: number;
    tti?: number;
    tbt?: number;
}

interface PerformanceLongTaskTiming extends PerformanceEntry {
    duration: number;
}

/**
 * Collects all Web Vitals Metrics
 */
export async function collectMetrics(): Promise<Metrics> {
    const metrics: Metrics = {};

    // 1️⃣ TTFB: Time to First Byte
    const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    metrics.ttfb = navigation?.responseStart - navigation?.requestStart;

    // 2️⃣ FCP, LCP, CLS, FID, INP, TTI, TBT
    await new Promise<void>((resolve) => {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                switch (entry.entryType) {
                    case 'paint':
                        if (entry.name === 'first-contentful-paint') {
                            metrics.fcp = entry.startTime;
                        }
                        break;

                    case 'largest-contentful-paint':
                        metrics.lcp = entry.startTime;
                        break;

                    case 'first-input':
                        const fidEvent = entry as PerformanceEventTiming;
                        metrics.fid = fidEvent.processingStart - fidEvent.startTime;
                        break;

                    case 'layout-shift':
                        const shift = entry as any; // LayoutShift is experimental
                        if (!shift.hadRecentInput) {
                            metrics.cls = (metrics.cls || 0) + shift.value;
                        }
                        break;

                    case 'event':
                        const inpEvent = entry as PerformanceEventTiming;
                        metrics.inp = inpEvent.processingStart - inpEvent.startTime;
                        break;

                    case 'longtask':
                        const task = entry as PerformanceLongTaskTiming;
                        metrics.tbt = (metrics.tbt || 0) + Math.max(0, task.duration - 50);
                        break;
                }
            });
        });

        observer.observe({ type: 'paint', buffered: true });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        observer.observe({ type: 'first-input', buffered: true });
        observer.observe({ type: 'layout-shift', buffered: true });
        observer.observe({ type: 'event', buffered: true });
        observer.observe({ type: 'longtask', buffered: true });

        // TTI (Time To Interactive)
        setTimeout(() => {
            const idleTime = performance.now();
            metrics.tti = idleTime;
            observer.disconnect();
            resolve();
        }, 5000); // Approximation
    });

    return metrics;
}