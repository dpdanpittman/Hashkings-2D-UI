import React, {useContext, useState, useRef, useEffect} from "react";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {seedNames, HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {InputText} from "primereact/inputtext";
import {Growl} from "primereact/growl";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function GiftSeed() {
  const classes = useStyles();
  const {username} = useContext(StateContext);
  const [seed, setSeed] = useState();
  const [to, setTo] = useState("");
  const [validatedTo, setValidatedTo] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {steemConnectAPI} = useContext(StateContext);
  const growl = useRef(null);

  const [userSeeds, setUserSeeds] = useState([]);
  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    hashkingsApi.getUserGarden(username).then(garden => {
      setUserSeeds(garden.availableSeeds);
    });
  }, [username]);

  const gifted = error => {
    if (error) {
      growl.current.show({
        severity: "error",
        summary: "Sorry, something went wrong",
        detail: "Please try again"
      });
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    hashkingsApi.steemUserExists(to).then(username => {
      if (username && username === to) {
        setValidatedTo(username);
      } else {
        setValidatedTo();
      }
    });
  }, [to]);

  const handleSubmit = async () => {
    if (validatedTo && username && seed) {
      setIsSubmitting(true);

      const custom_json_id = "qwoyn_give_seed";
      const custom_JSON = JSON.stringify({
        to: validatedTo,
        seed: seed.strain,
        qual: seed.xp
      });

      steemConnectAPI.customJson(
        [],
        [username],
        custom_json_id,
        custom_JSON,
        gifted
      );
    }
  };

  let buttonLabel = "Gift";
  if (isSubmitting) buttonLabel = "Gifting";
  if (!username) buttonLabel = "Login to gift";

  return (
    <>
      <Growl ref={growl} />
      <div className="p-col-12">
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Gift Seeds</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
<InputText
  className="form-input"
  value={to}
  onChange={e => setTo(e.target.value.trim())}
  placeholder="STEEM user to send to"
/>
</ExpansionPanelDetails>
<ExpansionPanelDetails>
{validatedTo && (
  <div>
    <h2>{validatedTo}</h2>
    <img
      alt="avatar"
      src={`https://steemitimages.com/u/${validatedTo}/avatar/small`}
    />
  </div>
)}
</ExpansionPanelDetails>
<ExpansionPanelDetails>
<Dropdown
  className="form-input"
  disabled={isSubmitting || !username}
  optionLabel="name"
  value={seed}
  id="name"
  options={userSeeds.map(seed => ({
    ...seed,
    name: `${seedNames[seed.strain]} - ${seed.xp} XP`
  }))}
  style={{width: "100%"}}
  onChange={e => {
    setSeed(e.value);
  }}
  placeholder="Choose a seed..."
/>
</ExpansionPanelDetails>
<ExpansionPanelDetails>
        <Button
          disabled={isSubmitting || !username || !validatedTo | !seed}
          label={buttonLabel}
          onClick={handleSubmit}
        />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    </>
  );
}
