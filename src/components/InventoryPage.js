import React, {useEffect, useState, useContext} from "react";
import Inventory from "./Inventory";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";

export default function InventoryPage() {
  const {username} = useContext(StateContext);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: []
  });

  const hashkingsAPI = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      hashkingsAPI.getUserGarden(username).then(garden => {
        const {headBlockNum: _, ...user} = garden;
        setUser(user);
      });
    }
  }, [username]);

  return (
    <div className="card-blank">
      <div className="p-fluid">
        <div className="p-col-12">
          <h1>
            <b>
              <u>Inventory</u>
            </b>
          </h1>
        </div>
      </div>
      <div className="p-col-12">
        <div className="card-weedLeft card-w-title">
          <Inventory user={user} />
        </div>
      </div>
    </div>
  );
}
