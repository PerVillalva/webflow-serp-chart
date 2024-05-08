import { populateDates, populateKws } from 'src/chart/chart-controls/populateKws';

import { updateChart } from '$utils/chart-controls/updateChart';

declare global {
  interface Window {
    Webflow: unknown[];
  }
}

window.Webflow = window.Webflow || [];
window.Webflow.push(async () => {
  await populateKws();
  await populateDates();
  updateChart();
});
