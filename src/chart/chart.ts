import ApexCharts from 'apexcharts';
import type { MongoData, Position } from 'src/utils/types';

let chart: ApexCharts | null = null;

// Helper function to check if two dates are equal
function areDatesEqual(dateUnf: string, date2: string) {
  const date1 = dateUnf.split('T')[0];
  const [year1, month1, day1] = date1.split('-').map(Number);
  const [year2, month2, day2] = date2.split('-').map(Number);
  return year1 === year2 && month1 === month2 && day1 === day2;
}

// Helper function to process positions
function processData(dates: string[], positions: Position[]) {
  return dates.map((date) => {
    const position = positions.find((pos: { date: string }) => areDatesEqual(pos.date, date));
    return position && typeof position.position === 'number' ? position.position : null;
  });
}

async function createChart(keywordData: MongoData, dates: string[]) {
  const series = await Promise.all(
    keywordData.companies.map(
      async ({ company, positions }: { company: string; positions: Position[] }) => {
        const data = processData(dates, positions);
        return { name: company, data };
      }
    )
  );

  const options = {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    dataLabels: { enabled: true },
    stroke: { curve: 'straight' },
    series,
    xaxis: {
      categories: dates,
      title: { text: 'Date', style: { color: '#333', fontSize: '14px', fontWeight: 'bold' } },
    },
    yaxis: {
      reversed: true,
      min: 1,
      max: 100,
      title: {
        text: 'SERP Position',
        style: { color: '#333', fontSize: '14px', fontWeight: 'bold' },
      },
      labels: { formatter: (val: number) => Math.round(val) },
    },
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFD700', '#FF00FF', '#00FFFF', '#800080'],
    tooltip: { shared: true },
  };

  const chartContainer = document.querySelector('#chart');
  const chartElement = document.querySelector('.apexcharts-canvas');

  if (chartElement && chart) {
    chart.updateSeries(series, true);
    chart.updateOptions({ xaxis: { categories: dates } }, true);
  } else {
    chart = new ApexCharts(chartContainer, options);
    chart.render();
  }
}

export default createChart;
