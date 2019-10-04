import React, {useContext, useState, useEffect} from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import Delegate from "./Delegate";
import BuyGarden from "./BuyGarden";
import { Redirect } from 'react-router';

export const MarketPlots = () => {
  const {username} = useContext(StateContext);
  const [delegation, setDelegation] = useState({used: 0, available: 0});
  const [landSupply, setLandSupply] = useState();

  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      Promise.all([
        hashkingsApi.getUserDelegation(username),
        hashkingsApi.getStats()
      ])
        .then(([delegation, stats]) => {
          if (delegation && delegation.delegator) {
            setDelegation({
              used: delegation.used,
              available: delegation.availible
            });
          }
          setLandSupply(stats.supply.land);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [username]);

  const updateDelegation = newDelegation => {
    setDelegation(newDelegation);
  };

  if (!username) {
    return (
    <Redirect to='/login'/>
    );
  }
  return (
    <div className="p-fluid">
      <div className="p-grid">
        <div className="p-col-12 card-blank-sand-3">
          <center><h1><b>Welcome To Our Leasing Services</b></h1></center>
          <br/>
          <div className="p-col-12 card-blank-sand-3 card-w-title">
          <div className="p-col-3" />
            <div className="p-grid p-col-6">
            <hr/>
              <h3><center>
                <font color="#C50215">IMPORTANT!</font>
                <font color="DFB17B">
                  {" "}
                  Each plot requires a 20 SP delegation.
                </font>
                </center>
              </h3>
              <hr/>
            </div>
            <div className="p-col-3" />
            <br/>
            <br/>
            <br/>
            {/* <div className="p-col-12 p-md-2">Gardens</div> */}
            <Delegate
              username={username}
              delegation={delegation}
              updateDelegation={updateDelegation}
            />
            {delegation.available > 0 && (
              <BuyGarden
                username={username}
                delegation={delegation}
                updateDelegation={updateDelegation}
                landSupply={landSupply}
              />
            )}
            {delegation.available === 0 && (
              <p>
                <font color="DFB17B">
                  <b>
                    Please delegate more Steem Power above to purchase a garden
                  </b>
                </font>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
