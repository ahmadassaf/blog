"use client";

import { useEffect, useState } from "react";
import { LinkIcon } from '@heroicons/react/20/solid'
import axios from "axios";

const Preview = ({ url, title }) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const JSON_LINK_API_KEY = 'pk_72fd7eda9e2b4f8c6fb63621930cd2de1847df46';
  const requestURL = `https://jsonlink.io/api/extract?url=${url}&api_key=${JSON_LINK_API_KEY}`;

  useEffect(() => {
    axios
      .get(requestURL)
      .then((response) => {
        setLoading(false);
        if (!response.status == 200) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        title ? response.data.title = title : response.data.title;
        setData(response.data);
      });
  }, []);

  if (loading) {
    return <img className="h-4 w-4 inline-flex m-0 mr-2" src="/static/icons/loading.svg" alt="Loading ..."/>;
  } else return (
    <span className="inline-flex items-baseline mr-1">
      { data.favicon ? 
        <img className="h-4 w-4 m-0 mr-1" src={data ? data.favicon : ""} alt={data ? data.title : "Loading..."} />
        : <LinkIcon className="h-4 w-4 m-0 mr-1" />
      }
      <a href={url}>{data.title ? data.title.split(':')[0] : url}</a>
    </span>
  );
};

export default Preview;