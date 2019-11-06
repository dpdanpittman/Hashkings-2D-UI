import React, {useState} from "react";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {gardenNames} from "../service/HashkingsAPI";
import useSteemKeychain from "../hooks/useSteemKeychain";
import {sign} from "steemconnect";

export default function BuyGarden({
  username,
  updateDelegation,
  delegation,
  landSupply
}) {
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
      <p>
        <b><font color="DFB17B">
            Plot leases Available: {delegation.available}
            {delegation.available === 1 ? "" : ""}</font>
        </b>
      </p>
      <div className="p-col-12 p-md-12">
        <Dropdown
          optionLabel="name"
          value={garden}
          id="name"
          options={Object.keys(gardenNames).map(key => {
            let name = gardenNames[key];
            if (landSupply) {
              name = `${name} - ${landSupply[key] - landSupply[`${key}c`]}/${
                landSupply[key]
              } left`;
            }
            return {
              id: key,
              name
            };
          })}
          style={{width: "100%"}}
          onChange={e => {
            setGarden(e.value);
          }}
          placeholder="Choose a region..."
        />
      </div>
      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Purchasing" : "Pay Lease"}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}
