const About = () => {
  return (
    <div className="container mt-16 mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">About Agrisphere</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            Agrisphere is dedicated to revolutionizing agriculture through technology. 
            We empower farmers with data-driven insights to optimize yields, reduce costs, 
            and make informed decisions.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            Founded in 2020 by a team of agricultural experts and technologists, 
            Agrisphere has grown to serve thousands of farmers across the region.
          </p>
        </div>
        <div>
          <img 
            src="/src/assets/images/1.jpg" 
            alt="Farm landscape" 
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default About;