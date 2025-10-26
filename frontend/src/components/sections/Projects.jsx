import { ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Smart Irrigation System",
      description: "IoT-based water management saving 40% water usage",
      image: "/src/assets/images/project/project-3.jpg",
      link: "#"
    },
    {
      title: "Organic Farming Initiative",
      description: "Helping 200+ farmers transition to chemical-free practices",
      image: "/src/assets/images/project/project-4.jpg",
      link: "#"
    },
    {
      title: "Crop Yield Prediction AI",
      description: "Machine learning models with 92% accuracy",
      image: "/src/assets/images/project/project-5.jpg",
      link: "#"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Impactful Projects</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Real-world solutions transforming agriculture across regions with innovative technology
            and sustainable farming practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="mb-3">
                  <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    SUCCESS STORY
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-green-200 transition-colors">{project.title}</h3>
                <p className="mb-6 text-green-100 leading-relaxed">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-flex items-center font-semibold text-green-300 hover:text-white transition-colors group-hover:translate-x-2 transform duration-300"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>

              {/* Hover overlay with stats */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {index === 0 ? '40%' : index === 1 ? '200+' : '92%'}
                  </div>
                  <div className="text-xs text-gray-600">
                    {index === 0 ? 'Water Saved' : index === 1 ? 'Farmers Helped' : 'Accuracy'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to See More Success Stories?</h3>
            <p className="text-gray-600 mb-6">Explore our complete portfolio of agricultural innovations and farmer success stories</p>
            <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;