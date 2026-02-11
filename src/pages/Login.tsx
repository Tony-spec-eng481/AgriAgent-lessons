import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
  User,
  Facebook,
} from "lucide-react";

import "../styles/Login.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    console.log("Form Submitted:", formData);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Social Login
  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  // Animation Variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="auth-title">
                  {isLogin ? "Welcome Back" : "Join Our Community"}
                </h1>

                <p className="auth-subtitle">
                  {isLogin
                    ? "Log in to continue your agriculture journey"
                    : "Start learning sustainable farming today"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form */}
          <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login-form" : "register-form"}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {/* Full Name Field */}
                  {!isLogin && (
                    <motion.div variants={itemVariants} className="form-group">
                      <label className="form-label">Full Name</label>
                      <div className="input-wrapper">
                        <User className="input-icon" size={20} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="auth-input"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Email Field */}
                  <motion.div variants={itemVariants} className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-wrapper">
                      <Mail className="input-icon" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="auth-input"
                        placeholder="farmer@example.com"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div variants={itemVariants} className="form-group">
                    <div className="flex justify-between items-center mb-2">
                      <label className="form-label">Password</label>

                      {isLogin && (
                        <a href="/forgot-password" className="forgot-password">
                          Forgot Password?
                        </a>
                      )}
                    </div>

                    <div className="input-wrapper">
                      <Lock className="input-icon" size={20} />

                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                        placeholder="••••••••"
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {!isLogin && (
                      <p className="text-xs text-gray-500 mt-2">
                        Must be at least 8 characters with letters and numbers
                      </p>
                    )}
                  </motion.div>

                  {/* Remember Me */}
                  {isLogin && (
                    <motion.div
                      variants={itemVariants}
                      className="form-options"
                    >
                      <label className="remember-me">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                      </label>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    className="submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? isLogin
                        ? "Signing In..."
                        : "Creating Account..."
                      : isLogin
                        ? "Sign In"
                        : "Create Account"}
                  </motion.button>
                </motion.div>
              </AnimatePresence>

              {/* Divider */}
              <div className="divider">
                <span>Or continue with</span>
              </div>

              {/* Social Buttons */}
              <div className="social-buttons">
                <button
                  type="button"
                  className="social-btn"
                  onClick={() => handleSocialLogin("facebook")}
                >
                  <Facebook size={20} />
                  Facebook
                </button>
              </div>
            </form>
          </div>

          {/* Toggle */}
          <div className="auth-toggle">
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-btn"
              >
                {isLogin ? "Register Now" : "Login Here"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
