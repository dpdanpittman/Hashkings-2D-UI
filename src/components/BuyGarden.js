import React, {useState} from "react";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {gardenNames} from "../service/HashkingsAPI";
import useSteemKeychain from "../hooks/useSteemKeychain";
import {sign} from "steemconnect";

export default function BuyGarden({username, updateDelegation, delegation}) {
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();

  const handleSubmit = async e => {
    e.preventDefault();
    if (garden) {
      setIsSubmitting(true);
      const memo = `${garden.id} manage`;
      const amount = "0.500";
      const currency = "STEEM";
      const to = "hashkings";

      if (hasSteemKeychain()) {
        const steem_keychain = window.steem_keychain;
        try {
          await new Promise((resolve, reject) => {
            return steem_keychain.requestTransfer(
              username,
              to,
              amount,
              memo,
              currency,
              response => {
                if (response.success) {
                  resolve(response);
                } else {
                  reject();
                }
              },
              true
            );
          });
          updateDelegation({
            used: delegation.used + 1,
            available: delegation.available - 1
          });
          setIsSubmitting(false);
          setGarden();
        } catch {
          setIsSubmitting(false);
        }
      } else {
        window.location.href = sign(
          "transfer",
          {
            to,
            from: username,
            amount: `${amount} ${currency}`,
            memo
          },
          process.env.REACT_APP_URL
            ? `${process.env.REACT_APP_URL}/market/gardenplots`
            : "http://localhost:3000/market/gardenplots"
        );
      }
    }
  };

  return (
    <>
      <label htmlFor="seed">Purchase Garden</label>
      <p>
        You can purchase at most {delegation.available} garden
        {delegation.available === 1 ? "" : "s"} based on the amount of Steem
        Power you have delegated
      </p>
      <div className="p-col-12 p-md-4">
        <Dropdown
          optionLabel="name"
          value={garden}
          id="name"
          options={Object.keys(gardenNames).map(key => ({
            id: key,
            name: gardenNames[key]
          }))}
          style={{width: "100%"}}
          onChange={e => {
            setGarden(e.value);
          }}
          placeholder="Choose a garden..."
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Purchasing" : "Purchase"}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
