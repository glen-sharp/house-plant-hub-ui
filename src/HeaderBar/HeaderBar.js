import React from "react";
import { useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import LogOut from "../Logout/Logout";

const nonLoginUrls = ["/login", "/register"]

export default function HeaderBar() {
    var nonLoginPathFlag = nonLoginUrls.indexOf(useLocation().pathname) >= 0
    return (
        <AppBar position="static" sx={{ bgcolor: "#065EF2" }}>
            <Toolbar>
                <Typography variant="h6" component="div" style={{ fontWeight: 600 }}>
                    Houseplant Dashboard
                </Typography>
                {!nonLoginPathFlag && (
                    <Button
                    color="inherit"
                    sx={{ marginLeft: "auto" }}
                    onClick={LogOut}
                    >Logout</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}