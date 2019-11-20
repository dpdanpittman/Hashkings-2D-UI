import React, {useContext, useState} from "react";
import Button from '@material-ui/core/Button';
import {Dropdown} from "primereact/dropdown";
import {seedNames, seedTypes} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {sign} from "steemconnect";
import useSteemKeychain from "../hooks/useSteemKeychain";
//import Menu from '@material-ui/core/Menu';
//import MenuItem from '@material-ui/core/MenuItem';
//import Fade from '@material-ui/core/Fade';

export default function BuySeed({type}) {
  const {username} = useContext(StateContext);
  //const [anchorEl, setAnchorEl] = React.useState(null);
  //const open = Boolean(anchorEl);
  const [seed, setSeed] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSteemKeychain = useSteemKeychain();

  /*const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };*/

  const handleSubmit = async e => {
    e.preventDefault();
    if (seed && username) {
      setIsSubmitting(true);

      const memo = `${type}seed ${seed.id}`;
      const to = "hashkings";
      const amount = seedTypes[type].str;
      const currency = "STEEM";

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
          setIsSubmitting(false);
          setSeed();
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
            ? `${process.env.REACT_APP_URL}/market/seedbank`
            : "http://localhost:3000/market/seedbank"
        );
      }
    }
  };

  let buttonLabel = "Purchase";
  if (isSubmitting) buttonLabel = "Purchasing";
  if (!username) buttonLabel = "Please Sign in";

  return (
    <>
      <div className="p-col-12 p-md-12">
        <Dropdown
          disabled={isSubmitting || !username}
          optionLabel="name"
          value={seed}
          id="name"
          options={Object.keys(seedNames).map(key => ({
            id: key,
            name: seedNames[key]
          }))}
          style={{width: "100%"}}
          onChange={e => {
            setSeed(e.value);
          }}
          placeholder="Choose a seed..."

        />
      </div>
      <div className="p-col-12 p-md-12">
        <Button
          disabled={isSubmitting || !username}
          label={buttonLabel}
          onClick={handleSubmit}
        />
      </div>
      {/*<div className="p-col-12 p-md-12">
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick} >
        Purchase
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleSubmit}>{Object.keys(seedNames).map(key => ({
            id: key,
            name: seedNames[key]
          }))}</MenuItem>
      </Menu>
    </div>*/}
    </>
  );
}
