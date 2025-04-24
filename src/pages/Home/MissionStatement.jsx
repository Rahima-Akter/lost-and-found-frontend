import React from 'react';
import { Link } from 'react-router-dom';

const MissionStatement = () => {
  return (
    <section className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-4 mb-20">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6 animate-fadeInUp">
          🎯 Our Mission
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fadeInUp delay-100">
          We believe that every lost item has a story, and every reunion brings hope. 
          Our mission is to reconnect people with what matters most — through community, kindness, and a platform built for real impact.
        </p>
        <div className="mt-8 animate-fadeInUp delay-200">
          <Link to='/register' className="inline-block px-6 py-2 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow animate-bounce">
            Join the Movement
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
