import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../common/Title";
import {TableSortLabel} from "@material-ui/core";

const rows = [
  {
    position: 1,
    username: "abrockman",
    xp: 81000
  },
  {position: 2, username: "mulletwang", xp: 45000}
];

export default function Leaderboard() {
  return (
    <React.Fragment>
      <Title>Top 20 Leaderboard</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={false}
                direction="asc"
                onClick={() => alert("Click")}
              >
                Position
              </TableSortLabel>
            </TableCell>
            <TableCell>User</TableCell>
            <TableCell>XP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.position}>
              <TableCell sortDirection="desc">{row.position}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.xp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
