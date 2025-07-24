import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSupportPage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Handle error (show message to user)
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
=======
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend or API
    setSubmitted(true);
>>>>>>> ac642d38c2bab34a6c04b006b373eee99ed1fbc9
  };

  return (
    <div className="pt-20 px-4 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="py-10 bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-2xl mb-10 shadow-lg">
        <div className="max-w-xl mx-auto text-center px-4">
          <div className="flex justify-center mb-4">
            <Mail className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-2">Contact Support</h1>
          <p className="mb-4 text-lg text-white/90">
            Need help? Our team is here for you. Fill out the form below or use the contact details to reach us directly.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-12">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          {submitted ? (
            <div className="text-center text-green-600 dark:text-green-400 font-semibold">
              Thank you for contacting us! Our support team will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contact Details */}
      <section className="mb-16">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Other Ways to Reach Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-500" />
              <span className="text-gray-700 dark:text-gray-200">support@pitchpoa.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-500" />
              <span className="text-gray-700 dark:text-gray-200">+254 700 123 456</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary-500" />
              <span className="text-gray-700 dark:text-gray-200">Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSupportPage;