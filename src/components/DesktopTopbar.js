import React from 'react';
import Grid from '@material-ui/core/Grid';
import {AppInlineProfile} from "../AppInlineProfile";
import { Link as RouterLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { FarmTopbarIcon, BlogIcon, LandIcon, SeedIcon, InformationIcon, FarmIcon, TutorialIcon } from './Icons';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    paperBrown: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      backgroundColor: "#532C0C",
    },
    font: {
      fontFamily: '"Jua", sans-serif',
    },
  }));

const theme = createMuiTheme({
    palette: {
      primary: { 500: '#00211B' }, // custom color in hex 
    },
  });
  
  const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: "#000000",
      color: '#DFB17B',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
    },
  }))(Tooltip);

export default function DesktopTopbar(){
    const classes = useStyles();

    const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link2 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link3 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link4 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link5 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const Link6 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

    return (
<div className="layout-topbar clearfix">
<Grid container spacing={0}>
    <Grid item xs={6}>
        <Grid container spacing={0}>
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Main Menu</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link1} to="/home">
            <FarmIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Vist your Farm</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link2} to="/farm">
            <LandIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Lease Farm Plots</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link3} to="/market/farmplots">
            <FarmTopbarIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid>
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Seed Market</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link4} to="/market/seedbank">
            <SeedIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid> 
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Trending Posts</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link5} to="/trending">
            <BlogIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid> 
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>FAQ</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link6} to="/faq">
            <InformationIcon />
            </IconButton>
            </HtmlTooltip>
            </Grid> 
            <Grid item xs={1}>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="error" className={classes.font}>Learn to Play</Typography>
                </React.Fragment>
              }
              placement="top"
              TransitionComponent={Zoom}
              >
            <IconButton className="layout-menu-button" component={Link6} to="/faq">
            <TutorialIcon />
            </IconButton>
            </HtmlTooltip>
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