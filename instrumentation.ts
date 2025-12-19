import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === "production";

// Shared Sentry configuration
const sentryConfig: Sentry.NodeOptions = {
  dsn:
    process.env.SENTRY_DSN ||
    "https://5a4561df5ba745d8b6f7103e2e8ea107@o428318.ingest.sentry.io/5373641",

  environment: process.env.NODE_ENV || "development",
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA,

  // Use lower sample rates in production to reduce costs
  tracesSampleRate: isProduction ? 0.1 : 1.0,

  debug: false,

  // Filter out noisy transactions
  beforeSendTransaction(event) {
    // Filter out health check and static asset requests
    if (
      event.transaction?.includes("/_next/") ||
      event.transaction?.includes("/api/health") ||
      event.transaction?.includes("/favicon.ico")
    ) {
      return null;
    }
    return event;
  },

  // Configure integrations
  integrations: [
    // Add server-specific integrations if needed
  ],
};

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side initialization
    Sentry.init(sentryConfig);
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime initialization (uses same config)
    Sentry.init(sentryConfig);
  }
}

// Export the hook for request errors
export const onRequestError = Sentry.captureRequestError;
