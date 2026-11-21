import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Award, BookOpen, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase text-forest-800 tracking-wider">Our Purpose</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">About KrishiMitra</h1>
        <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          KrishiMitra was created with a single mission: to bridge the gap between agricultural scientific research and the everyday decisions of Indian farmers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <Award className="w-5 h-5 text-forest-800" />
          </div>
          <h3 className="font-bold text-gray-900">Scientific Rigor</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Every recommendation is grounded in verified ICAR packages of practices, Indian meteorological division guidelines, and Soil Health Card nutrient standards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5 text-forest-800" />
          </div>
          <h3 className="font-bold text-gray-900">Farmer-First Accessibility</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Built mobile-first with high-contrast UI, multi-language support (English, Hindi, Assamese), and large touch targets designed for use directly on the field.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-forest-800" />
          </div>
          <h3 className="font-bold text-gray-900">Zero Hallucinations</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Our AI assistant uses Retrieval-Augmented Generation (RAG) with verified citations and strict guardrails preventing fabrication of chemical dosages or pesticide advice.
          </p>
        </div>
      </div>

      <div className="bg-forest-50 p-8 rounded-2xl border border-forest-100 space-y-4">
        <h3 className="text-xl font-bold text-forest-900">Alignment with Digital Agriculture Mission</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          KrishiMitra aligns directly with the Government of India's Digital Agriculture Mission, empowering smallholder farmers with open digital infrastructure, crop health monitoring, and direct price transparency to eliminate exploitative intermediary markups.
        </p>
        <div className="pt-2">
          <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-800 text-white rounded-xl text-sm font-semibold hover:bg-forest-900 shadow-sm">
            Join KrishiMitra Today
          </Link>
        </div>
      </div>
    </div>
  );
}
