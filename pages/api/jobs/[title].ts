import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';


// GET /api/jobs
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  let name =  req.query.title;
  const session = await getSession({ req });
  console.log(`Searching: ${name}`);
  if (session) {
    const result = await prisma.job.findMany({
        where: {
            title: {
                startsWith: name.toString()
            }
        }
    });
    console.log(result);
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
