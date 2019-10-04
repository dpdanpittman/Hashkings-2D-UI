import React, {useContext} from "react";
import {StateContext} from "../App";
import GiftSeed from "./GiftSeed";
import { Redirect } from 'react-router';

export default function() {
  const {username} = useContext(StateContext);

  if (!username) {
    return (
      <Redirect to='/login'/>
    );
  } else {
    return (
      <div className="card-blank-sand-3">
        <div className="p-fluid">
          <div className="p-col-12">
              <div className="p-col-12">
            <h1><b><font color="#FFC897">This is your one stop shop for gifting and sending seeds to your friends.</font></b></h1>
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
