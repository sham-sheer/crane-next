import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

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

const JobRequest: React.FC<{ jobRequest: JobRequestProps }> = ({ jobRequest }) => {
  const authorName = jobRequest.user ? jobRequest.user.name : 'Unknown poster';
  return (
    <div className="text-inherit pb-8" onClick={() => Router.push('/p/[id]', `/p/${jobRequest.id}`)}>
      <h2>{jobRequest.name}</h2>
      <small>Date of Birth: {jobRequest.dob}</small>
    </div>
  );
};

export default JobRequest;
