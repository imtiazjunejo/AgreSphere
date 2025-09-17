import { MessageCircle, Heart, Share2, UserPlus } from 'lucide-react';

const FarmerNetwork = () => {
  const posts = [
    {
      id: 1,
      user: 'Rajesh Patel',
      role: 'Rice Farmer (Punjab)',
      avatar: '/images/avatars/rajesh.jpg',
      content: 'Has anyone tried the new organic pest control from AgriSolutions? Looking for reviews before purchasing.',
      likes: 12,
      comments: 5,
      time: '2 hours ago'
    },
    {
      id: 2,
      user: 'Priya Sharma',
      role: 'Vegetable Grower (Maharashtra)',
      avatar: '/images/avatars/priya.jpg',
      content: 'Sharing my success with drip irrigation - increased yield by 30% while using 40% less water!',
      likes: 28,
      comments: 14,
      time: '1 day ago'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Farmer Network</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
          <MessageCircle className="mr-2" size={18} />
          New Post
        </button>
      </div>

      {/* Post Creation */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg">
        <textarea 
          className="w-full p-3 border-b border-gray-200 focus:outline-none focus:border-green-500"
          placeholder="Share your farming tips or ask a question..."
          rows={3}
        />
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start mb-4">
              <img 
                src={post.avatar} 
                alt={post.user} 
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <h4 className="font-semibold">{post.user}</h4>
                <p className="text-sm text-gray-500">{post.role}</p>
              </div>
              <span className="ml-auto text-sm text-gray-400">{post.time}</span>
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center text-gray-500 space-x-4">
              <button className="flex items-center hover:text-red-500">
                <Heart className="mr-1" size={18} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center hover:text-green-600">
                <MessageCircle className="mr-1" size={18} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center hover:text-blue-500">
                <Share2 className="mr-1" size={18} />
                <span>Share</span>
              </button>
              <button className="ml-auto flex items-center text-green-600 hover:text-green-700">
                <UserPlus className="mr-1" size={18} />
                <span>Follow</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerNetwork;