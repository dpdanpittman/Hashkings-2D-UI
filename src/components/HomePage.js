import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MediaCard from './FarmingCard';
import InsideCard from './InsideCard';
import Paper from '@material-ui/core/Paper';
import WelcomeCard from './WelcomeCard';
import MarketCard from './MarketCard';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import { BlogIcon, InformationIcon, SteemIcon, TwitchIcon } from './Icons';
import { Parallax } from 'react-parallax';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TrendingHomePage from './TrendingHomePage';

const useStyles = makeStyles(theme => ({
  navWidth: {
    width: "auto",
    backgroundColor: "transparent",
    borderColor: "#000000"
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
    maxWidth: 'auto',
    backgroundColor: "transparent",
  },
  media: {
    height: 140,
    width: 270,
  },
  mediaTwo: {
    height: 100,
    width: 270,
  },
}));

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

export const HomePage = () => {
const classes = useStyles();
const [value, setValue] = React.useState(0);
const isDesktop = window.innerWidth < 1000;
const image1 = "https://i.imgur.com/j2CGYh2.jpg";

if (!isDesktop) {
  return(
    <Parallax blur={1} bgImage={image1} strength={500}>
    <div className={classes.root}>
      <Container fixed>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WelcomeCard />
          <br/>
        </Grid>
        <Grid container spacing={3}>
      <Grid item xs={12}> 
      </Grid>
      <Grid item xs={3}>
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
      <br/>
      <hr/>
      <br/>

      <Grid container spacing={1}>
        <Grid item xs={12}>
        <center>
    <img src="https://i.imgur.com/Yzzk8H0.png"></img>
    </center>
        </Grid>
        <Grid item xs={12}>
         <TrendingHomePage /> 
        </Grid>
      </Grid>
      <br/>
      {/*<hr/>
      <br/>
    <Grid container spacing={1}>
      <Grid item xs={12}>
      <Grid container spacing={3}>   
        <Grid item xs>
            <CardMedia
              className={classes.media}
              image="https://i.imgur.com/dfHVMYV.png"
              title="Splinterlands"
            />
        </Grid>
        <Grid item xs>
            <CardMedia
              className={classes.media}
              image="https://i.imgur.com/ymrzJc9.png"
              title="Market"
            />
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
              title="Market"
            />
          </Card>
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
              title="Market"
            />
          </Card>
        </Grid>
        <Grid item xs>
        <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://cdn.shopify.com/s/files/1/0065/4917/6438/products/a-man-lounges-while-smoking-weed-and-view-of-an-outdoor-rural-market-background_1200x1200.jpg?v=1536742441"
              title="Market"
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
    </Grid>  */}
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

