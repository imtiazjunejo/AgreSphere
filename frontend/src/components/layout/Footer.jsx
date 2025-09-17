import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Weather', href: '/weather' },
    { name: 'News', href: '/news' }
  ];

  const features = [
    { name: 'Crop Guidance', href: '/crop-guidance' },
    { name: 'Farm Analytics', href: '/analytics' },
    { name: 'Farmer Network', href: '/network' },
    { name: 'Land Management', href: '/land' }
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
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/src/assets/images/1.jpg" alt="Agrisphere" className="h-8 mr-2" />
              <span className="text-xl font-bold">Agrisphere</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering farmers with smart agriculture solutions since 2025
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature.name}>
                  <a 
                    href={feature.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {feature.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Farm Road</p>
              <p className="mb-2">Agricultural City, AC 12345</p>
              <p className="mb-2">contact@agrisphere.com</p>
              <p>+91 98765 43210</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Agrisphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;