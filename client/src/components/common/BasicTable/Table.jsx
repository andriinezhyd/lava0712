import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const BasicTable = ({rows, header}) => {
  let count = 1
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">№</TableCell>
            <TableCell align="right">{header.name}</TableCell>
            <TableCell align="right">{header.model}</TableCell>
            <TableCell align="right">{header.fabric}</TableCell>
            <TableCell align="right">{header.size}</TableCell>
            <TableCell align="right">{header.color}</TableCell>
            <TableCell align="right">{header.price}</TableCell>
            <TableCell align="right">{header.amount}</TableCell>
            <TableCell align="right">{header.date}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const order = count++
            return (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{order}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.fabric}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
