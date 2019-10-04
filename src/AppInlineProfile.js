import React, {useContext, useState} from "react";
import {StateContext} from "./App";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import VpnKey from '@material-ui/icons/VpnKey';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const handleClick = () => {
  window.location = '/login';
};

export const AppInlineProfile = () => {
  const {username} = useContext(StateContext);

  const handleDelete = () => {
    alert('Logout Under Construction. Please clear your browser cookies to logout completely!');
  };

  if (!username) {
    return (
      <div className="profile">
      <Chip
        icon={<VpnKey />}
        label= "Login"
        color="primary"
        onClick={handleClick}
      />
      <br/>
    </div>
    );
  } else {
  return (
    <div className="profile">
      <Chip
        icon={<FaceIcon />}
        label= {username}
        color="primary"
        onDelete={handleDelete}
        username = ""
      />
      <br/>
    </div>
  );
  }
};
