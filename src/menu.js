import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FAQIcon from "@material-ui/icons/QuestionAnswer";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import GiftIcon from "@material-ui/icons/CardGiftcard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingBasket";
import FlowerIcon from "@material-ui/icons/LocalFlorist";
import {Divider, List} from "@material-ui/core";

const menu = (
  <>
    <List>
      <div>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Stats" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="CannaDex (Coming Soon)" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FAQIcon />
          </ListItemIcon>
          <ListItemText primary="FAQ" />
        </ListItem>
      </div>
    </List>
    <Divider />
    <List>
      <div>
        <ListSubheader inset>Ganja Farm</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <FlowerIcon />
          </ListItemIcon>
          <ListItemText primary="Farming" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GiftIcon />
          </ListItemIcon>
          <ListItemText primary="Gifting" />
        </ListItem>
      </div>
    </List>
  </>
);

export default menu;
