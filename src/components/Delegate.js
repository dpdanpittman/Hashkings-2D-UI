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
  button: {
    margin: theme.spacing(1),
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
  font: {
    fontFamily: '"Jua", sans-serif',
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
      <Typography paragraph>
      <font color="DFB17B" className={classes.font}>You have delegated enough SP for:</font></Typography>
      <b><font color="DFB17B" className={classes.font}>
      {`(${totalPlots} plot${
        totalPlots !== 1 ? "s" : ""})`}
        <br/><br/><Divider variant="middle" /><br/>
        <Typography paragraph>
        <font color="DFB17B" className={classes.font}>You can lease:</font></Typography>
       {`(${delegation.available} plot${
          delegation.available !== 1 ? "s" : ""})`}
          <br/><br/><Divider variant="middle" /><br/>
          <Typography paragraph><font color="DFB17B" className={classes.font}>Total Leased Plots: </font></Typography>
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
          className={classes.font}
        />
      </div>
      <br/>
      </b>
      </Paper>
    </div>
  );
}
