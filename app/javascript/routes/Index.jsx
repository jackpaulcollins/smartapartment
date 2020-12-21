import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Bills from "../components/Bills";
import ThingsWeNeed from "../components/ThingsWeNeed"
import ThingDetails from "../components/ThingDetails";
import NewThing from "../components/NewThing";
import NewBill from "../components/NewBill";
import BillDetails from "../components/BillDetails";

export default (
  <Router>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/bills" exact component={Bills} />
    <Route path="/bill/:id" exact component={BillDetails} />
    <Route path="/bill" exact component={NewBill} />
    <Route path="/things" exact component={ThingsWeNeed} />
    <Route path="/thing/:id" exact component={ThingDetails} />
    <Route path="/thing" exact component={NewThing} />
  </Switch>
</Router>
);