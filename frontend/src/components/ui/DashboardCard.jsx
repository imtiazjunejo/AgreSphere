import PropTypes from 'prop-types';

const DashboardCard = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-xl shadow-sm flex items-center ${color}`}>
    <div className="mr-4 p-3 bg-white bg-opacity-50 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default DashboardCard;