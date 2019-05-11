import React from "react";
import BuySeed from "./BuySeed";

export const MarketSeeds = () => (
  <div className="p-fluid bgimg">
    <div className="p-grid">
      <div className="p-col-8">
        <div className="card-blank card-w-title bgWeedimg">
          <h1>
            <font color="white">Welcome to the Hashkings Dispensary</font>
          </h1>
          <br />
          <h4 className="seed-title">Hand-Picked Seeds</h4>
          <p>
            <font color="white">
              These are the best seeds in our seed bank and come with 2250 XP.
              For 3 Steem you will be able to purchase one of these top shelf
              seeds.
            </font>
          </p>
          <h4 className="seed-title">Premium Seeds</h4>
          <p>
            <font color="white">
              Looking to grow get your feet wet and find new traits with these
              750 XP seeds for 1.5 Steem
            </font>
          </p>
          <h4 className="seed-title">Basic Seeds</h4>
          <p>
            <font color="white">
              These seeds come with 1 XP and cost .75 Steem. These seeds are for
              the casual gardner looking to earn only passive income from their
              crops
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
            <BuySeed type="top" />
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
            <BuySeed type="mid" />
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
            <BuySeed type="reg" />
          </div>
        </div>
      </div>
      <div className="p-col-3" />
    </div>
  </div>
);
