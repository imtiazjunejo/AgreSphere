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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Professional Services</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Comprehensive agricultural solutions to maximize your farm's productivity and profitability
            with expert guidance and cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <a
                href={service.link}
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group-hover:translate-x-1 transform duration-300"
              >
                Learn more
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Farm?</h3>
            <p className="text-green-100 mb-6 text-lg">Join thousands of farmers who have increased their productivity with AgriSphere</p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;