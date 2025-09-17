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
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impactful Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real-world solutions transforming agriculture across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="h-60 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <a 
                  href={project.link}
                  className="inline-flex items-center font-medium hover:text-green-300 transition-colors"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;