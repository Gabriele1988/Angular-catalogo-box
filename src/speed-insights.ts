import { injectSpeedInsights } from '@vercel/speed-insights';

let speedInsights: ReturnType<typeof injectSpeedInsights> = null;

export function setSpeedInsightsRoute(route: string) {
  if (!speedInsights) {
    speedInsights = injectSpeedInsights({ route });
  } else {
    speedInsights.setRoute(route);
  }
}