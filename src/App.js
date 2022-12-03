import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  return (
    <div className="reddit_widget__app">
      <h1>Testing</h1>
    </div>
  );
}

export default App;
