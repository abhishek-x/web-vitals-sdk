// src/metrics.ts

export interface Metrics {
    ttfb?: number; // Time to First Byte
    fcp?: number; // First Contentful Paint
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
    inp?: number; // Interaction to Next Paint
    tti?: number; // Time to Interactive
    tbt?: number; // Total Blocking Time
}

/**
 * Collects all Web Vitals Metrics
 */
export async function collectMetrics(): Promise<Metrics> {
    const metrics: Metrics = {};
    let longTaskDuration = 0;
    let lastLongTaskEndTime = 0;
    let cumulativeLayoutShift = 0;

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
                        // Handle layout shift properly
                        const shift = entry as unknown as { hadRecentInput?: boolean; value: number };
                        if (!shift.hadRecentInput) {
                            cumulativeLayoutShift += shift.value;
                        }
                        break;

                    case 'event':
                        const inpEvent = entry as PerformanceEventTiming;
                        metrics.inp = inpEvent.processingStart - inpEvent.startTime;
                        break;

                    case 'longtask':
                        const task = entry as PerformanceEntry & { duration: number };
                        const blockingTime = task.duration - 50;
                        if (blockingTime > 0) {
                            longTaskDuration += blockingTime;
                        }
                        lastLongTaskEndTime = task.startTime + task.duration;
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

        /**
         * Time To Interactive (TTI) Approximation
         */
        const checkTTI = () => {
            const now = performance.now();

            // If there hasn't been a long task for 5 seconds, set TTI
            if (now - lastLongTaskEndTime > 5000) {
                metrics.tti = now;
                metrics.tbt = longTaskDuration; // Finalize TBT
                metrics.cls = cumulativeLayoutShift; // Finalize CLS
                observer.disconnect();
                resolve();
            } else {
                // Keep checking every 500ms
                setTimeout(checkTTI, 500);
            }
        };

        // Start checking TTI
        setTimeout(checkTTI, 500);
    });

    return metrics;
}