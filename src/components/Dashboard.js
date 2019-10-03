import React, {useContext, useEffect, useState} from "react";
import { HashkingsAPI, gardenNames } from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import _ from "lodash";

export const Dashboard = ({user}) => {
  const {username} = useContext(StateContext);
  const [dashboardStats, setDashboardStats] = useState({
    gardeners: 0,
    gardens: 0,
    availableSeeds: 0,
    activeGardens: 0,
    availableGardens: 0,
    activity: [],
    delegation: 0,
    leaderboard: []
  });

  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    hashkingsApi
      .getDashboardStats(username)
      .then(stats => {
        if (username) {
          setDashboardStats(stats);
        } else {
          setDashboardStats({
            ...dashboardStats,
            ...stats
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [username]);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
    },
    iconHover: {
      '&:hover': {
        color: red[800],
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
      backgroundColor: "#2E5B71",
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    margin: {
      margin: theme.spacing(2),
    },
    padding: {
      padding: theme.spacing(0, 2),
    },
    card: {
      maxWidth: 345,
      backgroundColor: "#217E6E",
    },
    media: {
      height: 140,
    },
  }));
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-grid p-fluid dashboard card-blank-black">
      <div className={classes.flex}>
      <Paper className={classes.paper}>
      <Grid container spacing={3}>
      <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://i.imgur.com/ZI9lEAQ.jpg"
        />
        <CardContent>
          <center>
          <Typography gutterBottom variant="h5" component="h1">
            <u><b>Farmers</b></u>
          </Typography>
          <Typography variant="h5" color="textSecondary" component="h2">
          <b>{dashboardStats.gardeners}</b>
          </Typography>
          </center>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://www.usnews.com/dims4/USNEWS/ae50a20/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2F25%2Fb1%2F8a19e6c940ddb4674c711f9e42c9%2F181204-hemp-editorial.jpg"
        />
        <CardContent>
          <center>
          <Typography gutterBottom variant="h5" component="h1">
            <u><b>Farms</b></u>
          </Typography>
          <Typography variant="h5" color="textSecondary" component="h2">
          <b>{dashboardStats.gardens}</b>
          </Typography>
          </center>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="https://www.moneycrashers.com/wp-content/uploads/2019/04/gross-domestic-product-definition-1068x713.jpg"
        />
        <CardContent>
          <center>
          <Typography gutterBottom variant="h5" component="h1">
            <u><b>Economy</b></u>
          </Typography>
          <Typography variant="h5" color="textSecondary" component="h2">
          <b>{dashboardStats.delegation} SP</b>
          </Typography>
          </center>
        </CardContent>
      </Card>
    </Grid>
    </Grid>
    </Paper>
    </div>
      {username && (
        <>
        <div className="p-col-12 p-lg-12 card-blank-green-1">
          <DataTable
          value={dashboardStats.leaderboard}
          responsive={true}
          emptyMessage="No users found"
          header="Top Farmers"
          autoLayout={true}
          >
            <Column field="position" header="Position" sortable={true} />
            <Column field="username" header="Farmer" sortable={true} />
            <Column field="xp" header="XP" sortable={true} />
            </DataTable>
        </div>
      </>
      )}
    </div>
  );
};
