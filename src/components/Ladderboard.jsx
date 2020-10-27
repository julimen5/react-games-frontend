import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// todo: change key
// todo: center Ladderboard
const LadderBoard = (props) => (<div>

    <Title>Ladderboard</Title>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Nameeeee</TableCell>
          <TableCell>Points</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          props.players.map((player, i) => (
            <TableRow key={i}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.points}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
</div>
);

export default LadderBoard;
