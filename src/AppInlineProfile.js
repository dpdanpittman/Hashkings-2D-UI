import React, { useContext } from "react";
import { StateContext } from "./App";
import Chip from '@material-ui/core/Chip';
import LockOpen from '@material-ui/icons/LockOpen';
import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const handleClick = () => {
  window.location = '/login';
};

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export const AppInlineProfile = () => {
  const {username} = useContext(StateContext);

  /*const handleDelete = () => {
    alert('');
  };*/

  if (!username) {
    return (
      <div className="profile">
        <Tooltip title="Please Sign In to Begin" placement="left">
      <Chip
        icon={<LockOpen />}
        color="primary"
        label= "Not signed in"
        onClick={handleClick}
      />
      </Tooltip>
      <br/>
    </div>
    );
  } else {
  return (
    <div className="profile">
      <Tooltip title="Logged In" placement="left">
      <Chip
        icon={<FaceIcon />}
        label= {username}
        color="primary"
        // onDelete={handleDelete}
      />
      </Tooltip>
      <br/>
    </div>
  );
  }
};
