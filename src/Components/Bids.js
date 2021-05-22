import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./Bids.css";
import { Link } from "react-router-dom";

const Bids = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://intense-tor-76305.herokuapp.com/merchants?id=" + id
      );
      setBids(response.data[0].bids);
      console.log(response.data);
      setLoading(false);
    };
    fetchCustomer();
  }, [id]);

  if (loading) {
    return <h2>Loading.....</h2>;
  }
  return (
    <>
      <Header title="Bids" />
      <div className="bids">
        <div className="container grid">
          {bids.map((bid) => (
            <div className="flex" key={bid.id}>
              <div className="card">
                <p>{bid.id}</p>
                <div>
                  <h3>{bid.carTitle}</h3>
                  <p>{bid.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Bids;
