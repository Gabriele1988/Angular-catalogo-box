import { injectSpeedInsights } from '@vercel/speed-insights';

const speedInsights = injectSpeedInsights({ route: window.location.pathname });

export function setSpeedInsightsRoute(route: string) {
  speedInsights?.setRoute(route);
}