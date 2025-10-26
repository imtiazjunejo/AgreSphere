const ProfileOverview = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Activity</h2>
          <p className="text-gray-600 text-sm">Recent updates and activity</p>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">Welcome to AgriSphere!</span> Your farming journey starts here.
              </p>
              <p className="text-xs text-gray-500 mt-1">Just now</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">Profile setup completed</span> - Keep your information up to date for better connections.
              </p>
              <p className="text-xs text-gray-500 mt-1">Today</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">Explore AgriSphere features</span> - Check out crop logs, farmer network, and profit tracking.
              </p>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Show more button */}
      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Show more activity
        </button>
      </div>
    </div>
  );
};

export default ProfileOverview;