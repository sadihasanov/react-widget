import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  return (
    <div className="qualification-widget__app">
      <h1>Testing Number 2</h1>
    </div>
  );
}

export default App;
