import React from 'react';
import Layout from '../../components/navigation/Layout';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getHunterDomainSearchEmails } from '../../lib/api/hunter/api.js';

// export const getServerSideProps: GetServerSideProps = async () => {
//   const feed = await getHunterDomainSearchEmails({ domain: "stripe.com"}); 

//   console.log('Hunter Feed: ', feed.data.emails);
//   return {
//     props: { feed : JSON.parse(JSON.stringify(feed)) },
//   };
// };
const Hunter = props => {
    const {data: session}= useSession();
    const [state, setState] = useState({
      firstName: "",
      lastName: "",
      domain: ""
    })
    const [emails, setEmails] = useState([]);
    const [isShown, setIsShown] = useState(false)

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
        [evt.target.name]: value
      });
    }

    const handleSubmit = async () => {
      console.log(state.domain)
      try {
        const response = await getHunterDomainSearchEmails({ domain: state.domain}); 
        
        setEmails(response.data.emails);
        setIsShown(true);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Layout>
        <div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
                <input onChange={handleChange} type="text" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
                <input value={state.lastName} onChange={handleChange} type="text" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
                <input value={state.domain} onChange={handleChange} type="text" name="domain" id="domain" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                <label htmlFor="domain" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Domain (Ex. stripe.com)</label>
            </div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Submit</button>

        </div>

        {isShown && (
        <div className="pt-6 grid gap-4 grid-cols-3 grid-rows-3">
          {emails.map((email) => (
            <div key={email.value} className="bg-white transition-shadow hover:bg-sky-700 hover:text-gray-50 rounded-md">
              <div className="text-inherit m-2 p-4 w-96">
                <h2 className="font-bold">{email.value}</h2>
                <p className="break-normal overflow-hidden whitespace-nowrap text-ellipsis uppercase pb-2">{email.confidence}</p>
                <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">{email.first_name}</div>
                <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">{email.last_name}</div>
              </div>
            </div>
          ))}
        </div>
        )}
      </Layout>
    )
}

export default Hunter;