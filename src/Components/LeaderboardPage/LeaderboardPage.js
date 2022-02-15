import { Container, Typography } from '@material-ui/core';
import { useState } from 'react';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import styles from './LeaderboardPage.module.css';
// import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';

const LeaderboardPage = () => {

    const columns = [
        { id: 'rank', label: 'Rank',  align: 'left', minWidth: 1 },
        { id: 'player', label: 'Player',  align: 'left', minWidth: 1 },
        {id: 'score', label: 'Points',  align: 'left', minWidth: 1},
    ];

    function createData(rank, player, score) {
        return { rank, player, score};
    }

    const rows = [
        createData(1, 'Nitsan Ben Yehuda', 15000),
        createData(2, 'Guy Shabtai', 10000),
        createData(3, 'Tommy Lauren',9522),
    ];


        return(
            <TableContainer sx={{ maxHeight: 400, maxWidth: 1200, padding: 3}} className={styles.container}>
                <Typography variant="h4" component="h4" align='center' className={styles.title}>LEADERBOARD </Typography>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>  
                            {columns.map((column) => (
                            <TableCell sx={{minWidth: 80, color: '#F84570', fontWeight: 'bold'}}
                                key={column.id}
                                align={column.align}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => {
                        return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                    {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} sx={{ color: '#F84570'}} >
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                        })}
                    </TableBody>
                </Table>
           </TableContainer>
        )
    }

export default LeaderboardPage;