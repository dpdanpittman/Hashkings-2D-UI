import React, {Component, useState} from "react";
import {Button} from "primereact/button";
import Cookie from "js-cookie";
import {Dropdown} from "primereact/dropdown";
import {seedNames, seedTypes} from "../service/HashkingsAPI";

export class MarketSeeds extends Component {
  constructor() {
    super();
    this.state = {
      username: Cookie.get("username")
    };
  }

  render() {
    return (
      <div className="p-fluid bgimg">
        <div className="p-grid">
          <div className="p-col-8">
            <div className="card-blank card-w-title bgWeedimg">
              <h1>
                <font color="white">Welcome to the Hashkings Dispensary</font>
              </h1>
              <br />
              <h4>Hand-Picked Seeds</h4>
              <p>
                <font color="white">
                  These are the best seeds in our seed bank and come with 2250
                  XP. For 3 Steem you will be able to purchase one of these top
                  shelf seeds.
                </font>
              </p>
              <h4>Premium Seeds</h4>
              <p>
                <font color="white">
                  Looking to grow get your feet wet and find new traits with
                  these 750 XP seeds for 1.5 Steem
                </font>
              </p>
              <h4>Basic Seeds</h4>
              <p>
                <font color="white">
                  These seeds come with 1 XP and cost .75 Steem. These seeds are
                  for the casual gardner looking to earn only passive income
                  from their crops
                </font>
              </p>
            </div>
          </div>
          <div className="p-col-4" />
          <div className="p-col-3" />
          <div className="p-col-6">
            <div className="card-blank card-w-title">
              <h1>
                <font color="blue">Hand-Picked Seeds</font>
              </h1>
              <h2>
                <b>3 Steem</b>
              </h2>
              <br />
              <div className="p-grid">
                <div className="p-col-12 p-md-2">
                  <label htmlFor="multiselect" />
                </div>
                <BuySeed username={this.state.username} type="top" />
              </div>
            </div>
          </div>
          <div className="p-col-3" />
          <div className="p-col-3" />
          <div className="p-col-6">
            <div className="card-blank card-w-title">
              <h1>
                <font color="green">Premium Seeds</font>
              </h1>
              <h2>
                <b>1.5 Steem</b>
              </h2>
              <br />
              <div className="p-grid">
                <div className="p-col-12 p-md-2">
                  <label htmlFor="multiselect" />
                </div>
                <BuySeed username={this.state.username} type="mid" />
              </div>
            </div>
          </div>
          <div className="p-col-3" />
          <div className="p-col-3" />
          <div className="p-col-6">
            <div className="card-blank card-w-title">
              <h1>Basic Seeds</h1>
              <h2>
                <b>.75 Steem</b>
              </h2>
              <br />
              <div className="p-grid">
                <div className="p-col-12 p-md-2">
                  <label htmlFor="multiselect" />
                </div>
                <BuySeed username={this.state.username} type="reg" />
              </div>
            </div>
          </div>
          <div className="p-col-3" />
        </div>
      </div>
    );
  }
}

function BuySeed({type, username}) {
  const [seed, setSeed] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (seed) {
      setIsSubmitting(true);
      const steem_keychain = window.steem_keychain;
      const memo = `${type[0]}seed ${seed.id}`;
      const currency = "STEEM";
      const to = "hashkings";
      const amount = seedTypes[type].str;
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
    }
  };

  return (
    <>
      <div className="p-col-12 p-md-4">
        <Dropdown
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
