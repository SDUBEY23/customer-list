import { useState, useEffect } from "react";
import axios from "axios";
import Customers from "./Components/Customers";
import Header from "./Components/Header";

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage] = useState(10);

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
    <div className="App">
      <Header />
      <Customers customers={customers} loading={loading} />
    </div>
  );
}

export default App;
