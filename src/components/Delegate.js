import React, {useState} from "react";
import {Button} from "primereact/button";
import {Spinner} from "primereact/spinner";
import {sign} from "steemconnect";
import { makeStyles } from '@material-ui/core/styles';
import useSteemKeychain from "../hooks/useSteemKeychain";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
  extendedIcon: {
    marginRight: theme.spacing(1),
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
    textAlign: 'left',
    color: theme.palette.text.secondary,
    whiteSpace: 'wrap',
    marginBottom: theme.spacing(1),
    backgroundColor: "#294A0B",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  card: {
    maxWidth: 345,
    backgroundColor: "#000000",
  },
}));

export default function Delegate({username, delegation, updateDelegation}) {
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();
  
  const classes = useStyles();

  const totalPlots = delegation.used + delegation.available;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const delegatee = "hashkings";
    const newAmount = totalPlots + amount;
    const amountStr = (20 * newAmount).toString() + ".000";
    const unit = "SP";

    if (hasSteemKeychain()) {
      const steem_keychain = window.steem_keychain;
      try {
        await new Promise((resolve, reject) => {
          return steem_keychain.requestDelegation(
            [username],
            delegatee,
            amountStr,
            unit,
            response => {
              if (response.success) {
                resolve(response);
              } else {
                reject();
              }
            }
          );
        });
        updateDelegation({
          ...delegation,
          available: delegation.available + amount
        });
        setIsSubmitting(false);
      } catch {
        setIsSubmitting(false);
      }
    } else {
      window.location.href = sign(
        "delegateVestingShares",
        {
          delegator: username,
          delegatee,
          vesting_shares: `${amountStr} ${unit}`
        },
        process.env.REACT_APP_URL
          ? `${process.env.REACT_APP_URL}/market/farmplots`
          : "http://localhost:3000/market/farmplots"
      );
    }
  };

  return (
    <div>
      <Paper className={classes.paper}>
      <font color="DFB17B"><Typography paragraph>You have delegated enough SP for:</Typography></font>
      <b><font color="DFB17B">
      {`(${totalPlots} plot${
        totalPlots !== 1 ? "s" : ""})`}
        <br/><br/><Divider variant="middle" /><br/>
        <font color="DFB17B"><Typography paragraph>You can lease:</Typography></font>
       {`(${delegation.available} plot${
          delegation.available !== 1 ? "s" : ""})`}
          <br/><br/><Divider variant="middle" /><br/>
        <font color="DFB17B"><Typography paragraph>Total Leased Plots: </Typography></font>
       {`(${delegation.used} plot${
          delegation.used !== 1 ? "s" : ""})`}
        <br/><br/><Divider variant="middle" /><br/>
        {`Please choose the number of additional plots you would like.`}
          </font>
      <div className="p-col-12 p-md-4">
        <Spinner value={amount} onChange={e => setAmount(e.value)} min={1} />
      </div>
      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Delegating" : "Delegate"}
          onClick={handleSubmit}
        />
      </div>
      <br/>
      </b>
      </Paper>
    </div>
  );
}
