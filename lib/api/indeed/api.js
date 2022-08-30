import { getJobsList , config } from 'indeed-job-scraper';

config['base-URL'] = process.env.INDEED_BASE_URL_SG

export async function fetchIndeedJobs() {
  const jobs = await getJobsList({
    queryany : 'Construction Worker',
    fromDays: 2
  });

  return jobs;
}

if(params.domain) {
  url += '?domain=' + params.domain;
}

url += '&api_key=' +  apiKey;