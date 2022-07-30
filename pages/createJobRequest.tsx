import Header from '../components/Header';
import React, { useState } from 'react';
import Router from 'next/router';

import Select, { StylesConfig } from 'react-select';
import { countryOption } from '../resources/country-options';
import { skillOption } from '../resources/skill-options';
import { languageOption } from '../resources/language-options';

const CreateJobRequest: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleCountryChange = (events) => {
    const mapped = events.map(event => event.label);
    console.log('Countries picked: ', mapped);
    setLocations(mapped);
  };

  const handleSkillChange = (events) => {
    const mapped = events.map(event => event.label);
    console.log('Skills picked: ', mapped);
    setSkills(mapped);
  };

  const handleLangChange = (events) => {
    const mapped = events.map(event => event.label);
    console.log('Languages picked: ', mapped);
    setLanguages(mapped);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    const data = {
      name,
      dob,
      skills,
      degree: true,
      locations,
      languages
    };

    const JSONdata = JSON.stringify(data);
    // Send the form data to our API and get a response.
    try {
      console.log('Creating database entry for: ', JSONdata);
      const response = await fetch('/api/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSONdata
      });
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      await response.json();
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="py-12">
        <h2 className="text-2xl font-bold">Job Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Name</span>
                <input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="
                      mt-1
                      block
                      w-full
                      rounded-md
                      bg-gray-100
                      border-transparent
                      focus:border-gray-500 focus:bg-white focus:ring-0
                    "
                  placeholder=""
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Date of Birth</span>
                <input
                  id="dob"
                  type="date"
                  onChange={(e) => setDob(e.target.value)}
                  className="
                      mt-1
                      block
                      w-full
                      rounded-md
                      bg-gray-100
                      border-transparent
                      focus:border-gray-500 focus:bg-white focus:ring-0
                    "
                  placeholder="john@example.com"
                />
              </label>
              <fieldset className="block">
                <legend className="text-gray-700">Countries you are interested in</legend>
                <div className="mt-2">
                  <Select
                    closeMenuOnSelect={false}
                    defaultValue={[countryOption[0], countryOption[1]]}
                    isMulti
                    options={countryOption}
                    onChange={handleCountryChange}
                  />
                </div>
              </fieldset>
              <fieldset className="block">
                <legend className="text-gray-700">Skills you are interested in</legend>
                <div className="mt-2">
                  <Select
                    closeMenuOnSelect={false}
                    defaultValue={[skillOption[0], skillOption[1]]}
                    isMulti
                    options={skillOption}
                    onChange={handleSkillChange}
                  />
                </div>
              </fieldset>
              <fieldset className="block">
                <legend className="text-gray-700">What languages do you know?</legend>
                <div className="mt-2">
                  <Select
                    closeMenuOnSelect={false}
                    defaultValue={[languageOption[0], languageOption[1]]}
                    isMulti
                    options={languageOption}
                    onChange={handleLangChange}
                  />
                </div>
              </fieldset>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateJobRequest;