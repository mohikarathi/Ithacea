import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-gray-800 text-white py-10 px-5 z-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-5">Contact Us</h2>
        <p className="mb-8 text-gray-400">
          Have any questions or need support? We’re here to help! Reach out to us below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Location</h3>
            <p className="text-gray-400">
              123 abc Road<br />
              xyz City, pqr Country
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
            <p className="text-gray-400">
              Phone: +910000000000<br />
              Email: support@yithacea.com
            </p>
          </div>
        </div>

        <form className="mt-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-gray-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-gray-300"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-gray-300"
            rows="4"
          />
          <button
            type="submit"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs; // Ensure this is a default export

