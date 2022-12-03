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
        <div className="reddit_widget__selector">
          <label htmlFor="degree_lvl">Degree</label>
          <select
            className="reddit_widget__input"
            name="degree_lvl"
            id="degree_lvl"
            value={""}
            onChange={() => {}}
          >
            <option key={`degree_disabled`} value="null" disabled>
              - Select Degree -
            </option>
            {["Test 1", "Test 2"].map((degree, idx) => (
              <option key={`degree_${idx}`} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
        <div className="reddit_widget__selector">
          <label htmlFor="university">University</label>
          <select
            className="reddit_widget__input"
            name="university"
            id="university"
            value={""}
            onChange={() => {}}
          >
            <option key={`university_disabled`} value="null" disabled>
              - Select University -
            </option>
            {["Test 1", "Test 2"].map((university, idx) => (
              <option key={`university_${idx}`} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>
        <div className="reddit_widget__selector">
          <label htmlFor="general_subject">Faculty</label>
          <select
            className="reddit_widget__input"
            name="general_subject"
            id="general_subject"
            value={""}
            onChange={() => {}}
          >
            <option key={`general_disabled`} value="null" disabled>
              - Select Faculty -
            </option>
            {["Test 1", "Test 2"].map((subject, idx) => (
              <option key={`general_${idx}`} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="reddit_widget__selector">
          <label htmlFor="specific_subject">Program</label>
          <select
            className="reddit_widget__input"
            name="specific_subject"
            id="specific_subject"
            value={""}
            onChange={() => {}}
          >
            <option key={`specific_disabled`} value="null" disabled>
              - Select Program -
            </option>
            {["Test 1", "Test 2"].map((specificSubject, idx) => (
              <option key={`specific_${idx}`} value={specificSubject}>
                {specificSubject}
              </option>
            ))}
          </select>
        </div>
        <button className="reddit_widget__button" onClick={() => {}}>
          Check
        </button>
      </div>
    </div>
  );
}

export default App;
