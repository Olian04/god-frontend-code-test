# LOG

## Issue 1

**Issue:** Building project as it was given in the repo resulted in an error originating from webpack: `digital envelope routines::unsupported`. <br>
**Solution:** Add this environment variable `NODE_OPTIONS=--openssl-legacy-provider`. <br>
**Relevant link:** <https://github.com/webpack/webpack/issues/14532>

## Issue 2

**Issue:** Nextjs was throwing warnings regarding a miss match between server data and client data when using SSG. `Warning: Prop 'className' did not match.`
**Solution:** Moved over to SSR instead of SSG.
