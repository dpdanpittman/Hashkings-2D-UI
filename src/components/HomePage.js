import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MediaCard from './FarmingCard';
import InsideCard from './InsideCard';
import WelcomeCard from './WelcomeCard';
import MarketCard from './MarketCard';
import InstructionsCardOne from './InstructionsCardOne';
import InstructionsCardTwo from './InstructionsCardTwo';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  navWidth: {
    width: 550,
    backgroundColor: "#DFB17B"
  },
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  paperBlack: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A"
  },
  paperBlacky: {
    padding: theme.spacing(1),
    backgroundColor: "#000000",
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#000000",
  },
  media: {
    height: 140,
  },
}));

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
const Link2 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
const Link3 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export const HomePage = () => {
const classes = useStyles();
const [value, setValue] = React.useState(0);

  return(
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paperBlue}>
          <WelcomeCard />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperBlue}>
          <InstructionsCardOne />
          </Paper>
        </Grid>
        <Grid item xs={6}>
        <InstructionsCardTwo />
        </Grid>
        <Grid item xs={3}>
          <MediaCard />
        </Grid>
        <Grid item xs={6}>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Tvc8WKlf3mc?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        </Grid>
        <Grid item xs={3}>
          <MarketCard />
        </Grid>
      </Grid>
    <Grid container spacing={3}>
      <Grid item xs={12}> 
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paperBlue}>
        <BottomNavigation
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.navWidth}
        >
          <BottomNavigationAction label="Trending" icon={<FavoriteIcon />} component={Link1} to="/trending" />
          <BottomNavigationAction />
          <BottomNavigationAction label="About" icon={<LocationOnIcon />} component={Link3} to="/faq" />
        </BottomNavigation>
        </Paper>
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
  </div>
  )
};
