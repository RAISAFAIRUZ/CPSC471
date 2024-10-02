import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Layout from "../components/Layout";

export default function WatchlistPage() {
  const [user, setUser] = useState("null");
  const data = useLoaderData();

  useEffect(() => {
    setUser(data);
    // Get watchlist data from DB
  }, []);

  return (
    <>
      <Layout>
        <h1 className="font-black text-3xl uppercase mb-4">Watchlist</h1>
      </Layout>
    </>
  )
}