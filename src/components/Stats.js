import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export default function() {
  const {username} = useContext(StateContext);

  const [recentPayouts, setRecentPayouts] = useState([]);
  const [oldestId, setOldestId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [noMorePayments, setNoMorePayments] = useState(false);

  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      hashkingsApi
        .getAccountHistory(username)
        .then(({payouts, oldestId, stop}) => {
          setOldestId(oldestId);
          setRecentPayouts(payouts);

          if (stop) {
            setNoMorePayments(true);
          }
        });
    }
  }, [username]);

  function fetchMore() {
    setLoading(true);
    hashkingsApi
      .getAccountHistory(username, oldestId)
      .then(({payouts, oldestId, stop}) => {
        setOldestId(oldestId);
        setRecentPayouts([...recentPayouts, ...payouts]);

        if (stop) {
          setNoMorePayments(true);
        }

        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }

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
                <u>Stats</u>
              </b>
            </h1>
            <br />
            <p>
              Here is where you can see all of your stats such as historic
              payouts
            </p>
          </div>
          <div className="p-col-12">
            <div className="card-weedLeft card-w-title">
              <h1>
                <b>Payouts</b>
              </h1>
              <DataTable
                value={recentPayouts}
                loading={loading}
                emptyMessage="No payments found"
              >
                <Column field="timestamp" header="Date" sortable={true} />
                <Column
                  field="steem_payout"
                  header="STEEM Payout"
                  sortable={true}
                />
                <Column
                  field="sbd_payout"
                  header="SBD Payout"
                  sortable={true}
                />
                <Column
                  field="vesting_payout"
                  header="VESTS Payout"
                  sortable={true}
                />
                <Column field="block" header="Block" sortable={true} />
              </DataTable>
              <Button
                className="load-payouts"
                disabled={loading || noMorePayments}
                label={
                  noMorePayments
                    ? "No more payments"
                    : loading
                    ? "Loading More"
                    : "Load More"
                }
                onClick={fetchMore}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
