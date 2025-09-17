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
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Agrisphere Helps Farmers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions designed to maximize your farm's productivity and profitability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-all"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;