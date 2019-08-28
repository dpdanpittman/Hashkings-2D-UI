import React, {useContext, useState, useEffect} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import Delegate from "./Delegate";
import BuyGarden from "./BuyGarden";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export const MarketPlots = () => {
  const {username} = useContext(StateContext);
  const [delegation, setDelegation] = useState({used: 0, available: 0});
  const [landSupply, setLandSupply] = useState();

  const classes = useStyles();

  const hashkingsApi = new HashkingsAPI();

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

  const images = [
    {
      original: "https://i.imgur.com/F3G7OJ1.png",
      thumbnail: "https://i.imgur.com/F3G7OJ1l.png"
    },
    {
      original: "https://i.imgur.com/mEQ9DuD.png",
      thumbnail: "https://i.imgur.com/mEQ9DuDl.png"
    },
    {
      original: "https://i.imgur.com/sp1WVnQ.png",
      thumbnail: "https://i.imgur.com/sp1WVnQl.png"
    },
    {
      original: "https://i.imgur.com/HFcvuGs.png",
      thumbnail: "https://i.imgur.com/HFcvuGst.png"
    },
    {
      original: "https://i.imgur.com/46VcHyk.png",
      thumbnail: "https://i.imgur.com/46VcHykh.png"
    },
    {
      original: "https://i.imgur.com/IomdkMf.png",
      thumbnail: "https://i.imgur.com/IomdkMfl.png"
    }
  ];

  if (!username) {
    return (
      <div className="p-fluid">
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card-blank-green card-w-title">
              <h1><a href="/login"><b><u>Please sign in to see your garden</u></b></a></h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    /*material*/
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Toothbrush
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              $4.50
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
          Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the
          hall.
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Select type
        </Typography>
        <div>
          <Chip className={classes.chip} label="Extra Soft" />
          <Chip className={classes.chip} color="primary" label="Soft" />
          <Chip className={classes.chip} label="Medium" />
          <Chip className={classes.chip} label="Hard" />
        </div>
      </div>
      <div className={classes.section3}>
        <Button color="primary">Add to cart</Button>
      </div>
    <div className="p-fluid">
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card card-w-title">
            <center>
              <ImageGallery items={images} />
            </center>
          </div>
          <div className="card-blank-green card-w-title">
            <div className="p-grid">
              <h4>
                <b>
                  <font color="black">
                    Here you find our Available Plots. In order to Lease a
                    farm plot please choose the amount and region.
                  </font>
                </b>
              </h4>
              <h3>
                <font color="#C50215">IMPORTANT!</font>
                <font color="black">
                  {" "}
                  Each plot requires a 20 SP delegation.
                </font>
              </h3>
            </div>
            {/* <div className="p-col-12 p-md-2">Gardens</div> */}
            <Delegate
              username={username}
              delegation={delegation}
              updateDelegation={updateDelegation}
            />
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
                <font color="black">
                  <b>
                    Please delegate more Steem Power above to purchase a garden
                  </b>
                </font>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
