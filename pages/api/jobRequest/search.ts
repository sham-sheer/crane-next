import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';


// POST /api/jobrequest/search
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received JSONData from client: ', req.body);
  const jsonData = req.body;
  const session = await getSession({ req });
  console.log('Session Data: ', session);
  if (session) {
    const result = await prisma.jobRequest.findMany({
      where: {
        skills: {
            hasEvery: jsonData.skills
        },
        languages: {
            hasEvery: jsonData.languages
        },
        countries: {
            hasEvery: jsonData.countries
        }
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
