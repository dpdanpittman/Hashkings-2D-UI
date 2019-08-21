import React from "react";
import BuySeed from "./BuySeed";

export const MarketSupplies = () => (
  <div className="p-fluid bgimg">
    <div className="p-grid">      
      <div className="p-col-4">
        <div className="card-blank-blue card-w-title">
          <h1>
            <font color="#FFC897">Nutrients</font>
          </h1>
          <h2>
            <b>150 KFQ</b>
          </h2>
          <br />
          <div className="p-grid">
            <div className="p-col-12 p-md-2">
             {<label htmlFor="multiselect" />}
            </div>
            {/*<BuySeed type="t" />*/}
          </div>
        </div>
      </div>
      <div className="p-col-4">
        <div className="card-blank-blue card-w-title">
          <h1>
            <font color="#FFC897">Soil and other Mediums</font>
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
      <div className="p-col-4">
        <div className="card-blank-blue card-w-title">
          <h1><font color="#FFC897">Tools</font></h1>
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
