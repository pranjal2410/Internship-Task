import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { useLocation} from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
    },
    table: {
        margin: 'auto',
        maxWidth: '75%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
}));

function createData(id, team_name, coach_name, captain_name, total_matches_played, total_matches_won, points) {
    return { id, team_name, coach_name, captain_name, total_matches_played, total_matches_won, points };
}

export default function AllTeams () {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            url: 'http://localhost:5000/api/get-data/'
        }).then((response) => {
            let rows_local = []
            // eslint-disable-next-line array-callback-return
            response.data.teams.map((row) => {
                rows_local.push(createData(row.id, row.team_name, row.coach_name, row.captain_name, row.total_matches_played, row.total_matches_won, row.points))
            })
            setRows(rows_local)
        })
    }, [location])
    return (
        <div className={classes.root}>
            <h1>Check out all the registered teams!</h1>
            <div className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell align="center">Captain Name</TableCell>
                            <TableCell align="right">Coach Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.team_name}
                                </TableCell>
                                <TableCell align="center">{row.captain_name}</TableCell>
                                <TableCell align="right">{row.coach_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}