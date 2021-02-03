import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Button from 'react-bootstrap/Button';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Caregiver = () => {
  const router = useRouter();
  const { id } = router.query;

  const onClick = async () => {
    try {
      const res = await fetch(`/api/caregivers/${id}/delete`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error } = useSWR(`/api/caregivers/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <>
      <h1>Caregiver</h1>
      <hr />
      {data ? (
        <div>
          <p className="name">
            {data.firstName} {data.lastName}
          </p>
          <p className="num">{data.telephone}</p>
          {/* <p className="num">{data.creditCard.number}</p> */}

          <div className="buttons">
            <Button variant="outline-primary" href={`/caregivers/${id}/update`}>              
              Edit
            </Button>
            <Button variant="danger" onClick={onClick}>
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}      
    </>
  );
};

export default Caregiver;