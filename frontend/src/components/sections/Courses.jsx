import { Calendar, Clock, User } from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      title: "Modern Farming Techniques",
      description: "Learn advanced cultivation methods.",
      duration: "6 weeks",
      startDate: "June 15, 2025",
      instructor: "Dr. Rajesh Patel",
      image: "/src/assets/images/courses/irrigation.jpg"
    },
    {
      title: "Organic Certification Process",
      description: "Step-by-step guide to getting certified",
      duration: "4 weeks",
      startDate: "July 1, 2025",
      instructor: "Priya Sharma",
      image: "/src/assets/images/courses/certified.jpg"
    },
    {
      title: "Agri-Tech Masterclass",
      description: "Harnessing technology for farm management",
      duration: "8 weeks",
      startDate: "June 20, 2025",
      instructor: "Amit Kumar",
      image: "/src/assets/images/courses/master.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Training Programs & Courses</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empower yourself with knowledge from agricultural experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Starts {course.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#"
            className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg font-medium transition-colors"
          >
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
};

export default Courses;