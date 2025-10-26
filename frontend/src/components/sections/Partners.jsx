const Partners = () => {
  const partners = [
    { name: "Ministry of Agriculture", logo: "/src/assets/images/partners/angro.jpg" },
    { name: "ICAR", logo: "/src/assets/images/partners/bakhtawar.jpg" },
    { name: "NABARD", logo: "/src/assets/images/partners/greenlet.jpg" },
    { name: "AgriTech Foundation", logo: "/src/assets/images/partners/farmerwalfare.jpg" },
    { name: "Farmers Welfare", logo: "/src/assets/images/partners/sona.jpg" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Trusted Partners</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Collaborating with leading organizations and institutions to transform agriculture
            and empower farmers across the nation
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {partners.map((partner, index) => (
              <div key={index} className="group h-20 flex items-center transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-xl p-4 shadow-md group-hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-green-200">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Become a Partner</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join our network of partners working together to revolutionize agriculture and support farmers nationwide
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-white/25">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;