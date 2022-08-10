import React from 'react';
import type { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import JobRequest, { JobRequestProps } from '../components/JobRequest';
import { useSession } from 'next-auth/react';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.jobRequest.findMany();

  console.log('Feed: ', feed);
  return {
    props: { feed : JSON.parse(JSON.stringify(feed)) },
  };
};

type Props = {
  feed: JobRequestProps[];
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
          {props.feed.map((jobRequest) => (
            <div key={jobRequest.id} className="post">
              <JobRequest jobRequest={jobRequest} />
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
