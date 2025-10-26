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
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Training Programs & <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Empower yourself with knowledge from agricultural experts and master modern farming techniques
            with our comprehensive learning programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-green-100">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>

                <div className="space-y-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>Starts {course.startDate}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <span>{course.instructor}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  🚀 Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-600 mb-6">Join thousands of farmers who have enhanced their skills with our expert-led courses</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Browse All Courses
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-all duration-300">
                Download Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;