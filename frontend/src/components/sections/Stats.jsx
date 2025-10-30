const Stats = () => {
  const stats = [
    { value: "10,000+", label: "Farmers Empowered" },
    { value: "45%", label: "Average Yield Increase" },
    { value: "300+", label: "Villages Covered" },
    { value: "5M+", label: "Acres Monitored" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-700 to-green-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;