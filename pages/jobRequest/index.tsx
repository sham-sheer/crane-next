import React, { useState } from 'react';
import type { GetServerSideProps } from 'next';
import Router from 'next/router';
import Layout from '../../components/navigation/Layout';
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import Select from 'react-select';
import { countryOption } from '../../resources/country-options';
import { skillOption } from '../../resources/skill-options';
import { languageOption } from '../../resources/language-options';


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
  email: string;
  phone: string;
  degree: string;
  countries: string[];
  skills: string[];
  languages: string[];
};

type Props = {
  feed: JobRequestProps[];
};

const JobRequest: React.FC<Props> = (props) => {
  const {data: session}= useSession();
  const [countries, setCountries] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  })

  function handleCountriesChange(events) {
    const value = events.map(event => event.label);
    setCountries(value);
  } 

  const handleSkillsChange = (events) => {
    const mapped = events.map(event => event.label);
    setSkills(mapped);
  };

  const handleLangChange = (events) => {
    const mapped = events.map(event => event.label);
    setLanguages(mapped);
  };

  function handleStateChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.id]: value
    });
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    const data = {
      name: state.firstName + " " + state.lastName,
      email: state.email,
      phone: state.phone,
      skills,
      countries,
      languages
    };

    console.log(data);

    const JSONdata = JSON.stringify(data);
    // Send the form data to our API and get a response.
    try {
      console.log('Creating database entry for: ', JSONdata);
      const response = await fetch('/api/jobrequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSONdata
      });
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      await response.json();
      await Router.push('/jobs');
    } catch (error) {
      console.error(error);
    }
  };

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
      <h1 className="mt-4 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Create Job Request</h1>   
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 m-10 md:grid-cols-2">
              <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">First name</label>
                  <input onChange={handleStateChange} type="text" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
              </div>
              <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Last name</label>
                  <input onChange={handleStateChange} type="text" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe"  />
              </div>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Email</label>
                  <input onChange={handleStateChange} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@example.com"  />
              </div>  
              <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Phone number</label>
                  <input onChange={handleStateChange} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678"  />
              </div>
              {/* <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              </div>
                <input datepicker datepicker-autohide type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
              
              </div> */}
              <div>
                  <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Countries</label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={countryOption}
                    onChange={handleCountriesChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </div>
              <div>
                  <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Skills</label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={skillOption}
                    onChange={handleSkillsChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </div>
              <div>
                  <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black-300">Spoken Languages</label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={languageOption}
                    onChange={handleLangChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
              </div>
          </div>
          <button className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </Layout>
  );
};

export default JobRequest;
