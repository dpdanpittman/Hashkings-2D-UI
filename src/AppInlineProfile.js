import React, {useContext, useState} from "react";
import {StateContext} from "./App";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import LockOpen from '@material-ui/icons/LockOpen';
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
        icon={<LockOpen />}
        color="primary"
        label= "Login"
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
      />
      <br/>
    </div>
  );
  }
};
