export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_UNIVERSAL_GA

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

/**
 *
 * Google Analytics for NextJs, tracking pageViews
 */
export const trackPageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    // page_location: url,
    page_path: url,
  })
}

/**
 *
 * Google Analytics for NextJs, tracking Events
 * see example: how to track events
 * https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/contact.js
 */
export const trackEvent = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
