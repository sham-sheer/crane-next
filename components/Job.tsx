import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type JobProps = {
  id: number;
  name: string;
  company: string;
  rating: string;
  reviewsCount: string;
  description: string;
};

const Job: React.FC<{ job: JobProps }> = ({ job }) => {
  const companyName = job.company ? job.company : 'Unknown Company';
  return (
    <div className="text-inherit pb-8" onClick={() => Router.push('/p/[id]', `/p/${job.id}`)}>
      <h2>{job.name}</h2>
      <small>Company: {companyName}</small>
      <small>Description: {job.description}</small>
      <small>Rating: {job.rating}</small>
    </div>
  );
};

export default Job;
