import React from "react";

function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white shadow-2xl p-2 rounded-xl bg-gray-900/60">
      {/* about app section */}
      <div>
        <h1 className="text-xl font-bold text-red-500 mb-1">
          About Music Player
        </h1>
        <p className="text-sm">
          A simple React music player to play, pause, songs stats bars, and
          switch songs smoothly in the browser.
        </p>
        <h2 className="text-lg text-red-500">Features</h2>
        <ul className="text-sm list-disc list-inside">
          <li>Play & pause songs</li>
          <li>Switch easily between tracks & Responsive design</li>
        </ul>
      </div>

      {/* about developer section */}
      <div>
        <h1 className="text-xl font-bold text-red-500 mb-2">About Developer</h1>
        <p className="text-sm mb-2">
          Hi, I’m <span className="font-semibold text-cyan-400">Arbaz</span>, a
          BSCS student building projects using{" "}
          <span className="font-semibold text-cyan-400">
            C++, JavaScript, HTML, CSS, and React
          </span>{" "}
          to enhance my skills.
        </p>
        <div className="flex gap-6 justify-center items-center mt-4">
          <a
            href="https://github.com/arbaz3a"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-red-400 font-medium group"
          >
            GitHub
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="https://www.linkedin.com/in/arbaz-shoukat/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-red-400 font-medium group"
          >
            LinkedIn
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
