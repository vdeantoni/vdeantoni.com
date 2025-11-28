// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { Replay } from "@sentry/replay";

const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://5a4561df5ba745d8b6f7103e2e8ea107@o428318.ingest.sentry.io/5373641",

  environment: process.env.NODE_ENV || 'development',
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  
  // Use lower sample rates in production
  tracesSampleRate: isProduction ? 0.1 : 1.0,

  // Disable debug to reduce console noise
  debug: false,

  // Session Replay configuration
  replaysOnErrorSampleRate: 1.0, // Always capture replays on errors
  replaysSessionSampleRate: isProduction ? 0.01 : 0.1, // Lower rate in production

  // Filter out noise and PII
  beforeSend(event) {
    // Don't send events in development unless explicitly needed
    if (!isProduction && !process.env.SENTRY_FORCE_DEV) {
      return null;
    }
    return event;
  },

  // Session Replay integration with better privacy settings
  integrations: [
    new Replay({
      // Balance between privacy and debugging value
      maskAllText: isProduction, // Only mask in production
      blockAllMedia: true,
      maskAllInputs: true,
      
      // Sample network requests
      networkDetailAllowUrls: [
        // Allow your API endpoints for better debugging
        /\/api\//,
      ],
    }),
  ],
});

// Export the hook for router transitions
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
