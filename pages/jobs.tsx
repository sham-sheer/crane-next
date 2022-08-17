import React from 'react';
import { useState } from 'react';
import Router from 'next/router';
import type { GetServerSideProps } from 'next';
import Layout from '../components/navigation/Layout';
import { useSession } from 'next-auth/react';
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.job.findMany();

  console.log('Feed: ', feed);
  return {
    props: { feed : JSON.parse(JSON.stringify(feed)) },
  };
};

type JobProps = {
  id: number;
  title: string;
  company: string;
  ratings: string;
  salary: string;
  url: string;
  description: string;
};

type Props = {
  feed: JobProps[];
};


const Jobs: React.FC<Props> = (props) => {
  const {data: session}= useSession();
  const [isShown, setIsShown] = useState(false);
  const [jobState, setJob] = useState({
    id: 0,
    title: '',
    company: '',
    ratings: '',
    salary: '',
    url: '',
    description: ''
  });

  if (!session) {
    return (
      <Layout>
        <h1>My Jobs</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  const handleJobClick = job => {
    setJob(job);
    setIsShown(true);
  };

  const handleApplyClick = async () => {
    const data = {
      name: jobState.title,
      resume: 'resume',
      jobId: jobState.id
    };
    try {
      console.log('Creating database entry for: ', jobState);
      const response = await fetch('/api/jobapplication/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      await response.json();
      await Router.push('/appliedJobs');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <div className="inline-block">
          {props.feed.map((job) => (
            <div key={job.id} className="bg-white transition-shadow hover:bg-sky-700 hover:text-gray-50 rounded-md" onClick={() => handleJobClick(job)}>
              <div className="text-inherit m-2 p-4 w-96">
                <h2 className="font-bold">{job.title}</h2>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis uppercase pb-2">{job.company}</p>
                <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">{job.salary}</div>
              </div>
            </div>
          ))}
        </div>

        {isShown && (
          <div key={jobState.id} className="m-2 bg-white transition-shadow inline-block align-top h-screen">
            <div className="m-2 p-4">
              <h2 className="font-bold">{jobState.title}</h2>
              <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis uppercase pb-2">{jobState.company}</p>
              <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">{jobState.salary}</div>
              <p className="break-words pt-2">Description:</p>
              <div>{jobState.description}</div>
              <button type="button" className="mt-2 focus:outline-none text-white bg-sky-200 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800" onClick={() => handleApplyClick()}>Apply  </button>
              <button type="button" className="mt-2 focus:outline-none text-white bg-sky-200 hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">Message  </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Jobs;
