import React, {useContext} from "react";
import { Redirect } from 'react-router';
import {StateContext} from "../App";
import Divider from '@material-ui/core/Divider';
import EconomyDashboard from './GardenPage/EconomyDashboard'
import GardenActions from './GardenPage/GardenActions.js';
import GrowJournal from './GardenPage/GrowJournal';
 
export const GardenPage = () => {
  const {username} = useContext(StateContext);
  
  if (username) {
    return (
      <div className="card-blank-green-1">
      <Divider />
      <GardenActions />
      <GrowJournal />
      <EconomyDashboard />
      </div>
    );
  } else {
    return (
    <Redirect to='/login'/>
    );
  }
};
