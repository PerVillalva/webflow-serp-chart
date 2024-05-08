import type { Company, MongoData } from 'src/utils/types';

// Helper function to format date as 'YYYY-MM-DD'
function formatDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
}

// Helper function to parse a date string in the format 'YYYY-MM-DD' to a Date object
function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export async function getDates(
  keywordData: MongoData,
  startDateString: string,
  endDateString: string
) {
  // Extract and format all dates from mongoData
  const dates = keywordData.companies.flatMap((companydata: Company) =>
    companydata.positions.map((positionData) => formatDate(new Date(positionData.date)))
  );

  // Parse the start and end dates
  const startDate = parseDate(startDateString);
  const endDate = parseDate(endDateString);

  // Filter, sort, and remove duplicates
  const sortedDateStrings = Array.from(
    new Set(
      dates
        .map((date: string) => new Date(date))
        .filter((date: Date) => date >= startDate && date <= endDate)
        .sort((a: Date, b: Date) => a.getTime() - b.getTime())
        .map((date: Date) => formatDate(date))
    )
  );

  return sortedDateStrings;
}
