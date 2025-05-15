import React from "react";

import { AppBar, Toolbar, Typography } from '@mui/material';

export default function HeaderBar() {
    return (
        <AppBar position="static" sx={{ bgcolor: "#065EF2" }}>
            <Toolbar>
                <Typography variant="h6" component="div" style={{ fontWeight: 600 }}>
                    Houseplant Hub
                </Typography>
            </Toolbar>
        </AppBar>
    )
}