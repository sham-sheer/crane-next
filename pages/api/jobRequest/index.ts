import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';


// POST /api/jobrequest
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received JSONData from client: ', req.body);
  const jsonData = req.body;
  const session = await getSession({ req });
  console.log('Session Data: ', session);
  if (session) {
    const result = await prisma.jobRequest.create({
      data: {
        name: jsonData.name,
        skills: jsonData.skills,
        phone: jsonData.phone,
        countries: jsonData.countries,
        languages: jsonData.languages,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
