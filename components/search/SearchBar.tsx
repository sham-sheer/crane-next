import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import Layout from '../navigation/Layout';

export default function SearchBar() {

  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => `/api/jobs/${query}`;

  const onChange = useCallback(async (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {

      const response = await fetch(searchEndpoint(query))
      const res = response.json()
      console.log(response)

    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener('click', onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener('click', onClick);
    }
  }, []);

  return (
    <div>
      <div
        className='container'
        ref={searchRef}
      >
        <input
          className='search'
          onChange={onChange}
          onFocus={onFocus}
          placeholder='Search posts'
          type='text'
          value={query}
        />
        { active && results.length > 0 && (
          <ul className='results'>
            {results.map(({ id, title }) => (
              <li className='result' key={id}>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) }
      </div>
      <style jsx>{`
        .container {
            position: relative;
        }

        .search {
            border: 1px solid #666;
            box-sizing: border-box;
            font-size: 18px;
            padding: 18px;
            width: 100%;
        }

        .results {
            list-style: none;
            overflow: hidden;
            margin: 9px 0 0;
            padding: 0;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
        }

        .result {
            background: #0070f3;
            color: #eee;
            margin: 0 0 9px;
            padding: 18px;
        }

        .result a {
            color: #eee;
        }
      `}</style>
    </div>
  );
}