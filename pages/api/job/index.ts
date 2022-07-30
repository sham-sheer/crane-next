import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';


// POST /api/job
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received JSONData from client: ', req.body);
  const jsonData = req.body;
  const session = await getSession({ req });
  console.log('Session Data: ', session);
  if (session) {
    const result = await prisma.jobRequest.create({
      data: {
        name: jsonData.name,
        dob: jsonData.dob,
        skills: jsonData.skills,
        degree: jsonData.degree,
        locations: jsonData.locations,
        languages: jsonData.languages,
        user: { connect: { email: session?.user?.email } }
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
