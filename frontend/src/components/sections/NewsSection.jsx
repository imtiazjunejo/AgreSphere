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
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Latest Agriculture News</h2>
            <p className="text-lg text-gray-600">Stay updated with market trends and policy changes</p>
          </div>
          <a 
            href="/news"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View All News
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{item.date}</span>
                  <a 
                    href={`/news/${item.id}`}
                    className="text-green-600 hover:text-green-700 font-medium text-sm"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;