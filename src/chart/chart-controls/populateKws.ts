import { getKeywordDataByName, getKeywords } from 'src/mongo/mongoDataAPI';
import type { MongoData } from 'src/utils/types';

import { getKeywordInputValue } from './getKeyword';

// Util functions
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// DOM elements
const keywordFilter = document.querySelector('.keywords-field_input') as HTMLInputElement;
const startDate = document.querySelector('.chart_start-date') as HTMLInputElement;
const endDate = document.querySelector('.chart_end-date') as HTMLInputElement;

// Populate the start and end date fields
export async function populateDates() {
  const keywordInputValue = getKeywordInputValue();
  const keywordData = await getKeywordDataByName(keywordInputValue);
  const { companies } = keywordData.data;
  const { positions } = companies[0];
  const startDateDate = new Date(positions[0].date);
  const endDateDate = new Date(positions[positions.length - 1].date);

  startDate.value = formatDate(startDateDate);
  endDate.value = formatDate(endDateDate);
}

// Populate the keyword filter dropdown
export async function populateKws() {
  const keywordArray = await getKeywords();

  keywordArray.data
    .sort((a: MongoData, b: MongoData) => a.keyword.localeCompare(b.keyword))
    .map((keywordObj: MongoData) => {
      const { keyword } = keywordObj;
      const option = document.createElement('option');

      option.value = keyword;
      option.textContent = keyword;
      keywordFilter.appendChild(option);
    });
}
