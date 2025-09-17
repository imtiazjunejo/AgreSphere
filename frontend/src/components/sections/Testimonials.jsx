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
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Farmers Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of farmers who have transformed their operations with Agrisphere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
            >
              <Quote className="text-green-500 mb-4" size={24} />
              <blockquote className="text-gray-700 italic mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;