![npm](https://img.shields.io/npm/v/web-vitals-sdk)
![License](https://img.shields.io/github/license/abhishek-x/web-vitals-sdk)

<img src="https://cdn3d.iconscout.com/3d/premium/thumb/performance-3d-icon-download-in-png-blend-fbx-gltf-file-formats--measuring-meter-speed-efficiency-seo-web-pack-icons-4497653.png?f=webp" height="64" width="64">

# Web Vitals SDK

1 second delay on your page load can cause a `7% reduction in conversions`, and `40% people abandons the site` if page load is more than 3 seconds. People are more likely to stay on a site that works well and responds to their requests quickly. That’s why faster-loading sites tend to have lower bounce rates. 

Strong Core Web Vitals ensures a good user experience that’s smooth, fast, and stable. It also improves your SEO since Google also considers the Core Web Vitals in its ranking factors. With `WebVitalsSDK`, you can capture key web performance metrics, analyze them, and make data-driven optimizations.

[WebVitalsSDK](https://www.npmjs.com/package/web-vitals-sdk) is a lightweight plug-and-play frameworkwork, that you can use to capture critical performance metrics like FCP, LCP, TTFB, FID, CLS, INP, TTI, TBT along with device insights like geolocation, ip address, browser, operating system and screen size details. You can effortlessly integrate it into your website and send metrics and insights on every user page load.

![UI](https://www.sentry.dev/static/ede0a65002023f413c74fa086e6ee51f/f904f/web-vital-hero-image-new.webp)

## Metrics Explained

<table>
    <tbody>
        <tr>
            <th>Metric</th>
            <th>Description</th>
            <th>Ideal Value</th>
        </tr>
        <tr>
            <td>TTFB</td>
            <td>Time to First Byte – Measures server response time.</td>
            <td>< 200ms</td>
        </tr>
        <tr>
            <td>FCP</td>
            <td>First Contentful Paint – Time taken for first visible content to render.</td>
            <td>< 1.8s</td>
        </tr>
        <tr>
            <td>LCP</td>
            <td>Largest Contentful Paint – Time taken for the largest content element to render.</td>
            <td>< 2.5s</td>
        </tr>
        <tr>
            <td>FID</td>
            <td>First Input Delay – Measures delay after first user interaction.</td>
            <td>< 100ms</td>
        </tr>
        <tr>
            <td>CLS</td>
            <td>Cumulative Layout Shift – Visual stability of page content.</td>
            <td>< 0.1</td>
        </tr>
        <tr>
            <td>INP</td>
            <td>Interaction to Next Paint – Overall responsiveness to user interactions.</td>
            <td>< 200ms</td>
        </tr>
        <tr>
            <td>TTI</td>
            <td>Time to Interactive – Time until page is fully interactive.</td>
            <td>< 5s</td>
        </tr>
        <tr>
            <td>TBT</td>
            <td>Total Blocking Time – Total time page is blocked by long tasks.</td>
            <td>< 200ms</td>
        </tr>
    </tbody>
</table>

## Installation

Using npm:

```bash
npm install web-vitals-sdk
```

## Setup

### Setup in JavaScript:

```javascript
import { initWebVitalsSDK } from 'web-vitals-sdk';

initWebVitalsSDK({
endpoint: 'https://your-backend.com/collect',
debug: true // Enable verbose logs (optional)
});
```

### Setup in React:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { WebVitalsProvider } from 'web-vitals-sdk';
import App from './App';

ReactDOM.render(
  <WebVitalsProvider endpoint="https://your-backend.com/collect" debug>
    <App />
  </WebVitalsProvider>,
  document.getElementById('root')
);
```

## Sample Payload Sent to Backend

```json
{
  "timestamp": 1712345678901,
  "page_url": "https://example.com",
  "device": {
    "browser": "Chrome",
    "os": "Windows",
    "screenWidth": 1920,
    "screenHeight": 1080
  },
  "metrics": {
    "ttfb": 5.1,
    "fcp": 112.3,
    "lcp": 112.3,
    "fid": 12.4,
    "cls": 0.01,
    "inp": 45.7,
    "tti": 2000.0,
    "tbt": 35.2
  }
}
```

## CI/CD Details

### Build Commands

```bash
npm run clean
npx tsc --noEmit
npm run build
```

### Deploy Commands

```bash
npm login
npm publish --dry-run
npm publish --access public
npm info web-vitals-sdk # Check package info
npm unpublish web-vitals-sdk@1.0.0 --force # Unpublish if needed
```

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/abhishek-x"><img src="https://avatars.githubusercontent.com/u/70960570?v=4" width="100px;" alt=""/><br /><sub><b>Abhishek Aggarwal</b></sub></a><br /></td>
  </tr>
</table>