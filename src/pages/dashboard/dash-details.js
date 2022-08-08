import React from "react";
import RightArrow from "../../images/right-arrow.png";
import { hashCode, intToRGB } from "../../utils";

function DashDetails(props) {
  const { dashboardData } = props;
  return (
    <div className="dash-data">
      <div className="overview dash-sections">
        <p className="dash-header">Overview</p>
        <div className="overview-details">
          {Object.keys(dashboardData?.dashboard_stats).map((data, index) => {
            const dashStats = data.split("_");
            const statsName = dashStats[0].charAt(0).toUpperCase() + dashStats[0].substring(1) + " " + dashStats[1].charAt(0).toUpperCase() + dashStats[1].substring(1);
            return (
              <div className="overview-data" key={data + index}>
                <div className="overview-stats">
                  {statsName} <span className="stat-value">{dashboardData.dashboard_stats[data]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="upcoming-session dash-sections">
        <p className="dash-header">Upcoming Session</p>
        {dashboardData?.upcoming_sessions.map((sessionData, index) => {
          return (
            <div className="session-job-data" key={sessionData["mentor_name"] + index}>
              <div className="session-job-role">
                <p className="profile-icon session-job-icon" style={{ background: "#" + intToRGB(hashCode(sessionData["mentor_name"])) }}>
                  {sessionData["mentor_name"].charAt(0)}
                </p>
                <p className="mentor-posting-name role">{sessionData["mentor_name"]}</p>
              </div>
              <p className="session-time">
                {sessionData["timings"]}
                <span className="session-date">{sessionData["date"]}</span>
              </p>
              <p>
                <span className={`${sessionData["session_type"] === "Mentorship" ? "mentor-session" : "review-session"}`}>{sessionData["session_type"]}</span>
              </p>

              <img className="right-arrow" src={RightArrow} alt="" />
            </div>
          );
        })}
      </div>

      <div className="job-postings dash-sections">
        <p className="dash-header">Job Postings</p>
        {dashboardData?.job_postings.map((jobPosting, index) => {
          return (
            <div className="session-job-data job-posting-details" key={jobPosting["role"] + index}>
              <div className="session-job-role">
                <p className="profile-icon session-job-icon job-role-icon" style={{ background: "#" + intToRGB(hashCode(jobPosting["role"])) }}>
                  {jobPosting["role"].charAt(0)}
                </p>
                <p className="mentor-posting-name">
                  <span className="role">{jobPosting["role"]}</span>
                  <span>{jobPosting["organization_name"]}</span>
                  <span>{jobPosting["location"]}</span>
                </p>
              </div>
              <div className="job-action">
                <p>{jobPosting["date_posted"]}</p>
                <img className="right-arrow" src={RightArrow} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashDetails;
