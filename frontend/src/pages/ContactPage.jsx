const ContactPage = () => {
  return (
    <div className="container mt-16 mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Send Message
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Our Office</h2>
          <address className="text-gray-700 not-italic mb-6">
            <p className="mb-2">123 Farm Road</p>
            <p className="mb-2">Agricultural City, AC 12345</p>
            <p className="mb-2">Email: info@agrisphere.com</p>
            <p>Phone: (123) 456-7890</p>
          </address>
          <div className="h-64 bg-gray-200 rounded-lg">
            {/* Map would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;