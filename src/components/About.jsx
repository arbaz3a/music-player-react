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
          A modern React music player with a rich feature set play, pause, skip
          tracks, manage playlists, and explore your listening stats, all in a
          sleek responsive UI.
        </p>
        <h2 className="text-lg text-red-500 mt-3">Features</h2>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li>Play, pause & skip songs with smooth transitions</li>
          <li>Create, manage & delete custom playlists</li>
          <li>Add songs to playlists from any view</li>
          <li>Favourite songs with one-click heart toggle</li>
          <li>Listening history tracking (Recently Played)</li>
          <li>Real-time search across songs & artists</li>
          <li>Song statistics & analytics dashboard</li>
          <li>Volume control with mute toggle</li>
          <li>Progress bar with seek functionality</li>
          <li>Fully responsive desktop, tablet & mobile</li>
          <li>Mobile bottom navigation & expandable search</li>
          <li>Persistent data via localStorage</li>
        </ul>
      </div>

      {/* about developer section */}
      <div>
        <h1 className="text-xl font-bold text-red-500 mb-2">About Developer</h1>
        <p className="text-sm mb-2">
          Hi, I'm <span className="font-semibold text-cyan-400">Arbaz</span>, a
          BSCS student passionate about building full-stack applications and
          exploring AI/ML. I work with{" "}
          <span className="font-semibold text-cyan-400">
            Python, JavaScript, React, Node.js, Express, MongoDB, MySQL, C++,
            HTML & CSS
          </span>{" "}
          and have hands-on experience with{" "}
          <span className="font-semibold text-cyan-400">
            Artificial Intelligence & Machine Learning
          </span>
          .
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
