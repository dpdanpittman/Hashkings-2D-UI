import React from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MediaCard from './FarmingCard';
import InsideCard from './InsideCard';
import WelcomeCard from './WelcomeCard';
import MarketCard from './MarketCard';
import InstructionsCardOne from './InstructionsCardOne';
import InstructionsCardTwo from './InstructionsCardTwo';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import { BlogIcon, InformationIcon, CurationIcon, TwitchIcon } from './Icons';
import { Parallax, Background } from 'react-parallax';

const useStyles = makeStyles(theme => ({
  navWidth: {
    width: "auto",
    backgroundColor: "transparent"
  },
  root: {
    flexGrow: 1,
    height: "auto",
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

export const HomePage = () => {
const classes = useStyles();
const [value, setValue] = React.useState(0);
const isDesktop = window.innerWidth < 1000;
const image1 = "https://i.imgur.com/CFhHzP4.png";

if (!isDesktop) {
  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>
      <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperBlue}>
          <InstructionsCardOne />
          </Paper>
        </Grid>
        <Grid item xs={6}>
        <InstructionsCardTwo />
        </Grid>
        <Grid container spacing={3}>
      <Grid item xs={12}> 
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
        
          <>
        <BottomNavigation
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.navWidth}
        >
          <BottomNavigationAction label="Curation Trail" icon={<CurationIcon />} component={Link1} to="/trending" />
          <BottomNavigationAction />
          <BottomNavigationAction label="Streams" icon={<TwitchIcon />} component={Link2} to="/streams" />
        </BottomNavigation>
        </>
       
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid>
        <Grid item xs={3}>
          <MediaCard />
        </Grid>
        <Grid item xs={6}>
          <InsideCard />
        </Grid>
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
          <>
        <BottomNavigation
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.navWidth}
        >
          <BottomNavigationAction label="Trending" icon={<BlogIcon />} component={Link1} to="/trending" />
          <BottomNavigationAction />
          <BottomNavigationAction label="About" icon={<InformationIcon />} component={Link2} to="/faq" />
        </BottomNavigation>
        </>
     
      </Grid>
      <Grid item xs={3}>
      </Grid>
    </Grid> 
      
    
    </Container>
    </div>
    </Parallax>
  );
 } else {
  return (
    <Redirect to='/login'/>
    );
  }
};

