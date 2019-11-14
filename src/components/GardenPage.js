import React, {useContext, useState, useEffect} from "react";
import { Redirect } from 'react-router';
import {StateContext} from "../App";
import Divider from '@material-ui/core/Divider';
import CustomizedDialogs from './DialogPage';
import EconomyDashboard from './EconomyDashboard'
import GrowJournal from './GrowJournal';
import Trading from './Trading';
import DumbDivider from './DumbDivider.js';
import GardenActions from './GardenActions.js';
 
export const GardenPage = () => {
  const {username} = useContext(StateContext);if (username) {
    return (
      <div className="card-blank-green-1">
      <CustomizedDialogs />
      <EconomyDashboard />
      <Divider />
      <GrowJournal />
      <DumbDivider />
      <Trading />
      <GardenActions />
      </div>
    );
  } else {
    return (
    <Redirect to='/login'/>
    );
  }
};
