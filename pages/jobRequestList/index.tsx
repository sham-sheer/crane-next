import React from 'react';
import { useState } from 'react';
import Router from 'next/router';
import type { GetServerSideProps } from 'next';
import Layout from '../../components/navigation/Layout';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import JobRequestSearch from '../../components/search/JobRequestSearch';
import { CSVLink, CSVDownload } from "react-csv";


export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.jobRequest.findMany();

  console.log('Feed: ', feed);
  return {
    props: { feed : JSON.parse(JSON.stringify(feed)) },
  };
};

type JobRequestProp = {
  id: number;
  name: string;
  email: string;
  phone: string;
  degree: string;
  countries: string[];
  skills: string[];
  languages: string[];
};
type Props = {
  feed: JobRequestProp[];
};


const JobRequestList: React.FC<Props> = (props) => {
  const {data: session}= useSession();
  const [isShown, setIsShown] = useState(false);
  const [searchData, setSearchData] = useState(props.feed);

  if (!session) {
    return (
      <Layout>
        <h1>My Jobs</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }
  console.log(searchData);
  return (
    <Layout>
      <h1 className="mt-4 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Job Requests</h1> 
      <CSVLink data={searchData} className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download CSV</CSVLink>
  
      <div className="m-8 page">
      <JobRequestSearch searchData={searchData} setSearchData={setSearchData} />
        <div className="pt-6 grid gap-4 grid-cols-3 grid-rows-3">
          {searchData.map((jobRequest) => (
            <div key={jobRequest.id} className="bg-white transition-shadow hover:bg-sky-700 hover:text-gray-50 rounded-md mt-4">
              <div className="text-inherit m-2 p-4 w-96">
                <h2 className="font-bold">Name: {jobRequest.name}</h2>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis pb-2">Email: {jobRequest.email}</p>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis pb-2">Phone: {jobRequest.phone}</p>
                
                {jobRequest.skills.map((skill) => (
                  <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">{skill}</div>
                ))}

                {jobRequest.countries.map((country) => (
                  <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-md">{country}</div>
                ))}

                {jobRequest.languages.map((lang) => (
                  <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-md">{lang}</div>
                ))}

              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default JobRequestList;
