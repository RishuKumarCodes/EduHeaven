import React, { useState } from "react";
import { Book, Headphones, Volume2, Coffee, TreesIcon as Tree, Waves, Play, Pause, Youtube } from "lucide-react";

const playlists = [
  { name: "Classical Focus", icon: Book, listeners: 1234, mood: "Concentrated" },
  { name: "Ambient Sounds", icon: Volume2, listeners: 890, mood: "Relaxed" },
  { name: "Lo-fi Beats", icon: Headphones, listeners: 2567, mood: "Chill" },
  { name: "Nature Sounds", icon: Tree, listeners: 678, mood: "Peaceful" },
  { name: "White Noise", icon: Waves, listeners: 456, mood: "Focused" },
  { name: "Jazz for Studying", icon: Coffee, listeners: 1089, mood: "Energized" },
];

const Slider = ({ value, onValueChange, max, step, className }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      max={max}
      step={step}
      className={`w-32 ${className}`}
    />
  );
};

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ type, value, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-4 text-lg w-full max-w-md rounded-md text-black ${className}`}
    />
  );
};

export default function MusicRoom() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [volume, setVolume] = useState(50);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    if (youtubeLink) {
      const videoId = extractYoutubeId(youtubeLink);
      if (videoId) {
        setCurrentVideo(videoId);
        setCurrentlyPlaying("YouTube");
      } else {
        alert("Invalid YouTube URL. Please enter a valid YouTube video link.");
      }
    }
  };

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold">Music Room</h1>
        <p className="text-xl text-gray-400">Enhance your focus and productivity</p>
      </header>

      <main className="space-y-8">
        <section className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Featured Playlist</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDe0DFWQ9AbpuRFXgB8ufPb-eivRjXZfiVw&s"
                alt="Deep Focus Playlist"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold mb-2">Deep Focus</h3>
              <p className="text-gray-400 mb-4">
                A carefully curated mix of instrumental tracks designed to enhance concentration and productivity.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setCurrentlyPlaying("Deep Focus")}
                  className="flex items-center gap-2"
                >
                  {currentlyPlaying === "Deep Focus" ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {currentlyPlaying === "Deep Focus" ? "Pause" : "Play"}
                </Button>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  <Slider
                    value={volume}
                    onValueChange={(newVolume) => setVolume(newVolume)}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">YouTube Player</h2>
          <form onSubmit={handleYoutubeSubmit} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Enter YouTube video URL"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Youtube className="w-5 h-5 mr-2" />
              Play
            </Button>
          </form>
          {currentVideo && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Study Playlists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.name} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <playlist.icon className="w-8 h-8 text-purple-400" />
                  <h3 className="text-xl font-bold">{playlist.name}</h3>
                </div>
                <p className="text-gray-400 mb-2">{playlist.mood}</p>
                <p className="text-gray-500 text-sm mb-4">{playlist.listeners} listeners</p>
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setCurrentlyPlaying(playlist.name)}
                >
                  {currentlyPlaying === playlist.name ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {currentlyPlaying === playlist.name ? "Pause" : "Play"}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>© 2025 music Room. All rights reserved.</p>
      </footer>
    </div>
  );
}
