const CtaSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Transform Your <span className="block">Farming Journey?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-green-100 leading-relaxed">
            Join thousands of farmers using AgriSphere to optimize their operations,
            increase yields, and build sustainable agricultural practices
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a
              href="/signup"
              className="px-10 py-5 bg-white text-green-600 font-bold rounded-2xl hover:bg-green-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1 text-xl"
            >
              🚀 Start Farming Smart
            </a>
            <a
              href="/about"
              className="px-10 py-5 border-3 border-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-xl backdrop-blur-sm"
            >
              📖 Learn More
            </a>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Active Farmers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-green-100">Crop Logs Created</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;