import React, {useContext} from "react";
import {StateContext} from "../App";
import GardenActions from './GardenPage/GardenActions.js';
import GrowJournal from './GardenPage/GrowJournal';
import { Parallax } from 'react-parallax';
import { makeStyles } from '@material-ui/core/styles';
import PostDialog from "./PostDialog";
 
const useStyles = makeStyles(theme => ({
root: {
  flexGrow: 1,
},
paper: {
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  whiteSpace: 'wrap',
  marginBottom: theme.spacing(3),
  backgroundColor: "Transparent",
},
}));

export const GardenPage = () => {
  const {username} = useContext(StateContext);
  const classes = useStyles();
  const isDesktop = window.innerWidth < 1000;
  
  const farmBackground = "https://i.imgur.com/C3lrbDj.png";

  if (username && !isDesktop) {
    return (
      <div className={classes.root}>
        <div className="card-blank-green-1">
        <Parallax blur={1} bgImage={farmBackground} strength={500}>
          <br/>
          <GardenActions />
          <GrowJournal />
        </Parallax>
      </div>
      </div>
    );
  } else {
    return (
      <div className="card-blank-green-1">
        <PostDialog />
        <Parallax blur={1} bgImage={farmBackground} strength={500}>
        <GardenActions />
        <GrowJournal />
        </Parallax>
    </div>
    );
  }
};
