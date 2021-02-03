// components/data-row.js
import Link from 'next/link';
import * as React from 'react'
import Button from 'react-bootstrap/esm/Button';
import { ICaregiver } from '../../../types/caregivers'

type Props = {
    caregiver?: any
    delete?: (id: number) => void
    loading?: boolean
}

const DataRow: React.FC<Props> = ({ caregiver, delete:int, loading }) => {

  return (
  <tr>
      <td></td>
    <td>
      <Link href="/caregivers/[id]" as={`/caregivers/${caregiver?._id}`}>        
          <a>{caregiver?.firstName}</a>
      </Link>
    </td>
    <td>
        {caregiver?.lastName}
      </td>
    <td className={`num ${loading ? 'loading' : ''}`}>{caregiver?.telephone}</td>
    
  </tr>
);
}
export default DataRow;