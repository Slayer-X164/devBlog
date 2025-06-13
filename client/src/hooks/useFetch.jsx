import { useEffect, useState } from "react";

export const useFetch = (API_URL, options = {}, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, options);
        const responseData = await response.json();
        if (!response.ok) {
          console.log(response.statusText,response.status);

        }
        console.log(responseData);
        
        setData(responseData);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  },dependencies);

  return {data,loading,error}
};
