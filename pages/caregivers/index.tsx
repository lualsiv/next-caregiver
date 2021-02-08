// pages/index.js

import * as React from 'react';
import useSWR from 'swr';
import DataRow from './components/data-row';
import { gql } from 'graphql-request';
import { ICaregiver } from '../../types/caregivers';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { graphQLClient } from '../../utils/graphql-client';
import {useAuth} from '../../security/auth'

export default function Home() {
    const { session, loading } = useAuth();

    const fetcher = async (query) => await graphQLClient(session.accessToken).request(query)
    
    const { data, error, mutate } = useSWR(
        gql`
            {
                allCaregivers {
                    data {
                        _id
                        firstName
                        lastName
                        telephone
                    }
                }
            }
        `,
        fetcher
      )
    const [caregiveList, setCaregiverList] = React.useState(data)

    const deleteCaregiver = async (id: number) => {
        const caregivers: ICaregiver[] = caregiveList.filter((caregiver: any) => caregiver.ref['@ref'].id !== id)
        console.log(caregivers)
        setCaregiverList(caregivers)
      }
  
  if (error) return <div>failed to load {JSON.stringify(error)}</div>;

  return (
    <>
      <h1>Next Caregivers CRUD</h1>
        {/* add */}
        <Button variant="outline-primary" href="/caregivers/create">
            Create New Caregiver
        </Button>

        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Telephone</th>
                </tr>
            </thead>
            <tbody>
                {data ? (
                data.allCaregivers.data.map((caregiver) => (
                    <DataRow
                    key={caregiver._id}
                    caregiver={caregiver}
                    delete = {deleteCaregiver}
                    />
                ))
                ) : (
                <>
                    <DataRow loading />
                    <DataRow loading />
                    <DataRow loading />
                </>
                )}
            </tbody>
        </Table>      
    </>
  );
};

// export async function getServerSideProps(ctx) {
//     const session = await getSession(ctx)
//     if (!session) {
//         // ctx.res.writeHead(302, { Location: '/' })
//         // ctx.res.end()
//         return {
//             props: {
//                 accessToken: null,
//             },
//         }
//     }

//     return {
//         props: {
//             accessToken: session.accessToken,
//         },
//     }
//   }