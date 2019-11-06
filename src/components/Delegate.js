import React, {useState} from "react";
import {Button} from "primereact/button";
import {Spinner} from "primereact/spinner";
import {sign} from "steemconnect";
import useSteemKeychain from "../hooks/useSteemKeychain";

export default function Delegate({username, delegation, updateDelegation}) {
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();

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
          ? `${process.env.REACT_APP_URL}/market/gardenplots`
          : "http://localhost:3000/market/gardenplots"
      );
    }
  };

  return (
    <div>
      <b><font color="DFB17B">
      {`Total Delegation: ${totalPlots} plot${
        totalPlots !== 1 ? "s" : ""}`}
        <br/><br/>
       {`Plots Available: ${
        delegation.available} `}
        <br/><br/>
        {`Please choose the number of additional plots you would like to lease`}</font>
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
    </div>
  );
}
