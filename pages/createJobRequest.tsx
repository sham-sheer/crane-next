import Link from 'next/link'
import Header from "../components/Header";
import React, { useState } from 'react';
import Router from "next/router";

const CreateJobRequest: React.FC = () => {
  const [locations, setLocations] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleCheck = (event) => {
    if (event.target.checked) {
      setLocations(event.target.value)

      console.log("Location: ", locations)
      locationList.push(locations)
      setLocationList([locations])
      console.log("Location list: ", locationList)
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    // Stop the form from submitting and refreshing the page.
    e.preventDefault();

    const data = {
      name,
      dob,
      skill: ["construction", "cleaner"],
      degree: true,
      locationInterest: locationList
    }

    const JSONdata = JSON.stringify(data)
    // Send the form data to our API and get a response.
    try {
      console.log("Creating database entry for: ", JSONdata)
      const response = await fetch('/api/job', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSONdata
      })
      // Get the response data from server as JSON.
      // If server returns the name submitted, that means the form works.
      const result = await response.json()
      alert(`Created database entry for: ${result.data}`)
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="py-12">
        <h2 className="text-2xl font-bold">Solid</h2>
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
                  <div>
                    <label className="inline-flex items-center">
                      <input className="form-checkbox" type="checkbox" onChange={handleCheck} value="Singapore" />
                      <span className="ml-2">Singapore</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input className="form-checkbox" type="checkbox" onChange={handleCheck} value="United States of America" />
                      <span className="ml-2">United States of America</span>
                    </label>
                  </div>
                  <div>
                    <label className="inline-flex items-center">
                      <input className="form-checkbox" type="checkbox" onChange={handleCheck} value="Cananda" />
                      <span className="ml-2">Cananda</span>
                    </label>
                  </div>
                </div>
              </fieldset>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default CreateJobRequest;