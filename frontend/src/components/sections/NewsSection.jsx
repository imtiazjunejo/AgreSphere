const NewsSection = () => {
  const newsItems = [
    {
      id: 1,
      title: "New Government Subsidies for Organic Farming",
      excerpt: "The agriculture ministry announced 30% subsidies for farmers transitioning to organic practices...",
      date: "May 14, 2025",
      category: "Policy",
      image: "/src/assets/images/organic-subsidy.jpg"
    },
    {
      id: 2,
      title: "Monsoon Forecast Predicts Normal Rainfall",
      excerpt: "IMD's latest forecast indicates normal monsoon patterns across most agricultural regions...",
      date: "May 12, 2025",
      category: "Weather",
      image: "src/assets/images/monsoon-forecast.jpg"
    },
    {
      id: 3,
      title: "Smart Irrigation Tech Reduces Water Usage by 40%",
      excerpt: "Case studies show farmers adopting IoT-based irrigation systems are achieving significant savings...",
      date: "May 10, 2025",
      category: "Technology",
      image: "/src/assets/images/irregation-tech.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Latest <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Agriculture News</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">Stay updated with market trends, policy changes, and farming insights</p>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl font-bold">
            📢 View All News
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-green-100 group">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                    item.category === 'Policy' ? 'bg-blue-500 text-white' :
                    item.category === 'Weather' ? 'bg-yellow-500 text-white' :
                    'bg-green-500 text-white'
                  }`}>
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2 py-1 rounded-lg">
                    {item.date}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{item.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.date}
                  </div>
                  <a
                    href={`/news/${item.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors group-hover:translate-x-1 transform duration-300"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Stay Informed</h3>
            <p className="text-gray-600 mb-8 text-lg">Get the latest agriculture news and market updates delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;