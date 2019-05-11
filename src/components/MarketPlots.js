import React, {Component, useState} from "react";
import {Button} from "primereact/button";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Cookie from "js-cookie";
import {Dropdown} from "primereact/dropdown";
import {gardenNames, HashkingsAPI} from "../service/HashkingsAPI";
import {Spinner} from "primereact/spinner";

export class MarketPlots extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      delegation: {
        used: 0,
        available: 0
      }
    };
    this.hashkingsApi = new HashkingsAPI();
  }

  async componentDidMount() {
    const username = Cookie.get("username");

    if (username) {
      this.setState({username});
      try {
        const delegation = await this.hashkingsApi.getUserDelegation(username);
        if (delegation && delegation.delegator) {
          this.setState({
            delegation: {
              used: delegation.used,
              available: delegation.availible
            }
          });
        }
      } catch {}
    }
  }

  updateDelegation = newDelegation => {
    this.setState({
      delegation: newDelegation
    });
  };

  render() {
    if (!this.state.username) {
      return (
        <div className="p-fluid">
          <div className="p-grid">
            <div className="p-col-12">
              <div className="card-blank card-w-title">
                <h1>Please sign in to see your garden</h1>
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
            <div className="card-blank card-w-title">
              <h1>Welcome to Garden Sales</h1>
              <div className="p-grid">
                <h4>
                  <b>
                    <font color="green">
                      Below you will find our Avaialable Plots. In order to
                      Lease a garden please choose how many Gardens you would
                      like then choose your favorite regions.
                    </font>
                  </b>
                </h4>
				<h3>IMPORTANT! Each plot requires a 20 SP delgation.</h3>
              </div>
              {/* <div className="p-col-12 p-md-2">Gardens</div> */}
              <Delegate
                username={this.state.username}
                delegation={this.state.delegation}
                updateDelegation={this.updateDelegation}
              />
              {this.state.delegation.available > 0 && (
                <BuyGarden
                  username={this.state.username}
                  delegation={this.state.delegation}
                  updateDelegation={this.updateDelegation}
                />
              )}
              {this.state.delegation.available === 0 && (
                <p>
                  Please delegate more Steem Power above to purchase a garden
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Delegate({username, delegation, updateDelegation}) {
  const [amount, setAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPlots = delegation.used + delegation.available;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const steem_keychain = window.steem_keychain;
    const delegatee = "hashkings";
    const newAmount = totalPlots + amount;
    const amountStr = (20 * newAmount).toString() + ".000";
    const unit = "SP";
    try {
      await new Promise((resolve, reject) => {
        return steem_keychain.requestDelegation(
          [username],
          delegatee,
          amountStr,
          unit,
          response => {
            if (response.success) {
              resolve(response);
            } else {
              reject();
            }
          }
        );
      });
      updateDelegation({
        ...delegation,
        available: delegation.available + amount
      });
      setIsSubmitting(false);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p>{`You have delegated enough Steem Power for ${totalPlots} plot${
        totalPlots !== 1 ? "s" : ""
      } and have ${
        delegation.available
      } available. Choose the number of additional plots you'd like to lease`}</p>
      <div className="p-col-12 p-md-4">
        <Spinner value={amount} onChange={e => setAmount(e.value)} min={1} />
      </div>
      <div className="p-col-12 p-md-4">
        <Button
          disabled={isSubmitting}
          label={isSubmitting ? "Delegating" : "Delegate"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

function BuyGarden({username, updateDelegation, delegation}) {
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (garden) {
      setIsSubmitting(true);
      const steem_keychain = window.steem_keychain;
      const memo = `${garden.id} manage`;
      const amount = "0.500";
      const currency = "STEEM";
      const to = "hashkings";
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
        updateDelegation({
          used: delegation.used + 1,
          available: delegation.available - 1
        });
        setIsSubmitting(false);
        setGarden();
      } catch {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <label htmlFor="seed">Purchase Garden</label>
      <p>
        You can purchase at most {delegation.available} gardens based on the
        amount of Steem Power you have delegated
      </p>
      <div className="p-col-12 p-md-4">
        <Dropdown
          optionLabel="name"
          value={garden}
          id="name"
          options={Object.keys(gardenNames).map(key => ({
            id: key,
            name: gardenNames[key]
          }))}
          style={{width: "100%"}}
          onChange={e => {
            setGarden(e.value);
          }}
          placeholder="Choose a garden..."
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
