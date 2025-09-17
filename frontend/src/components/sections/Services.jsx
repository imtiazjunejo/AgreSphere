const Services = () => {
  const services = [
    {
      icon: '🧪',
      title: 'Soil Testing',
      description: 'Detailed soil analysis and nutrient recommendations to optimize your farm\'s potential',
      link: '#'
    },
    {
      icon: '🌾',
      title: 'Crop Advisory',
      description: 'Expert guidance for crop selection and management tailored to your region',
      link: '#'
    },
    {
      icon: '👨‍🏫',
      title: 'Training Workshops',
      description: 'Hands-on learning sessions for modern farming techniques and technologies',
      link: '#'
    },
    {
      icon: '💧',
      title: 'Smart Irrigation',
      description: 'Water optimization solutions to reduce waste and improve yields',
      link: '#'
    }
  ];

  return (
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Professional Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive agricultural solutions to maximize your farm's productivity and profitability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a 
                href={service.link}
                className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;