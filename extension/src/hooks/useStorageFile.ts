import useStorage from './useStorage';

function useStorageFile(): (file: string) => string {
  const [data] = useStorage();

  return (file: string) => data.files[file] ?? file;
}

export default useStorageFile;
