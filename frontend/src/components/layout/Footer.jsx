import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Crop Logs', href: '/crop-logs' },
    { name: 'Weather', href: '/weather' },
    { name: 'About Us', href: '/about' }
  ];

  const features = [
    { name: 'Crop Guidance', href: '/crop-guidance' },
    { name: 'Profit & Loss', href: '/profit-loss' },
    { name: 'Farmer Network', href: '/network' },
    { name: 'Land Management', href: '/landmanagement' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="h-5 w-5" />, 
      href: '#' 
    },
    { 
      name: 'Twitter', 
      icon: <Twitter className="h-5 w-5" />, 
      href: '#' 
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="h-5 w-5" />, 
      href: '#' 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin className="h-5 w-5" />, 
      href: '#' 
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-teal-400 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-green-500 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img src="/src/assets/images/logo.png" alt="AgriSphere" className="h-10 w-10 mr-3 rounded-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">AgriSphere</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering farmers with cutting-edge technology and data-driven insights for sustainable agriculture since 2025
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Features</h3>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature.name}>
                  <a
                    href={feature.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {feature.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">Stay Connected</h3>
            <address className="not-italic text-gray-300 mb-6">
              <p className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@agrisphere.com
              </p>
              <p className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98765 43210
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Agricultural City, India
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} <span className="text-green-400 font-semibold">AgriSphere</span>. All rights reserved.
              Made with ❤️ for farmers.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="/support" className="text-gray-400 hover:text-green-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;