import { useEffect, useState } from "react";
import { fetchAuthenticatedApi } from "../../helpers/api";
import isEmpty from "../../helpers/isEmpty";

/**
 * useFetchApi hook for fetch data from api with url
 *
 *
 */
export default function useFetchApi({
  url,
  defaultData = [],
  initLoad = true,
  presentDataFunc = null,
  method = "GET",
  postData = {},
}) {
  const [loading, setLoading] = useState(initLoad);
  const [data, setData] = useState(defaultData);
  const [pagination, setPagination] = useState({});
  const [errors, setErrors] = useState<any>([]);
  const [fetched, setFetched] = useState(false);

  async function fetchApi() {
    if (url === "") {
      return;
    }
    setLoading(true);
    try {
      const resp =
        method === "GET"
          ? await fetchAuthenticatedApi(url)
          : await fetchAuthenticatedApi(url, {
              method,
              body: postData,
            });
      if (resp.data) {
        const newData = presentDataFunc
          ? presentDataFunc(resp.data)
          : resp.data;
        if (!isEmpty(defaultData)) {
          setData((prev) => {
            return { ...prev, ...newData };
          });
        } else {
          setData(newData);
        }
      }
      if (resp.pagination) setPagination(resp.pagination);
      if (resp.errors) {
        setErrors([...errors, resp.errors]);
      }
    } catch (e: any) {
      console.log(e);
      setErrors([...errors, e.message]);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  async function refetch(url: string) {
    if (url === "") {
      return;
    }
    try {
      setLoading(true);
      const resp = await fetchAuthenticatedApi(url);
      if (resp.data) {
        const newData = presentDataFunc
          ? presentDataFunc(resp.data)
          : resp.data;
        if (!isEmpty(defaultData)) {
          setData((prev) => {
            return { ...prev, ...newData };
          });
        } else {
          setData(newData);
        }

        if (resp.pagination) setPagination(resp.pagination);

        return newData;
      }

      setErrors([...errors, resp.errors]);
    } catch (e) {
      console.log(e);
      setErrors([...errors, e.message]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initLoad) {
      fetchApi().then(() => {});
    }
  }, []);

  const handleChangeInput = (key: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    loading,
    data,
    setData,
    pagination,
    refetch,
    errors,
    setLoading,
    fetched,
    setErrors,
    handleChangeInput,
  };
}
