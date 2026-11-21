import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">Farmer Support</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Contact Us & Helplines</h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Need agronomic assistance or have feedback on KrishiMitra? Our team and the national Kisan Call Centre are here to support you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info Card */}
        <div className="bg-forest-900 text-white p-8 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Emergency Farmer Helplines</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-leaf-400 mt-1 shrink-0" />
                <div>
                  <span className="block font-bold text-base text-leaf-400">1800-180-1551</span>
                  <span className="text-xs text-gray-300">National Kisan Call Centre (Toll-Free, 22 Languages)</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-leaf-400 shrink-0" />
                <span className="text-xs text-gray-300">support@krishimitra.org</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-leaf-400 mt-1 shrink-0" />
                <span className="text-xs text-gray-300">
                  Krishi Vigyan Kendra Outreach, Digital Agriculture Initiative, New Delhi
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-forest-800/80 rounded-xl border border-forest-700 text-xs text-gray-300 leading-relaxed">
            Operating Hours for Technical Assistance: Monday to Saturday, 8:00 AM - 7:00 PM IST.
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Send a Query or Feedback</h3>
          {submitted ? (
            <div className="p-6 bg-forest-50 border border-forest-200 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-forest-700 mx-auto" />
              <h4 className="font-bold text-forest-900">Message Received</h4>
              <p className="text-xs text-gray-600">
                Thank you for contacting KrishiMitra. Our agricultural support coordinator will review your request.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile or Email</label>
                <input
                  type="text"
                  required
                  placeholder="Contact details"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your farming inquiry, crop question, or platform feedback..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-forest-700"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-forest-800 text-white font-bold rounded-xl hover:bg-forest-900 shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Query</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
