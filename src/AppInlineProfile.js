import React, {useState, useContext, useEffect} from "react";
import { StateContext } from "./App";
import Chip from '@material-ui/core/Chip';
import LockOpen from '@material-ui/icons/LockOpen';
import Avatar from '@material-ui/core/Avatar';
//import FaceIcon from '@material-ui/icons/Face';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { HashkingsAPI } from "./HashkingsAPI";
import TutorialFab from "./components/TutorialFab.js"

const handleClick = () => {
  window.location = '/login';
};

const handleApparel = () => {
  //window.location = 'https://www.bonfire.com/hashkings-community-shirts/';
  window.open('https://www.bonfire.com/hashkings-community-shirts/');
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

const useStyles = makeStyles(theme => ({
font: {
  fontFamily: '"Jua", sans-serif',
},
}));

export const AppInlineProfile = () => {
  const hashkingsApi = new HashkingsAPI();
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [validatedTo, setValidatedTo] = useState();

  useEffect(() => {
    hashkingsApi.steemUserExists(username).then(username => {
      if (username) {
        setValidatedTo(username);
      } else {
        setValidatedTo();
      }
    });
  }, [username]);


  const handleDelete = () => {
    alert('Need to sign out? Please clear your cache to sign out completely.');
  };

  if (!username) {
    return (
      <div className="profile">
        <Tooltip title="Please Sign In to Begin" placement="left">
      <Chip
        icon={<LockOpen />}
        color="primary"
        label= "Not signed in"
        onClick={handleClick}
        className={classes.font}
      />
      </Tooltip>
      <Tooltip title="Visit Bonfire.com" placement="left">
      <Chip
        label= "Hoodies!"
        onClick={handleApparel}
        className={classes.font}
      />
      </Tooltip>
      <br/>
    </div>
    );
  } else {
  return (
    <div className="profile">
      <Tooltip title="Signed In" placement="bottom">
      <Chip
        icon={<Avatar className={classes.avatar}>
        {validatedTo && (
        <div>
          <img
          alt="STEEM Avatar"
          src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
          />
          </div>
          )}
        </Avatar>}
        label= {username}
        color="primary"
        onDelete={handleDelete}
        className={classes.font}
      />
      </Tooltip>
      <TutorialFab />
      <Tooltip title="Visit Bonfire.com" placement="bottom">
      <Chip
        label= "Hoodies!"
        onClick={handleApparel}
        className={classes.font}
      />
      </Tooltip>
    </div>
  );
  }
};
