import React, {useContext, useState, useEffect} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import Delegate from "./Delegate";
import BuyGarden from "./BuyGarden";

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
      <div className="p-fluid">
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card-blank-green card-w-title">
              <h1><a href="/login"><b><u>Please sign in to see your garden</u></b></a></h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const images = [
    {
      original: "https://i.imgur.com/F3G7OJ1.png",
      thumbnail: "https://i.imgur.com/F3G7OJ1l.png"
    },
    {
      original: "https://i.imgur.com/mEQ9DuD.png",
      thumbnail: "https://i.imgur.com/mEQ9DuDl.png"
    },
    {
      original: "https://i.imgur.com/sp1WVnQ.png",
      thumbnail: "https://i.imgur.com/sp1WVnQl.png"
    },
    {
      original: "https://i.imgur.com/HFcvuGs.png",
      thumbnail: "https://i.imgur.com/HFcvuGst.png"
    },
    {
      original: "https://i.imgur.com/46VcHyk.png",
      thumbnail: "https://i.imgur.com/46VcHykh.png"
    },
    {
      original: "https://i.imgur.com/IomdkMf.png",
      thumbnail: "https://i.imgur.com/IomdkMfl.png"
    }
  ];
  return (
    <div className="p-fluid">
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card card-w-title">
            <center>
              <ImageGallery items={images} />
            </center>
          </div>
          <div className="card-blank-sand-3 card-w-title">
            <div className="p-grid">
              <h3>
                <font color="#C50215">IMPORTANT!</font>
                <font color="DFB17B">
                  {" "}
                  Each plot requires a 20 SP delegation.
                </font>
              </h3>
            </div>
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
