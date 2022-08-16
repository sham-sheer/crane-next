const API_URL = 'https://www.page2api.com/api/v1/scrape';
import { getJobsList , config } from 'indeed-job-scraper';

config['base-URL'] = 'https://sg.indeed.com/';

export async function fetchIndeedJobs() {
  const jobs = await getJobsList({
    queryany : 'Construction Worker',
    fromDays: 2
  });

  return jobs;
}