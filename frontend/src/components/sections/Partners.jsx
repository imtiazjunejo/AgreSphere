const Partners = () => {
  const partners = [
    { name: "Ministry of Agriculture", logo: "/src/assets/images/partners/angro.jpg" },
    { name: "ICAR", logo: "/src/assets/images/partners/bakhtawar.jpg" },
    { name: "NABARD", logo: "/src/assets/images/partners/greenlet.jpg" },
    { name: "AgriTech Foundation", logo: "/src/assets/images/partners/farmerwalfare.jpg" },
    { name: "Farmers Welfare", logo: "/src/assets/images/partners/sona.jpg" }
  ];

  return (
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Collaborating with leading organizations to transform agriculture
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="h-16 flex items-center grayscale hover:grayscale-0 transition-all">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;