import React from 'react';
import type { GetServerSideProps } from 'next';
import Router from 'next/router';
import Layout from '../components/navigation/Layout';
import { useSession } from 'next-auth/react';
import prisma from '../lib/prisma';
import SearchBar from '../components/search/SearchBar';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.jobRequest.findMany();

  console.log('Feed: ', feed);
  return {
    props: { feed : JSON.parse(JSON.stringify(feed)) },
  };
};

export type JobRequestProps = {
  id: number;
  name: string;
  dob: string;
  user: {
    name: string;
    email: string;
  } | null;
  degree: string;
  locationInterest: string[];
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
        <h1>Work in Progress</h1>
        <main>
          {props.feed.map((jobRequest) => (
            <div key={jobRequest.id} className="post">
              <div className="text-inherit pb-8" onClick={() => Router.push('/p/[id]', `/p/${jobRequest.id}`)}>
                <h2>{jobRequest.name}</h2>
                <small>Date of Birth: {jobRequest.dob}</small>
              </div>
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
