import React from 'react';
import Grid from '@material-ui/core/Grid';
import {AppInlineProfile} from "../AppInlineProfile";
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { FarmTopbarIcon, BlogIcon, LandIcon, SeedIcon, InformationIcon, FarmIcon } from './Icons';

export default function DesktopTopbar(){
    const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link2 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link3 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link4 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link5 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

    return (
<div className="layout-topbar clearfix">
<Grid container spacing={0}>
    <Grid item xs={6}>
        <Grid container spacing={0}>
            <Grid item xs={1}>
            <IconButton className="layout-menu-button" component={Link1} to="/home">
            <FarmIcon />
            </IconButton>
            </Grid>
            <Grid item xs={1}>
            <IconButton className="layout-menu-button" component={Link1} to="/farm">
            <LandIcon />
            </IconButton>
            </Grid>
            <Grid item xs={1}>
            <IconButton className="layout-menu-button" component={Link2} to="/market/farmplots">
            <FarmTopbarIcon />
            </IconButton>
            </Grid>
            <Grid item xs={1}>
            <IconButton className="layout-menu-button" component={Link3} to="/market/seedbank">
            <SeedIcon />
            </IconButton>
            </Grid> 
            <Grid item xs={1}>
            <IconButton className="layout-menu-button" component={Link4} to="/trending">
            <BlogIcon />
            </IconButton>
            </Grid> 
            <Grid item xs={1}>
            <IconButton className="layout-menu-button" component={Link5} to="/faq">
            <InformationIcon />
            </IconButton>
            </Grid> 
        </Grid>
    </Grid>
    <Grid item xs={6}>
        <div className="layout-topbar-icons button">
            <AppInlineProfile />
        </div>
    </Grid>
</Grid>
</div> 
    );
}