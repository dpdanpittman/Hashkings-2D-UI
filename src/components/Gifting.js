import React, {useContext} from "react";
import {StateContext} from "../App";
import GiftSeed from "./GiftSeed";

export default function() {
  const {username} = useContext(StateContext);

  if (!username) {
    return (
      <div className="card-blank">
        <div className="p-fluid">
          <div className="p-col-12">
            <h1>
              <b>
                <u>Please sign in to see your stats</u>
              </b>
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-blank">
        <div className="p-fluid">
          <div className="p-col-12">
            <h1>
              <b>
                <u>Gifting</u>
              </b>
            </h1>
            <br />
            <p>Here is where you can gift any steem user a seed.</p>
          </div>
          <div className="p-col-12">
            <div className="card-weedLeft card-w-title">
              <GiftSeed />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
