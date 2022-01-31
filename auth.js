// cookie attribute object to pass when assigning cookies
const COOKIE_OPTIONS = {
    // prevent client-side JS from accessing cookie
    httpOnly: true,
    // no. of milliseconds the cookie will be valid for
    maxAge: 600000,
    // stop cookie from being sent on requests made from other domains
    sameSite: "lax",
    // specify if cookie is signed
    signed: true,
    // only send cookie to the server with an encrypted request over HTTPS (for production only)
    // secure: true
  };

  module.exports = { COOKIE_OPTIONS }