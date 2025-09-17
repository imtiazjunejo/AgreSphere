const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8">
            Join thousands of farmers using Agrisphere to optimize their operations and increase yields
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="px-8 py-4 bg-white text-green-800 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Sign Up Free
            </a>
            <a
              href="/demo"
              className="px-8 py-4 border-2 border-white font-bold rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;