import React from "react";
import CountUp from "react-countup"; // Correct import
import { useTranslation } from "react-i18next";

const DonationStats = ({ isDarkMode }) => {
  const { t } = useTranslation();
  return (
    <div className={`hero my-16 ${isDarkMode ? "bg-gray-900 text-white" : "bg-base-200 text-black"}`}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Donations</h1>
          <p className="py-6">{t("We are committed to transparency and accountability.")}</p>
          <div className="stats bg-primary text-primary-content">
            <div className="stat">
              <div className="stat-title">Total Donors</div>
              <div className="stat-value"><CountUp end={1000} duration={5} /></div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
            <div className="stat">
              <div className="stat-title">New Donations</div>
              <div className="stat-value"><CountUp end={200} duration={5} /></div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
            <div className="stat">
              <div className="stat-title">New Donors</div>
              <div className="stat-value"><CountUp end={50} duration={5} /></div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationStats;
