import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchIndeedJobs } from '../../../lib/api/indeed.js';
import prisma from '../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received JSONData from client: ', req.body);
  const fetchedJobs = await fetchIndeedJobs();
  console.log(fetchedJobs.result);

  const dbResponse = await prisma.job.create({
    data: {
      title: fetchedJobs.result.name,
      company: fetchedJobs.result.company,
      ratings: fetchedJobs.result.rating,
      reviewsCount: fetchedJobs.result.reviews_count,
      description:  fetchedJobs.result.rating,
      url:  fetchedJobs.request.url
    },
  });
  return res.json(dbResponse);
}