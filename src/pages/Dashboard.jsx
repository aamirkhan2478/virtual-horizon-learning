import PropTypes from "prop-types";
import { useEffect } from "react";

const Dashboard = ({ title }) => {
  useEffect(() => {
    document.title = `${title} - Virtual Horizon Learning`;
  }, [title]);

  return <h1>Dashboard</h1>;
};

// props validation
Dashboard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Dashboard;
