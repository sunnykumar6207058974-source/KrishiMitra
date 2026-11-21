import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, PhoneCall, Mail, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-gray-300 pt-14 pb-8 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-forest-800 border border-forest-700 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-leaf-500" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Krishi<span className="text-leaf-500">Mitra</span>
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              An intelligent agriculture assistance platform engineered for Indian farmers to select optimal crops, monitor local micro-climates, interpret soil tests, and consult AI agronomy guidance.
            </p>
            <div className="flex items-center gap-2 text-xs text-leaf-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Grounded in ICAR & Ministry of Agriculture standards</span>
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Core Modules</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/crop-recommendation" className="hover:text-leaf-400 transition-colors">AI Crop Recommendation</Link></li>
              <li><Link to="/weather" className="hover:text-leaf-400 transition-colors">Agromet Weather Advisory</Link></li>
              <li><Link to="/mandi" className="hover:text-leaf-400 transition-colors">APMC Mandi Price Tracker</Link></li>
              <li><Link to="/soil-health" className="hover:text-leaf-400 transition-colors">Soil Health Analyzer</Link></li>
              <li><Link to="/crop-calendar" className="hover:text-leaf-400 transition-colors">Farming Activity Calendar</Link></li>
              <li><Link to="/ai-chat" className="hover:text-leaf-400 transition-colors">Krishi AI Assistant</Link></li>
            </ul>
          </div>

          {/* Col 3: Government Data Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Government Open Data</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://icar.org.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">ICAR Research Bulletins</a></li>
              <li><a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">Agmarknet Price Portal</a></li>
              <li><a href="https://mausam.imd.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">IMD Agromet Division</a></li>
              <li><a href="https://soilhealth.dac.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">Soil Health Card Scheme</a></li>
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-leaf-400 transition-colors">PM-KISAN Portal</a></li>
            </ul>
          </div>

          {/* Col 4: Farmer Support */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Farmer Helpline</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-leaf-500 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-white font-semibold">1800-180-1551</span>
                  <span className="text-xs text-gray-400">Kisan Call Centre (Toll-Free, 6 AM - 10 PM)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-leaf-500 shrink-0" />
                <span className="text-xs">support@krishimitra.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-leaf-500 shrink-0" />
                <span className="text-xs">Digital Agriculture Mission, New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-forest-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} KrishiMitra. Dedicated to Indian Farmers & Sustainable Agriculture.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-gray-200">About Platform</Link>
            <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>
            <span className="text-leaf-500 flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5" /> Made for Indian Agriculture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
