import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchIndeedJobs } from '../../../lib/api/indeed.js';
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const results = await fetchIndeedJobs();
  const jobs = results;
  console.log('To be processed: ', jobs);
  const entries = jobs.map(job => {
    return {
      title: job['job-title'],
      company: job['company-name'],
      ratings: job['company-rating'],
      salary: job['job-salary'],
      description:  job['job-snippet'],
      url:  job['job-link']
    };
  });
  console.log('To be inserted: ', entries);
  const dbResponse = await prisma.job.createMany({
    data: entries,
  });
  return res.json(dbResponse);
}