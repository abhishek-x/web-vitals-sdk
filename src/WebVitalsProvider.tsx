// src/WebVitalsProvider.tsx

import React, { useEffect, ReactNode, useRef } from 'react';
import { initWebVitalsSDK } from './init';
import { WebVitalsConfig } from './config';

interface WebVitalsProviderProps extends WebVitalsConfig {
    children: ReactNode;
}

/**
 * A React provider that initializes WebVitalsSDK when mounted.
 * Ensures it only initializes once using a ref.
 */
export function WebVitalsProvider({ endpoint, debug, children }: WebVitalsProviderProps) {
    const initializedRef = useRef(false);

    useEffect(() => {
        if (!initializedRef.current) {
            initWebVitalsSDK({ endpoint, debug });
            initializedRef.current = true;
        }
    }, [endpoint, debug]);

    return <>{children}</>;
}