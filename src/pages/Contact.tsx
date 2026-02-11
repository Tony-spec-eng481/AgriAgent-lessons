import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Contact.css";

const Contact = () => {
 
  const [showSuccess, setShowSuccess] = useState(false);


  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      info: "support@smartagri.edu",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      info: "+254 700 000 000",
      description: "Mon-Fri, 8am-6pm EAT",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Our Location",
      info: "Agriculture Hub, Innovation Dr.",
      description: "Nairobi, Kenya",
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
              ></motion.div>
            )}
          </AnimatePresence>

          <div className="contact-grid">
            {/* Contact Info Section */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-details">
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-subtitle">
                  Have questions about our lessons or need help with your
                  agribusiness? Our agricultural experts are here to guide you
                  every step of the way.
                </p>
              </div>
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    className="contact-method fade-in"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div className="method-content">
                      <h3>{method.title}</h3>
                      <p className="font-semibold text-lg">{method.info}</p>
                      <p className="text-sm opacity-80">{method.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="contact-additional"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="business-hours">
                  <Clock className="hours" />
                  <span className="font-semibold">Business Hours</span>
                </div>
                <p className="response-time">
                  Typical response time: <strong>within 2 hours</strong> during
                  business hours
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-600">
              Need immediate assistance? Check our{" "}
              <a
                href="/faq"
                className="text-green-600 font-semibold hover:underline"
              >
                FAQ page
              </a>{" "}
              or{" "}
              <a
                href="/community"
                className="text-green-600 font-semibold hover:underline"
              >
                join our community forum
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
