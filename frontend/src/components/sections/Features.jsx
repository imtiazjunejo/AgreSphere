const Features = () => {
  const features = [
    {
      icon: '🌱',
      title: 'Crop Guidance',
      description: 'Get personalized crop suggestions based on soil, weather and market trends'
    },
    {
      icon: '📊',
      title: 'Crop Accountability',
      description: 'Track expenses, activities and profits for each crop cycle'
    },
    {
      icon: '🌦️',
      title: 'Live Weather',
      description: 'Real-time alerts and forecasts tailored to your crops'
    },
    {
      icon: '📰',
      title: 'Agri News',
      description: 'Stay updated with market rates, subsidies and policies'
    },
    {
      icon: '👨‍🌾',
      title: 'Farmer Network',
      description: 'Connect with other farmers and share knowledge'
    },
    {
      icon: '🏞️',
      title: 'Land Management',
      description: 'Find or list farmland for lease with transparent terms'
    },
    {
      icon: '📈',
      title: 'Smart Analytics',
      description: 'Visualize your farm\'s performance and growth trends'
    },
    {
      icon: '💧',
      title: 'Irrigation Advice',
      description: 'Optimize water usage with data-driven recommendations'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">AgriSphere</span> Helps Farmers
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Comprehensive solutions designed to maximize your farm's productivity and profitability
            with cutting-edge technology and data-driven insights
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-300 p-8 rounded-2xl border border-green-100 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border border-green-100">
            <span className="text-green-600 font-semibold">🚀</span>
            <span className="text-gray-700 font-medium">Join thousands of farmers already using AgriSphere</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;