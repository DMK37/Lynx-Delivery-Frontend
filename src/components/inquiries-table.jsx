import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getInquries } from '../api/backendService';



export default function InquiriesTable() {
  const { getAccessTokenSilently, user } = useAuth0();
    // const rows = [
    //     { id: 1, package: '10x10x10', sourceAddress: 'Warsaw' },
    //     { id: 2, package: '10x10x10', sourceAddress: 'Kraków' },
    //     { id: 3, package: '10x10x10', sourceAddress: 'Gdańsk' },
    //   ];
    const [rows, setRows] = useState([]);
      
      
      const columns = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'package', headerName: 'Package', width: 150 },
        { field: 'sourceAddress', headerName: 'Source Address', width: 200 },
        { field: 'destinationAddress', headerName: 'Destination Address', width: 200 },
        { field: 'highPriority', headerName: 'High Priority', width: 200 },
        { field: 'deliveryAtWeekend', headerName: 'Delivery At Weekend', width: 200 },
      ];

      useEffect(() => {
        const setValues = async () => {
          const token = await getAccessTokenSilently();
          const inquiries = await getInquries(token);
          if (inquiries.error == null) {
            
            inquiries.response.data.map((i) => {
              i.package = i.package.height + 'x' + i.package.width + 'x' + i.package.length;
              i.sourceAddress = i.sourceAddress.city;
              i.destinationAddress = i.destinationAddress.city;
              return i;
            });
            setRows(inquiries.response.data);
            //console.log(inquiries.response.data);
          }
        };
        setValues();
      }, [getAccessTokenSilently, user.sub]);

  return (
    <div style={{ width: '100%' }}>
       <DataGrid rows={rows} columns={columns} />
    </div>
  );
}