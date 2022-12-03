import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  return (
    <div className="reddit_widget__app">
      <h1 className="reddit_widget__header">
        Do I qualify for the orientation year permit?
      </h1>
      <div className="reddit_widget__body">
        <div className="reddit_widget__selector">
          <label htmlFor="grad_date">Graduation Date</label>
          {/* {error && <p className="reddit_widget__error">{error}</p>} */}
          <input
            className={"reddit_widget__input"}
            name="grad_date"
            id="grad_date"
            type="date"
            placeholder="Enter your graduation date"
            value={""}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
