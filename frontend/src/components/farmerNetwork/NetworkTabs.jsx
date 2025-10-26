const NetworkTabs = ({ activeTab, setActiveTab, pendingRequestsCount }) => {
  const tabs = [
    { id: 'discover', label: 'Discover Farmers', icon: '🔍' },
    { id: 'connections', label: 'My Connections', icon: '🤝' },
    { id: 'requests', label: 'Connection Requests', icon: '📨' }
  ];

  return (
    <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`relative flex items-center gap-2 px-6 py-3 font-medium whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span>{tab.icon}</span>
          {tab.label}

          {/* Notification badge for requests tab */}
          {tab.id === 'requests' && pendingRequestsCount > 0 && (
            <span className="absolute -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
              {pendingRequestsCount > 99 ? '99+' : pendingRequestsCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default NetworkTabs;
