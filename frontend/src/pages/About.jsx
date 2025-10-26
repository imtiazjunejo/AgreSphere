const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-green-200 to-teal-200 bg-clip-text text-transparent">AgriSphere</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
            Empowering farmers with cutting-edge technology for sustainable agriculture and prosperous farming communities
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              To revolutionize agriculture through innovative technology solutions that empower farmers
              with data-driven insights, enabling them to optimize yields, reduce costs, and make
              informed decisions for sustainable farming practices.
            </p>
            <div className="flex items-center text-green-600 font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Making agriculture smarter, one farm at a time
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A world where every farmer has access to cutting-edge agricultural technology,
              creating sustainable farming communities that thrive economically and environmentally
              for generations to come.
            </p>
            <div className="flex items-center text-blue-600 font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Building the future of agriculture
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-12 shadow-xl border border-green-100 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Founded in 2020 by a passionate team of agricultural experts, data scientists,
                  and technology innovators, AgriSphere emerged from the recognition that farmers
                  needed better tools to navigate the complexities of modern agriculture.
                </p>
                <p>
                  What started as a small initiative to help local farmers track their crops has
                  evolved into a comprehensive platform serving thousands of farmers across regions,
                  providing them with the insights and tools they need to succeed in an increasingly
                  competitive agricultural landscape.
                </p>
                <p>
                  Today, AgriSphere stands as a beacon of innovation in agriculture, combining
                  traditional farming wisdom with cutting-edge technology to create solutions
                  that are both powerful and accessible to farmers of all scales.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">10K+</div>
                  <div className="text-sm text-gray-600">Farmers Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">Districts Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/src/assets/images/pexels-tkirkgoz-11500221.jpg"
                alt="Modern Agriculture"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-green-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-800">Growing Together</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Passionate experts dedicated to transforming agriculture through technology
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">👨‍🌾</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Agricultural Experts</h3>
              <p className="text-gray-600">Decades of combined farming experience and agricultural knowledge</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">👨‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technology Innovators</h3>
              <p className="text-gray-600">Cutting-edge developers building the future of smart agriculture</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Scientists</h3>
              <p className="text-gray-600">AI and machine learning experts turning data into farming insights</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Join the AgriSphere Community</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Be part of the agricultural revolution. Start your journey towards smarter, more sustainable farming today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-white/25">
              🚀 Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300">
              📞 Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;