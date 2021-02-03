import { useRouter } from 'next/router';
import useSWR from 'swr';
import EditForm from '../components/edit-form';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Update = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/caregivers/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <>
      {data ? <EditForm defaultValues={data} id={id} /> : <div>loading...</div>}
    </>
  );
};

export default Update;