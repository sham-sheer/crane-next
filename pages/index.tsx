import React from 'react';
import type { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Job, { JobProps } from '../components/Job';
import { useSession, getSession } from 'next-auth/react';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.jobRequest.findMany();
  console.log('Feed: ', feed);
  return {
    props: { feed : JSON.parse(JSON.stringify(feed)) },
  };
};

type Props = {
  feed: JobProps[];
};

const Blog: React.FC<Props> = (props) => {
  const {data: session}= useSession();
  if (!session) {
    return (
      <Layout>
        <h1>My Jobs</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((job) => (
            <div key={job.id} className="post">
              <Job job={job} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
