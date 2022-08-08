import React, { useEffect, useState } from "react";
import HomeIcon from "../../images/home-icon.png";
import ShuffleIcon from "../../images/shuffle-icon.png";
import DashLogo from "../../images/dash-logo.png";
import DashDetails from "./dash-details";
import { hashCode, intToRGB } from "../../utils";
import axios from "axios";
import "./dashboard.css";

function Dashboard(props) {
  const [dashData, setDashData] = useState({});
  const [shuffleData, setShuffledData] = useState({});

  useEffect(() => {
    axios
      .get("https://mocki.io/v1/bb11aecd-ba61-44b9-9e2c-beabc442d818")
      .then(function (response) {
        setDashData(JSON.stringify(response.data));
        setShuffledData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const shuffle = () => {
    let newData = shuffleData;
    newData["job_postings"] = shuffleMethod(newData.job_postings, true);
    newData["upcoming_sessions"] = shuffleMethod(newData.upcoming_sessions, false);
    const shuffledStats = shuffleMethod(Object.keys(newData["dashboard_stats"], true));
    const statsObj = Object.keys(JSON.parse(dashData)["dashboard_stats"]);
    let shuffledStatsData = {};
    shuffledStats.forEach((stat, index) => {
      shuffledStatsData = { ...shuffledStatsData, [stat]: newData?.["dashboard_stats"]?.[statsObj[index]] };
    });
    newData["dashboard_stats"] = shuffledStatsData;
    setShuffledData({ ...newData });
  };

  const shuffleMethod = (shuffleArray, isRandom) => {
    let j = shuffleArray.length - 1;
    for (let i = shuffleArray.length - 1; i >= 1; i--) {
      if (isRandom) j = Math.floor(Math.random() * (i + 1));
      else j--;
      let temp = shuffleArray[j];
      shuffleArray[j] = shuffleArray[i];
      shuffleArray[i] = temp;
    }
    return shuffleArray;
  };

  const resetShuffle = () => {
    setShuffledData(JSON.parse(dashData));
  };

  return (
    <div className="dashboard">
      {Object.keys(shuffleData).length > 0 && (
        <React.Fragment>
          <div className="profile">
            <div className="profile-section">
              <img className="dash-logo" src={DashLogo} alt="" />
              <button className="sign-out-btn" onClick={props.logOut}>
                Sign Out
              </button>
              <p className="profile-icon" onClick={resetShuffle} style={{ background: "#" + intToRGB(hashCode(shuffleData?.full_name || "a")) }}>
                {shuffleData?.full_name?.charAt(0)}
              </p>
              <p className="profile-name">{shuffleData?.full_name}</p>
            </div>
          </div>

          <br />

          <div className="dash-body">
            <ul className="side-bar-list">
              <li className="menu-list-item ">
                <span className="active-path"></span>
                <img className="img-icon" src={HomeIcon} alt="" />
                <span>Home</span>
              </li>
              <li className="menu-list-item" onClick={shuffle}>
                <img className="img-icon" src={ShuffleIcon} alt="" />
                <span>Shuffle</span>
              </li>
            </ul>

            <DashDetails dashboardData={shuffleData} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default Dashboard;
