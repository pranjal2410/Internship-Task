import React, {useEffect, useState} from "react";
import { Tabs, Tab } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    }
}))

export default function NavTabs() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [tab, setTab] = useState(0);

    useEffect(() => {
        const route = location.pathname;
        switch (route) {
            case '/':
                setTab(0);
                break;
            case '/all-teams':
                setTab(1);
                break;
            case '/add-match':
                setTab(2);
                break;
            case '/add-team':
                setTab(3);
                break;
            default:
                setTab(0);
        }
    }, [location]);

    const handleTab = (e, newTab) => {
        setTab(newTab);

        switch (newTab) {
            case 0:
                history.push('/');
                break;
            case 1:
                history.push('/all-teams');
                break;
            case 2:
                history.push('/add-match');
                break;
            case 3:
                history.push('/add-team');
                break;
            default:
                history.push('/');
        }
    }

    return (
        <AppBar position="sticky" color="default">
            <Tabs value={tab} onChange={handleTab} textColor="white" indicatorColor="primary">
                <Tab label="All Matches" />
                <Tab label="All Teams" />
                <Tab label="Add Match" />
                <Tab label="Add Team" />
            </Tabs>
        </AppBar>
    )
}