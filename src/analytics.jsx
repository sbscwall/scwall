
import posthog from 'posthog-js';

posthog.init('phc_sTVvxq9l6k6WDSYKzRPiip1luAYU5ouZKCy2VgsP9sm', {
    api_host: 'https://us.i.posthog.com',
  autocapture: true, // optional: captures clicks etc.
});

export default posthog;
