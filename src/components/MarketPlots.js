import React, {useContext, useState, useEffect} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import Delegate from "./Delegate";
import BuyGarden from "./BuyGarden";
import { Redirect } from 'react-router';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import SvgIcon from '@material-ui/core/SvgIcon';

function GerminateIcon(props) {
  return (
    <SvgIcon viewBox="0 0 64 64" htmlColor="#A3711A" {...props}>
      <path d="m30 51h33v2h-33z"/>
      <path d="m1 51h3v2h-3z"/>
      <path d="m17 63c-7.72 0-14-6.28-14-14h2c0 6.617 5.383 12 12 12s12-5.383 12-12h2c0 7.72-6.28 14-14 14z"/>
      <path d="m20 59c-2.243 0-4-1.317-4-3s1.757-3 4-3 4 1.317 4 3-1.757 3-4 3zm0-4c-1.221 0-2 .592-2 1s.779 1 2 1 2-.592 2-1-.779-1-2-1z"/>
      <path d="m11 57c-1.682 0-3-1.757-3-4s1.318-4 3-4 3 1.757 3 4-1.318 4-3 4zm0-6c-.408 0-1 .779-1 2s.592 2 1 2 1-.779 1-2-.592-2-1-2z"/>
      <path d="m21 51c-1.682 0-3-1.757-3-4s1.318-4 3-4 3 1.757 3 4-1.318 4-3 4zm0-6c-.408 0-1 .779-1 2s.592 2 1 2 1-.779 1-2-.592-2-1-2z"/>
      <path d="m31 46c-3.364 0-6-1.757-6-4s2.636-4 6-4 6 1.757 6 4-2.636 4-6 4zm0-6c-2.29 0-4 1.056-4 2s1.71 2 4 2 4-1.056 4-2-1.71-2-4-2z"/>
      <path d="m41 44c-3.364 0-6-1.757-6-4s2.636-4 6-4 6 1.757 6 4-2.636 4-6 4zm0-6c-2.29 0-4 1.056-4 2s1.71 2 4 2 4-1.056 4-2-1.71-2-4-2z"/>
      <path d="m35 40h2v12h-2z"/>
      <path d="m18 15h-13c-2.206 0-4-1.794-4-4s1.794-4 4-4c0-3.309 2.691-6 6-6 2.673 0 4.93 1.725 5.697 4.18.426-.119.865-.18 1.303-.18 2.757 0 5 2.243 5 5s-2.243 5-5 5zm-13-6c-1.103 0-2 .897-2 2s.897 2 2 2h13c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.532 0-1.046.146-1.528.436-.295.178-.662.19-.97.033-.307-.157-.512-.462-.541-.806-.177-2.089-1.88-3.663-3.961-3.663-2.206 0-4 1.794-4 4 0 .298.045.612.142.991.094.368-.028.759-.317 1.007s-.692.312-1.043.161c-.249-.105-.512-.159-.782-.159z"/>
      <path d="m42 15h-13c-2.206 0-4-1.794-4-4s1.794-4 4-4c0-3.309 2.691-6 6-6 2.673 0 4.93 1.725 5.697 4.18.426-.119.865-.18 1.303-.18 2.757 0 5 2.243 5 5s-2.243 5-5 5zm-13-6c-1.103 0-2 .897-2 2s.897 2 2 2h13c1.654 0 3-1.346 3-3s-1.346-3-3-3c-.532 0-1.046.146-1.528.436-.296.178-.663.19-.97.033s-.512-.462-.541-.806c-.177-2.089-1.88-3.663-3.961-3.663-2.206 0-4 1.794-4 4 0 .298.045.612.142.991.094.368-.028.759-.317 1.007-.288.248-.692.312-1.043.161-.249-.105-.512-.159-.782-.159z"/>
      <path d="m54.256 27.686-1.256.314.314-1.256c.449-1.796 1.377-3.435 2.686-4.744 1.309-1.309 2.948-2.237 4.744-2.686l1.256-.314-.314 1.256c-.449 1.796-1.377 3.435-2.686 4.744-1.309 1.309-2.948 2.237-4.744 2.686z" fill="#669e4f"/>
      <path d="m49.744 27.686 1.256.314-.314-1.256c-.449-1.796-1.377-3.435-2.686-4.744-1.309-1.309-2.948-2.237-4.744-2.686l-1.256-.314.314 1.256c.449 1.796 1.377 3.435 2.686 4.744 1.309 1.309 2.948 2.237 4.744 2.686z" fill="#669e4f "/>
      <path d="m52.658 26.683-.658 1.317-.658-1.317c-.883-1.764-1.342-3.71-1.342-5.683 0-1.973.459-3.919 1.342-5.683l.658-1.317.658 1.317c.883 1.764 1.342 3.71 1.342 5.683 0 1.973-.459 3.919-1.342 5.683z" fill="#78b75b"/>
      <path d="m55.106 30.553-3.106-1.553 3.106-1.553c.588-.294 1.236-.447 1.894-.447.658 0 1.306.153 1.894.447l3.106 1.553-3.106 1.553c-.588.294-1.236.447-1.894.447-.658 0-1.306-.153-1.894-.447z" fill="#78b75b"/>
      <path d="m45.106 30.553-3.106-1.553 3.106-1.553c.588-.294 1.236-.447 1.894-.447.658 0 1.306.153 1.894.447l3.106 1.553-3.106 1.553c-.588.294-1.236.447-1.894.447-.658 0-1.306-.153-1.894-.447z" fill="#78b75b"/>
      <path d="m52 29c-.379 0-.725-.214-.895-.553l-.658-1.316c-.947-1.894-1.447-4.014-1.447-6.131s.5-4.237 1.447-6.131l.658-1.316c.339-.678 1.45-.678 1.789 0l.658 1.316c.948 1.894 1.448 4.014 1.448 6.131s-.5 4.237-1.447 6.131l-.658 1.316c-.17.339-.516.553-.895.553zm0-12.734c-.656 1.486-1 3.111-1 4.734s.344 3.248 1 4.734c.656-1.486 1-3.111 1-4.734s-.344-3.248-1-4.734z"/>
      <path d="m57 32c-.808 0-1.618-.191-2.341-.553l-3.105-1.553c-.34-.169-.554-.515-.554-.894s.214-.725.553-.895l3.105-1.553c1.448-.723 3.236-.723 4.683 0l3.106 1.553c.339.17.553.516.553.895s-.214.725-.553.895l-3.105 1.553c-.724.361-1.534.552-2.342.552zm-1.448-2.342c.896.447 2 .447 2.896 0l1.316-.658-1.317-.658c-.895-.447-2-.447-2.895 0l-1.316.658z"/>
      <path d="m47 32c-.808 0-1.618-.191-2.341-.553l-3.105-1.553c-.34-.169-.554-.515-.554-.894s.214-.725.553-.895l3.105-1.553c1.448-.723 3.236-.723 4.683 0l3.106 1.553c.339.17.553.516.553.895s-.214.725-.553.895l-3.105 1.553c-.724.361-1.534.552-2.342.552zm-1.448-2.342c.896.447 2 .447 2.896 0l1.316-.658-1.317-.658c-.895-.447-2-.447-2.895 0l-1.316.658z"/>
      <path d="m53 29c-.262 0-.517-.103-.707-.293-.249-.248-.348-.608-.263-.949l.314-1.256c.493-1.971 1.512-3.772 2.949-5.209 1.437-1.438 3.238-2.457 5.209-2.949l1.255-.313c.338-.086.701.014.95.263.249.248.348.608.263.949l-.314 1.256c-.493 1.971-1.512 3.772-2.949 5.209-1.437 1.438-3.238 2.457-5.208 2.948l-1.256.314c-.08.02-.162.03-.243.03zm7.614-8.614c-1.474.435-2.817 1.231-3.907 2.321-1.089 1.09-1.887 2.434-2.321 3.907 1.473-.435 2.817-1.231 3.907-2.321 1.089-1.09 1.887-2.434 2.321-3.907z"/>
      <path d="m51 29c-.081 0-.163-.01-.243-.03l-1.256-.314c-1.971-.491-3.771-1.511-5.208-2.948s-2.457-3.238-2.949-5.209l-.314-1.256c-.085-.341.015-.701.263-.949.249-.249.612-.349.95-.263l1.256.314c1.97.491 3.771 1.511 5.208 2.948s2.457 3.238 2.949 5.209l.314 1.256c.085.341-.015.701-.263.949-.19.19-.445.293-.707.293zm-7.614-8.614c.435 1.474 1.232 2.817 2.321 3.907 1.09 1.09 2.434 1.887 3.907 2.321-.435-1.474-1.232-2.817-2.321-3.907-1.09-1.09-2.434-1.887-3.907-2.321z"/>
      <path d="m51 29h2v23h-2z"/>
    </SvgIcon>
  );
  }

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "#000000",
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
  iconHover: {
    '&:hover': {
      color: "red[800]",
    },
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  extendPaper: {
    color: red[800]
  },
  flex: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  paperBlue: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#154A4A",
  },
  paperExtended: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    backgroundColor: "#000000",
  },
  paperBrown: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#532C0C",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#000000",
  },
  font: {
    fontFamily: '"Jua", sans-serif',
  },
}));

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#000000",
    color: '#DFB17B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#00211B' }, // custom color in hex 
  },
});

export const MarketPlots = () => {
  const hashkingsApi = new HashkingsAPI();
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [delegation, setDelegation] = useState({used: 0, available: 0});
  const [landSupply, setLandSupply] = useState();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (username) {
      Promise.all([
        hashkingsApi.getUserDelegation(username),
        hashkingsApi.getStats()
      ])
        .then(([delegation, stats]) => {
          if (delegation && delegation.delegator) {
            setDelegation({
              used: delegation.used,
              available: delegation.availible
            });
          }
          setLandSupply(stats.supply.land);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [username]);

  const updateDelegation = newDelegation => {
    setDelegation(newDelegation);
  };

  if (!username) {
    return (
    <Redirect to='/login'/>
    );
  }
  return (
    <Paper className={classes.paperExtended}> 
      <Paper className={classes.paperBlue}> 
      <ThemeProvider theme={theme}>
      <center>
      <Typography gutterBottom variant="h4" component="h1">
        <b><font color="#DFB17B" className={classes.font}><u>Leasing</u></font></b>
      </Typography>
      </center>
    </ThemeProvider>
    </Paper>
    <Paper className={classes.paperBlue}> 
      <Grid container spacing={1}>
        <Grid item xs={4}>
        <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error"><u>Delegate for a plot</u></Typography>
                      <em><a href="/market/seedbank">{"Get your farm plots here"}</a></em> <b>{"Each Plot requires a 20 STEEM Power delegation"}</b>
                    </React.Fragment>
                  }
                  placement="right"
                  TransitionComponent={Zoom}
                  >
    <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="delegation" className={classes.avatar}>
          <img src="https://media.giphy.com/media/26gsnOb6H9AiTNIli/giphy.gif" />
        </Avatar>
      }
    />
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/ZohrL4N.png"
      title="Mexico"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        <font color="DFB17B" className={classes.font}>
        Plot Delegation
        </font>
      </Typography>
    </CardContent>
    <hr/>
    <CardActions disableSpacing>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon 
        color="error"
        />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Delegate
              username={username}
              delegation={delegation}
              updateDelegation={updateDelegation}
            />
      <Divider variant="middle" />
      </CardContent>
    </Collapse>
  </Card>
  </HtmlTooltip>
  </Grid>

  <Grid item xs={4}>
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/TLlmPMi.png"
      title="Hashkings"
    />
  </Card>
  </Grid>

  <Grid item xs={4}>
  <HtmlTooltip
                  title={
                    <React.Fragment>
                      <Typography color="error" className={classes.font}><u>Leasing</u></Typography>
                      <em><a href="/market/seedbank">{"Claim your leased plots for 0.5 STEEM each."}</a></em><b>{" In order to claim your plots we require a small fee. Pay with STEEM below"}</b>
                    </React.Fragment>
                  }
                  placement="left"
                  TransitionComponent={Zoom}
                  >
  <Card className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="leasing" className={classes.avatar}>
          <GerminateIcon />
        </Avatar>
      }
    />
    <CardMedia
      className={classes.media}
      image="https://i.imgur.com/aDDEpiF.png"
      title="Afghanistan"
    />
    <CardContent>
    <Typography variant="body2" color="textSecondary" component="p"><font color="DFB17B" className={classes.font}>
        Leasing</font>
      </Typography>
    </CardContent>
    <hr/>
    <CardActions disableSpacing>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon 
        color="error"
        />
      </IconButton>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
            {delegation.available > 0 && (
              <BuyGarden
                username={username}
                delegation={delegation}
                updateDelegation={updateDelegation}
                landSupply={landSupply}
              />
            )}
            {delegation.available === 0 && (
              <p>
                <font color="DFB17B" className={classes.font}>
                  <b>
                    All Fees Paid. Please delegate more Steem Power to lease a plot.
                  </b>
                </font>
              </p>
            )}
      <Divider variant="middle" />
      </CardContent>
    </Collapse>
  </Card>
  </HtmlTooltip>
  </Grid>
  </Grid>
  </Paper>
  </Paper>
  );
};
