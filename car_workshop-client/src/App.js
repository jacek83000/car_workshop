import React from "react";
import Footer from "./components/fragments/Footer";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";

import MechanicList from "./components/mechanic/MechanicList";
import MechanicDetails from "./components/mechanic/MechanicDetails";
import MechanicForm from "./components/mechanic/MechanicForm";
import MechanicDeleteInfo from "./components/mechanic/MechanicDeleteInfo";
import MechanicDeleteConfirm from "./components/mechanic/MechanicDeleteConfirm";
import CarList from "./components/car/CarList";
import CarDetails from "./components/car/CarDetails";
import CarForm from "./components/car/CarForm";
import CarDeleteInfo from "./components/car/CarDeleteInfo";
import CarDeleteConfirm from "./components/car/CarDeleteConfirm";
import RepairList from "./components/repair/RepairList";
import RepairDetails from "./components/repair/RepairDetails";
import RepairForm from "./components/repair/RepairForm";
import RepairDeleteInfo from "./components/repair/RepairDeleteInfo";
import RepairDeleteConfirm from "./components/repair/RepairDeleteConfirm";


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from "./components/other/ProtectedRoute";
import { getCurrentUser } from "./helpers/authHelper";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      prevPath: ''
    }
  }

  handleLogin = (user) => {
    localStorage.setItem("user", user)
    this.setState({ user: user })
  }

  handleLogout = () => {
    localStorage.removeItem("user");
    this.setState({ user: undefined })
  }

  componentDidMount() {
    const currentUser = getCurrentUser()
    this.setState({ user: currentUser })
  }


  render() {
    return (
      <Router>
        <div>
          <Header />,
          <Navigation handleLogout={this.handleLogout} />,
          <Switch>
            <Route exact
              path="/login"
              render={(props) => (
                <LoginForm handleLogin={this.handleLogin} />
              )}
            />
            <Route exact path="/" component={MainContent} />
            <Route exact path="/mechanics" component={MechanicList} />
            <Route exact path="/mechanics/details/:mcId" component={MechanicDetails} />
            <Route exact path="/mechanics/add" component={MechanicForm} />
            <Route exact path="/mechanics/edit/:mcId" component={MechanicForm} />
            <Route exact path="/mechanics/delete/:mcId" component={MechanicDeleteConfirm} />
            <Route exact path="/mechanics/delete/target" component={MechanicDeleteInfo} />
            <Route exact path="/" component={MainContent} />
            <Route exact path="/cars" component={CarList} />
            <Route exact path="/cars/details/:crId" component={CarDetails} />
            <Route exact path="/cars/add" component={CarForm} />
            <Route exact path="/cars/edit/:crId" component={CarForm} />
            <Route exact path="/cars/delete/:crId" component={CarDeleteConfirm} />
            <Route exact path="/cars/delete/target" component={CarDeleteInfo} />
            <ProtectedRoute exact={true} path="/repairs" component={RepairList} />
            <Route exact path="/repairs/details/:repId" component={RepairDetails} />
            <Route exact path="/repairs/add" component={RepairForm} />
            <Route exact path="/repairs/edit/:repId" component={RepairForm} />
            <Route exact path="/repairs/delete/:repId" component={RepairDeleteConfirm} />
            <Route exact path="/repairs/delete/target" component={RepairDeleteInfo} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;