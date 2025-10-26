import { Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Agrisphere helped me increase my soybean yield by 20% with their data-driven crop suggestions. Their weather alerts saved my crops during unexpected frost.",
      name: "Rajesh Kumar",
      location: "Punjab",
      role: "Soybean Farmer"
    },
    {
      quote: "The financial tracking tools transformed how I manage my farm operations. I can now see exactly where every rupee is going and optimize accordingly.",
      name: "Priya Patel",
      location: "Gujarat",
      role: "Organic Farmer"
    },
    {
      quote: "As a landowner, the leasing platform helped me find responsible farmers and get fair returns on my land. The transparency is unmatched.",
      name: "Amir Khan",
      location: "Maharashtra",
      role: "Landowner"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Farmers Say</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Join thousands of farmers who have transformed their operations with AgriSphere
            and discovered the power of smart farming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:-translate-y-1 group"
            >
              <div className="relative">
                <Quote className="text-green-500 mb-6 opacity-20" size={48} />
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-green-600 font-medium">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-gray-700 font-medium">Trusted by 10,000+ Farmers</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">⭐</span>
              </div>
              <span className="text-gray-700 font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">🏆</span>
              </div>
              <span className="text-gray-700 font-medium">Award-Winning Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;