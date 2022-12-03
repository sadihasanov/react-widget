import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState();
  const [dutchUni, setDutchUni] = useState();
  const [links, setLinks] = useState();
  const [universityList, setUniversityList] = useState(universities);
  const [specificSubjects, setSpecificSubjects] = useState([]);
  const [gradDate, setGradDate] = useState(null);
  const [generalSubject, setGeneralSubject] = useState(null);
  const [specificSubject, setSpecificSubject] = useState(null);
  const [university, setUniversity] = useState(null);
  const [degreeLevel, setDegreeLevel] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setOpenModal] = useState(false);

  function Modal() {
    return (
      <div className="qualification_widget__modalBackground">
        <div
          className={`qualification_widget__modalContainer ${
            status ? null : "qualification_widget__modalContainerFailed"
          }`}
        >
          <div className="title">
            <h1>
              {status
                ? "Your university qualifies for the Dutch Orientation year permit"
                : "Your university did not qualify for Dutch Orientation year permit"}
            </h1>
          </div>
          <div className="body">
            <p>
              {status && !dutchUni
                ? "Below you can find the rankings where your university is located in the top 200"
                : dutchUni
                ? "All Dutch universities qualify for this VISA"
                : "To be certain, you could manually check the rankings"}
            </p>
          </div>
          <div className={status ? "footer" : "failedFooter"}>
            {status && !dutchUni && (
              <a href={links?.qs} target="_blank" rel="noreferrer">
                <button>Top Rankings</button>
              </a>
            )}
            {status && !dutchUni && (
              <a href={links?.th} target="_blank" rel="noreferrer">
                <button>Times Higher</button>
              </a>
            )}
            {status && !dutchUni && (
              <a href={links?.sh} target="_blank" rel="noreferrer">
                <button>Shanghai</button>
              </a>
            )}
            <a>
              <button
                onClick={() => {
                  setStatus(null);
                  setDutchUni(null);
                  setOpenModal(false);
                }}
                id="qualification_widget__cancelBtn"
              >
                Close
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    if (event.name === "grad_date") {
      const graduationDate = new Date(event.value);
      graduationDate.setFullYear(graduationDate.getFullYear() + 3);

      if (graduationDate < new Date()) {
        setError("You have to graduate in the past 3 years.");
      } else {
        setError(null);
      }
      setGradDate(event.value);
    } else if (event.name === "degree_lvl") {
      if (event.value === "Bachelor") {
        setUniversityList(dutch_universities);
        alert("Only Dutch universities qualify for Bachelor degree!");
      } else {
        setUniversityList(universities);
      }
      setDegreeLevel(event.value);
    } else if (event.name === "university") {
      setUniversity(event.value);
    } else if (event.name === "general_subject") {
      setGeneralSubject(event.value);
      setSpecificSubjects(specific_subjects[event.value]);
    } else if (event.name === "specific_subject") {
      setSpecificSubject(event.value);
    }
  };

  const checkQualification = async () => {
    if (dutch_universities.includes(university)) {
      setStatus(true);
      setDutchUni(true);
      setOpenModal(true);
    } else {
      return axios({
        method: "post",
        url: "https://squid-app-co5bx.ondigitalocean.app/technocore/api/ranking",
        data: {
          grad_date: gradDate,
          general_subject: generalSubject.toLowerCase(),
          specific_subject: specificSubject.toLowerCase(),
          university: university.toLowerCase(),
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.data["status"]) {
            setLinks({
              qs: res.data.qs,
              th: res.data.th,
              sh: res.data.sh,
            });
            setStatus(true);
            setOpenModal(true);
          } else {
            setStatus(false);
            setOpenModal(true);
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div className="qualification_widget__app">
      {modalOpen && Modal(setOpenModal)}
      <h1 className="qualification_widget__header">
        Do I qualify for the orientation year permit?
      </h1>
      <div className="qualification_widget__body">
        <div className="qualification_widget__selector">
          <label htmlFor="grad_date">Graduation Date</label>
          {error && <p className="qualification_widget__error">{error}</p>}
          <input
            className={
              error
                ? "qualification_widget__border qualification_widget__input"
                : "qualification_widget__input"
            }
            name="grad_date"
            id="grad_date"
            type="date"
            placeholder="Enter your graduation date"
            value={gradDate || ""}
            onChange={(event) => handleChange(event.target)}
          />
        </div>
        <div className="qualification_widget__selector">
          <label htmlFor="degree_lvl">Degree</label>
          <select
            className="qualification_widget__input"
            name="degree_lvl"
            id="degree_lvl"
            value={degreeLevel || "null"}
            onChange={(event) => handleChange(event.target)}
            disabled={error || !gradDate}
          >
            <option key={`degree_disabled`} value="null" disabled>
              - Select Degree -
            </option>
            {degrees.map((degree, idx) => (
              <option key={`degree_${idx}`} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
        <div className="qualification_widget__selector">
          <label htmlFor="university">University</label>
          <select
            className="qualification_widget__input"
            name="university"
            id="university"
            value={university || "null"}
            onChange={(event) => handleChange(event.target)}
            disabled={!degreeLevel || error}
          >
            <option key={`university_disabled`} value="null" disabled>
              - Select University -
            </option>
            {universityList.map((university, idx) => (
              <option key={`university_${idx}`} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>
        <div className="qualification_widget__selector">
          <label htmlFor="general_subject">Faculty</label>
          <select
            className="qualification_widget__input"
            name="general_subject"
            id="general_subject"
            value={generalSubject || "null"}
            onChange={(event) => handleChange(event.target)}
            disabled={!university || error}
          >
            <option key={`general_disabled`} value="null" disabled>
              - Select Faculty -
            </option>
            {general_subjects.map((subject, idx) => (
              <option key={`general_${idx}`} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div className="qualification_widget__selector">
          <label htmlFor="specific_subject">Program</label>
          <select
            className="qualification_widget__input"
            name="specific_subject"
            id="specific_subject"
            value={specificSubject || "null"}
            onChange={(event) => handleChange(event.target)}
            disabled={!generalSubject || error}
          >
            <option key={`specific_disabled`} value="null" disabled>
              - Select Program -
            </option>
            {specificSubjects &&
              specificSubjects.map((specificSubject, idx) => (
                <option key={`specific_${idx}`} value={specificSubject}>
                  {specificSubject}
                </option>
              ))}
          </select>
        </div>
        <button
          className="qualification_widget__button"
          disabled={
            !gradDate ||
            !degreeLevel ||
            !university ||
            !generalSubject ||
            !specificSubject
          }
          onClick={() => checkQualification()}
        >
          Check
        </button>
      </div>
    </div>
  );
}

export default App;
