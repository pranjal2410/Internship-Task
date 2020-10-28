import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TeamContext} from "../../context/TeamContext";

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


export default function TeamRecord () {
    const {teamData} = useContext(TeamContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>Check out record of the team!</h1>
            <div className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Parameters</TableCell>
                            <TableCell align="right">Recorded Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell>{teamData.team_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Coach's Name</TableCell>
                            <TableCell>{teamData.coach_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Captain's Name</TableCell>
                            <TableCell>{teamData.captain_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total matches played</TableCell>
                            <TableCell>{teamData.total_matches_played}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total matches won</TableCell>
                            <TableCell>{teamData.total_matches_won}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Points in table</TableCell>
                            <TableCell>{teamData.points}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}