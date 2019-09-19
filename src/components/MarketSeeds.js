import React from "react";
import BuySeed from "./BuySeed";

export const MarketSeeds = () => (
  <div className="card-blank-sand-3 p-fluid">
    <div className="p-grid">
	<div className="p-col-2" />
      <div className="p-col-8">
        <div className="card-blank-green-2 card-w-title">
          <h1>
            <font color="#FFC897">Welcome to the Hashkings Dispensary</font>
          </h1>
          <br />
          <h4 className="seed-title"><font color="#FFC897">Top-Shelf Seeds</font></h4>
          <p>
            <font color="#FFC897">
              For 3 Steem you will be able to purchase one of these top shelf
              seeds.
            </font>
          </p>
          <h4 className="seed-title"><font color="#FFC897">Premium Seeds</font></h4>
          <p>
            <font color="#FFC897">
              Looking to grow and get your feet wet and find new traits with these
              seeds for 1.5 Steem
            </font>
          </p>
          <h4 className="seed-title"><font color="#FFC897">Basic Seeds</font></h4>
          <p>
            <font color="#FFC897">
              These seeds are for the casual farmer looking to earn only passive income from their
              crops
            </font>
          </p>
        </div>
      </div>
      
      <div className="p-col-3" />
      <div className="p-col-6">
        <div className="card-blank-dark-sand-3 card-w-title">
          <center>
          <h1>
            <font color="#08636B"><b><u>Top-Shelf Seeds - 3 STEEM</u></b></font>
          </h1>
          </center>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
              <label htmlFor="multiselect" />
            </div>
            <BuySeed type="t" />
          </div>
        </div>
      </div>
      <div className="p-col-3" />
      <div className="p-col-3" />
      <div className="p-col-6">
        <div className="card-blank-dark-sand-3 card-w-title">
          <center>
          <h1>
          <font color="#08636B"><b><u>Premium Seeds - 1.5 STEEM</u></b></font>
          </h1>
          </center>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
              <label htmlFor="multiselect" />
            </div>
            <BuySeed type="m" />
          </div>
        </div>
      </div>
      <div className="p-col-3" />
      <div className="p-col-3" />
      <div className="p-col-6">
        <div className="card-blank-dark-sand-3 card-w-title">
          <center>
          <h1><font color="#08636B"><b><u>Basic Seeds - 0.75 STEEM</u></b></font></h1>
          </center>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
              <label htmlFor="multiselect" />
            </div>
            <BuySeed type="r" />
          </div>
        </div>
      </div>
      <div className="p-col-3" />
    </div>
  </div>
);
