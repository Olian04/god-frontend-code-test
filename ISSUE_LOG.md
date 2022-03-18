# LOG

## Issue 1

**Issue:** Building project as it was given in the repo resulted in an error originating from webpack: `digital envelope routines::unsupported`. <br>
**Solution:** Add this environment variable `NODE_OPTIONS=--openssl-legacy-provider`. <br>
**Relevant link:** <https://github.com/webpack/webpack/issues/14532>
