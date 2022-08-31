import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';
import { countryOption } from '../../resources/country-options';
import { skillOption } from '../../resources/skill-options';
import { languageOption } from '../../resources/language-options';

export default function JobRequestSearch({searchData, setSearchData}) {

  const searchRef = useRef(null);
  const [active, setActive] = useState(false);

  const [countries, setCountries] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

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

  const handleSearch = async (e: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    const data = {
      skills,
      countries,
      languages
    };

    const JSONdata = JSON.stringify(data);
    // Send the form data to our API and get a response.
    try {
      console.log('Creating database entry for: ', JSONdata);
      const response = await fetch('/api/jobrequest/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSONdata
      });
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const results = await response.json();
      setSearchData(results);
    } catch (error) {
      console.error(error);
      setSearchData([]);
    }
  };

  return (
    <div>
      <div
        className='container'
        ref={searchRef}
      >
        <div className="grid grid-cols-5 gap-4">
          <div className="col-start-2">
          <Select
            placeholder="Skills"
            closeMenuOnSelect={false}
            isMulti
            options={skillOption}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleSkillsChange}
            />
          </div>
          <div>
            <Select
              placeholder="Where"
              closeMenuOnSelect={false}
              isMulti
              options={countryOption}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleCountriesChange}
              />
          </div>
          <div>
            <Select
              placeholder="Languages"
              closeMenuOnSelect={false}
              isMulti
              options={languageOption}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleLangChange}
              />
          </div>
          <button onClick={handleSearch} className="ml-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>
    </div>
  );
}