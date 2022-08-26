import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import FetchPullRequestData from "./FetchPullRequestData";
import FetchOpenPullRequestData from "./FetchOpenPullRequestData";

const repoNames = [
  'terraform-practice', 'k8s-hackathon', 'containers-and-k8s-hackathon', 'AspNetCore.Docs'
]

function App() {

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown(current => !current)
  }

  return (
    <div className="App ">

      <div className="d-flex justify-content-between" >
        <div><Button variant="primary" onClick={handleClick}>{isShown ? "Show Open Pull Requests" : "Show Historic Pull Request Activity"}</Button></div>
        {
          !isShown &&
          <div>
            <p className="p-1 mb-1 bg-success text-white border bg-opacity-50">Approved</p>
            <p className="p-1 mb-1 bg-danger text-white border bg-opacity-50">Problem</p>
            <p className="p-1 mb-1 bg-secondary text-white border bg-opacity-50">Draft</p>
          </div>
        }
      </div>
      {
        !isShown &&
        <OpenPRContent repos={repoNames} />

      }
      {
        isShown &&
        <HistoricalPRContent repos={repoNames} />
      }

    </div>
  );
}

function OpenPRContent() {
  const openPrArray = [];

  repoNames.forEach(repo => {
    openPrArray.push(<FetchOpenPullRequestData repo={repo} />)
  })
  return (
    <div>
      <h1 className="mb-8">Current Open Pull Requests</h1>
      {openPrArray}
    </div>
  )
}

function HistoricalPRContent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDate = (date) => {
    setStartDate(date);
    setEndDate(null);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const prInfo = []

  return (
    <div className="App">
      <h1 className="mb-4">Historical Pull Request Activity</h1>
      <div className="input-container">
        <div>
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDate}
          />
        </div>
        <div>
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            minDate={startDate}
            maxDate={new Date()}
            onChange={handleEndDate}
          />
        </div>
      </div>

      <div className="info">
        {
          startDate &&
          endDate &&

          //Use component that will display array of FetchPullRequestData components
          repoNames.forEach(repo => {
            prInfo.push(<FetchPullRequestData repo={repo} start={moment(startDate).format("YYYY-MM-DD")} end={moment(endDate).format("YYYY-MM-DD")} />)
          })
        }

        {/* Display the array of pull request info. */}
        {prInfo}

      </div>
    </div>
  );
}

export default App;
