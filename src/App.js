import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Customers from "./Components/Customers";
import Header from "./Components/Header";
import Bids from "./Components/Bids";

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://intense-tor-76305.herokuapp.com/merchants"
      );
      setCustomers(response.data);
      console.log(response.data);
      setLoading(false);
    };
    fetchCustomer();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <Header title="Customer List" />
            <Customers customers={customers} loading={loading} />
          </div>
        </Route>
        <Route path="/:id">
          <Bids />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
