import React from "react";
import { gardenNames, seedNames } from "../../service/HashkingsAPI";
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import _ from "lodash";
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { FarmIcon, SeedIcon } from '../Icons';

const useStyles = makeStyles(theme => ({
  flex: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginTop: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
  },
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#073232",
  },
  media: {
    height: 140,
  },
  paperFarming: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#073232",
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
    backgroundColor: '#000000',
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function Inventory({user}) {
  const classes = useStyles();
  
  return (
  <div className={classes.flex}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Box boxShadow={12}>
        <Paper className={classes.paperFarming}>
          <ThemeProvider theme={theme}>
            <Typography gutterBottom variant="h5" component="h1">
              <b><font color="DFB17B" className={classes.font}>Inventory</font></b>
            </Typography>
          </ThemeProvider>
        </Paper>
        </Box>
      </Grid>
      <Grid item xs>
      <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Active Plots</u></Typography>
                      <em><a href="/market/seedbank">{"Farm plots which are currently earning"}</a></em> <b>{"Do you need another Plot?  Visit the Market!"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
                     <Box boxShadow={12}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/vAUGcFV.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <center><font color="DFB17B" className={classes.font}>Active Plots</font></center>
          </Typography>
          <hr/>
          {_.uniqBy(user.activeGardens, garden => garden.id[0])
            .map(garden => ({
              id: garden.id[0],
              count: user.activeGardens.filter(
                agarden => agarden.id[0] === garden.id[0]
              ).length
            }))
            .map(garden => (
              <b><font color="B28D43" className={classes.font}><p key={garden.id}>
                <Badge className={classes.margin} badgeContent={garden.count} color="primary">
                  <FarmIcon  />
                </Badge>
                    {gardenNames[garden.id]}
                {garden.count !== 1 ? "" : ""}
              </p></font></b>
            ))}
        </CardContent>
      </Card>
      </Box>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Available Plots</u></Typography>
                      <em><a href="/market/seedbank">{"These plots are ready to go!"}</a></em> <b>{"Do you have extra Seeds?  These plots are available to be farmed."}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
                    <Box boxShadow={12}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/x1eOPYj.png"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Plots</font>
          </Typography>
          <hr/>
          {_.uniqBy(user.availableGardens, garden => garden[0])
            .map(garden => ({
              id: garden[0],
              count: user.availableGardens.filter(
                agarden => agarden[0] === garden[0]
              ).length
            }))
            .map(garden => (
              <b><p key={garden.id}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={garden.count} color="error">
                  <FarmIcon  />
                </Badge>
                 {gardenNames[garden.id]}
                {garden.count !== 1 ? "s" : ""}</font>
              </p></b> 
            ))}
        </CardContent>
      </Card>
      </Box>
      </HtmlTooltip>
    </Grid>
    <Grid item xs>
    <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Available Seeds</u></Typography>
                      <em><a href="/market/seedbank">{"Total number of available seeds you own"}</a></em> <b>{"Plant them on an extra plot or trade them above!"}</b>
                    </React.Fragment>
                  }
                  TransitionComponent={Zoom}
                  >
                    <Box boxShadow={12}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://d3atagt0rnqk7k.cloudfront.net/wp-content/uploads/2016/04/29195549/cannabis-seeds-101-all-you-need-to-know-and-more.jpg"
        />
        <CardContent className={classes.font}>
          <Typography gutterBottom variant="h5" component="h2">
          <font color="DFB17B" className={classes.font}>Available Seeds</font>
          </Typography>
          <hr/>
          {_.uniqBy(user.availableSeeds, seed => seed.strain)
            .map(seed => ({
              strain: seed.strain,
              count: user.availableSeeds.filter(
                aseed => aseed.strain === seed.strain
              ).length
            }))
            .map(seed => (
              <p key={seed.strain}><font color="B28D43" className={classes.font}>
                <Badge className={classes.margin} badgeContent={seed.count} color="primary">
                  <SeedIcon  />
                </Badge>
                 {seedNames[seed.strain]}
                {seed.count !== 1 ? "s" : ""}</font>
              </p>
            ))}
        </CardContent>
      </Card>
      </Box>
      </HtmlTooltip>
    </Grid>
    </Grid>
    </div>
  );
}
