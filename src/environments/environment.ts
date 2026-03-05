// Development environment — images served locally from assets/
export const environment = {
  production: false,
  cdnBase: '',            // empty = relative path, uses src/assets/images/
  emailEndpoint: '',      // empty = log form data to console in dev
  googleReviewsEndpoint: '', // empty = fall back to static testimonials
};
