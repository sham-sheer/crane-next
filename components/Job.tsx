import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type JobProps = {
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

const Job: React.FC<{ job: JobProps }> = ({ job }) => {
  const authorName = job.user ? job.user.name : 'Unknown poster';
  return (
    <div className="text-inherit pb-8" onClick={() => Router.push('/p/[id]', `/p/${job.id}`)}>
      <h2>{job.name}</h2>
      <small>Date of Birth: {job.dob}</small>
    </div>
  );
};

export default Job;
