// Production environment — Cloudflare R2 CDN + Workers API
export const environment = {
  production: true,
  cdnBase: 'https://assets.loutsacamping.gr',
  /**
   * Cloudflare Worker endpoint for contact form submissions.
   * Worker should accept POST { name, email, phone, message }
   * and forward via Resend / SendGrid / Cloudflare Email Routing.
   * Deploy worker at: https://developers.cloudflare.com/workers/
   */
  emailEndpoint: 'https://api.loutsacamping.gr/contact',
  /**
   * Cloudflare Worker endpoint that proxies Google Places API reviews.
   * Keeps the Google API key server-side.
   * Returns: { reviews: GoogleReview[] }
   */
  googleReviewsEndpoint: '', // Worker not yet deployed — falls back to static reviews
};
