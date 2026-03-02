// Production environment — images served from Cloudflare R2 CDN
// TODO: Replace with actual R2 public URL / custom domain once configured
export const environment = {
  production: true,
  cdnBase: 'https://assets.camping-loutsa.gr',  // ← update when domain is ready
};
