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
      <div className="card-blank-light bg-sky">
        <div className="p-fluid">
          <div className="p-col-12">
              <div className="p-col-12">
				<img src="https://i.imgur.com/S1AblSA.png" width="250" height="100" />
            <br />
            <h1><b><font color="black">This is your one stop shop for gifting and sending seeds to your friends.</font></b></h1>
			  </div>
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
