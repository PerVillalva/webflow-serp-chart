import createChart from 'src/chart/chart';
import { getKeywordDataByName } from 'src/mongo/mongoDataAPI';

import { getDates } from '$utils/chart-controls/getDate';

import { getKeywordInputValue } from './getKeyword';

// Helper function to get the value of an input field
function getInputValue(selector: string): string {
  const inputField = document.querySelector(selector) as HTMLInputElement;
  return inputField.value;
}

export function updateChart() {
  const keywordField = '.keywords-field_input';
  const startDateField = '.chart_start-date';
  const endDateField = '.chart_end-date';

  async function update() {
    const keywordName = getKeywordInputValue();
    const startDate = getInputValue(startDateField);
    const endDate = getInputValue(endDateField);

    const keywordData = await getKeywordDataByName(keywordName);

    const dates = await getDates(keywordData.data, startDate, endDate);

    createChart(keywordData.data, dates as string[]);
  }

  [keywordField, startDateField, endDateField].forEach((field) => {
    const element = document.querySelector(field);
    element && element.addEventListener('change', update);
  });

  // Call the update function once by default when the page starts
  update();
}
