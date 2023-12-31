import { useCallback, useEffect, useState } from "react";

const writeToLocalStorage = (key: string, data: any) => {
  const stringifiedData = JSON.stringify(data);
  window.localStorage.setItem(key, stringifiedData);
};

const clearLocalStorageByKey = (key: string) => {
  window.localStorage.removeItem(key);
};

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [T | undefined, (val: T) => void, () => void] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const set = useCallback(
    (localStorageData) => writeToLocalStorage(key, localStorageData),
    [key],
  );
  const remove = useCallback(() => clearLocalStorageByKey(key), [key]);

  useEffect(() => {
    const currentData = window.localStorage.getItem(key);

    if (
      (!currentData ||
        typeof currentData === "undefined" ||
        typeof currentData === null) &&
      defaultValue
    ) {
      set(defaultValue);
    }

    if (
      currentData &&
      typeof currentData !== "undefined" &&
      typeof currentData !== null
    ) {
      const parsedData = JSON.parse(currentData);
      if (parsedData) {
        setData(parsedData);
      }
    }
  }, [key]);

  const checkLocalStorage = useCallback(
    (e: StorageEvent) => {
      if (e.storageArea === window.localStorage) {
        if (key === e.key && e.newValue) {
          setData(JSON.parse(e.newValue));
        }
      }
    },
    [key],
  );

  useEffect(() => {
    window.addEventListener("storage", checkLocalStorage);
    return () => window.removeEventListener("storage", checkLocalStorage);
  }, [key]);

  return [data, set, remove];
};

export default useLocalStorage;