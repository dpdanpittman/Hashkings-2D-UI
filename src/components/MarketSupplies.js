import React from "react";
import BuySeed from "./BuySeed";

export const MarketSupplies = () => (
  <div className="p-fluid bgimg">
    <div className="p-grid">
	<div className="p-col-2" />
      <div className="p-col-8">
        <div className="card-blank-red card-w-title bgWeedimg">
          <h1>
            <font color="white">Welcome to the Hashkings Grow Shop</font>
          </h1>
          <br />
          <h4 className="seed-title">Nutrients and Supplies</h4>
          <p>
            <font color="white">
              Organic Nutrients, 
              Other Nutrients,
              PH Kits,
              Cal/Mag
            </font>
          </p>
          <h4 className="seed-title">Soil and Other Mediums</h4>
          <p>
            <font color="white">
              Organic Mix,
              Perlite,
              Coco
            </font>
          </p>
          <h4 className="seed-title">Tools</h4>
          <p>
            <font color="white">
              Spade,
              Sheers,
              Shovel,
              Cages
            </font>
          </p>
        </div>
      </div>
      
      <div className="p-col-3" />
      <div className="p-col-6">
        <div className="card-blank-red card-w-title">
          <h1>
            <font color="blue">Nutrients</font>
          </h1>
          <h2>
            <b>150 KFQ</b>
          </h2>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
             {/* <label htmlFor="multiselect" />*/}
            </div>
            {/*<BuySeed type="t" />*/}
          </div>
        </div>
      </div>
      <div className="p-col-3" />
      <div className="p-col-3" />
      <div className="p-col-6">
        <div className="card-blank-red card-w-title">
          <h1>
            <font color="black">Soil and other Mediums</font>
          </h1>
          <h2>
            <b>100 KFQ</b>
          </h2>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
              {/*<label htmlFor="multiselect" />*/}
            </div>
            {/*<BuySeed type="m" />*/}
          </div>
        </div>
      </div>
      <div className="p-col-3" />
      <div className="p-col-3" />
      <div className="p-col-6">
        <div className="card-blank-light card-w-title">
          <h1><font color="black">Tools</font></h1>
          <h2>
            <b>500 KFQ</b>
          </h2>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
              {/*<label htmlFor="multiselect" />*/}
            </div>
            {/*<BuySeed type="r" />*/}
          </div>
        </div>
      </div>
      <div className="p-col-3" />
    </div>
  </div>
);
