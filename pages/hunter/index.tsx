import React from 'react';
import Layout from '../../components/navigation/Layout';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getHunterDomainSearchEmails, getHunterEmailFinderEmails } from '../../lib/api/hunter/api.js';


const Hunter = props => {
    const {data: session}= useSession();
    const [state, setState] = useState({
      firstName: "",
      lastName: "",
      domain: ""
    })
    const [emails, setEmails] = useState([]);
    const [isDomain, setIsDomain] = useState(false)
    const [isEmailFinder, setIsEmailFinder] = useState(false)

    if (!session) {
      return (
        <Layout>
          <h1>My Jobs</h1>
          <div>You need to be authenticated to view this page.</div>
        </Layout>
      );
    }

    function handleChange(evt) {
      const value = evt.target.value;
      setState({
        ...state,
        [evt.target.id]: value
      });
    }

    const handleSubmit = async () => {
      console.log(state.domain)
      try {
        if(state.firstName && state.lastName) {
          const response = await getHunterEmailFinderEmails({ 
            domain: state.domain,
            firstName: state.firstName,
            lastName: state.lastName
          }); 
          
          setEmails(Array.of(response.data));
          setIsEmailFinder(true);
          setIsDomain(false);
        } else {
          const response = await getHunterDomainSearchEmails({ 
            domain: state.domain
          }); 
          
          setEmails(response.data.emails);
          setIsEmailFinder(false);
          setIsDomain(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Layout>
        <h1 className="mt-4 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">Find Emails</h1>   
        {/* <div className='container'>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-start-2">
              <div>
                    <label htmlFor="firstName">First name</label>
                    <input value={state.firstName} onChange={handleChange}  type="text" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                </div>
                <div>
                    <label htmlFor="lastName">Last name</label>
                    <input value={state.lastName} onChange={handleChange}  type="text" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                </div>
                <div>
                    <label htmlFor="domain">Domain</label>
                    <input value={state.domain} onChange={handleChange}  type="text" id="domain" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="stripe.com" required />
                </div>
                <div className="inline-block py-12">
                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSubmit}>Hunt!</button>
                </div>
            </div>
          </div>
          <div className="m-8 grid grid-cols-5">
          </div>
        </div> */}

        <div>
      <div className='container'>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-start-2">
            <input placeholder="First Name" type="text" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Last Name" type="text" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
          </div>
          <div>
            <input placeholder="Domain" type="text" id="domain" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} />
          </div>
          <button onClick={handleSubmit} className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>
    </div>

      {isDomain && (
        <div className="pt-6 grid gap-4 grid-cols-3 grid-rows-3">
          {emails.map((email) => (
            <div key={email.value} className="bg-white transition-shadow hover:bg-sky-700 hover:text-gray-50 rounded-md">
              <div className="text-inherit m-2 p-4 w-96">
                <h2 className="font-bold">{email.first_name} {email.last_name}</h2>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis uppercase pb-2">{email.value}</p>
                <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">Confidence: {email.confidence}</div>
              </div>
            </div>
          ))}
        </div>
        )}


      {isEmailFinder && (
        <div className="pt-6 grid gap-4 grid-cols-3 grid-rows-3">
          {emails.map((email) => (
            <div key={email.email} className="bg-white transition-shadow hover:bg-sky-700 hover:text-gray-50 rounded-md">
              <div className="text-inherit m-2 p-4 w-96">
                <h2 className="font-bold">{email.first_name} {email.last_name}</h2>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis uppercase pb-2">Position: {email.position}</p>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis uppercase pb-2">Company: {email.company}</p>
                <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">Confidence: {email.score}</div>
              </div>
            </div>
          ))}
        </div>
        )}  
      </Layout>
    )
}

export default Hunter;