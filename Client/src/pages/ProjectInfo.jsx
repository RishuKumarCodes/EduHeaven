import { useEffect, useState } from "react";
import {
  Github,
  Users,
  Star,
  Code,
  GitFork,
  Calendar,
  FileText,
  SmilePlus,
} from "lucide-react";

const GITHUB_API_URL = "https://api.github.com/repos/amandollar/EduHaven";

export default function Info() {
  const [repoData, SetRepoData] = useState(null);
  const [contributors, SetContributors] = useState([]);

  useEffect(() => {
    async function fetchRepoData() {
      try {
        const repoResponse = await fetch(GITHUB_API_URL);
        console.log(repoResponse);
        const repoJson = await repoResponse.json();
        console.log(repoJson);
        SetRepoData(repoJson);

        const ContributorsResopnse = await fetch(
          `${GITHUB_API_URL}/contributors`
        );
        const contributorsJson = await ContributorsResopnse.json();
        SetContributors(contributorsJson);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchRepoData();
  }, []);
  if (!repoData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8">
      {/* Navbar */}
      <nav className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Our Open-Source Work</h1>
        <a
          href={repoData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className=" rounded-xl hover:bg-gray-600 flex gap-3 items-center px-4 py-3 bg-gray-700"
        >
          <Github className="w-6 h-6 " />
          Open on Github
        </a>
      </nav>
      <h2 className="text-l sm:text-2xl mb-4 text-gray-400">
        {repoData.description || "No description available."}
      </h2>

      <div className="flex justify-center gap-10 mt-8">
        {/* left section */}
        <div className="max-w-5xl p-4 sm:p-6 ">
          <p className="text-lg text-gray-300 mb-6 m-4 pb-5">
            EduHaven is a productivity platform designed to enhance student
            learning with real-time collaboration, task management, note-making,
            and social connectivity. Built to optimize study efficiency, it
            offers seamless interactions through WebRTC-powered study rooms,
            analytics-driven insights, and gamification.
          </p>
        {/* key-features */}
          <div className="grid md:grid-cols-2 gap-6 m-4 pb-5">
            <div>
              <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center">
                Key Features
              </h2>
              <ul className="text-gray-300 space-y-2 ">
                <li>
                  ✅ Add notes, Set goals, Add Events for organised learning
                </li>
                <li>
                  📊 Analytics Productivity tracking with real-time insights.
                </li>
                <li>🎮 Gamification Badges & streaks to boost motivation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center">
                Real-Time Collaboration
              </h2>
              <ul className="list-none list-inside text-gray-300 space-y-2">
                <li>💬 Study Rooms Live chat, audio/video calls via WebRTC.</li>
                <li>🤖 AI Chatbot Study assistance & productivity guidance.</li>
                <li>👥 Social Features Add friends, track, and collaborate.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 m-4 pb-5">
            <h3 className="text-lg sm:text-2xl font-semibold mb-4 gap-2 flex items-center">
              <SmilePlus /> Why It Stands Out?
            </h3>
            <p className="text-gray-300">
              EduHaven is more than just a study app—it’s a
              community-driven, data-backed platform that fosters
              productivity, teamwork, and personalized learning. By leveraging
              real-time features and gamification, it ensures students stay
              engaged and on track.
            </p>
          </div>
          {/* README*/}
          <div className="border-b-2 border-gray-600 m-4 pb-5">
            <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2" /> README
            </h2>
            <p className=" text-sm sm:text-base">
              Explore the full details of this project in the{" "}
              <a
                href={`${repoData.html_url}/blob/main/README.md`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                README file
              </a>
              .
            </p>
          </div>

          {/* Contributors */}
          <div className="border-b-2 border-gray-600 m-4 pb-5">
            <h2 className="text-lg sm:text-2xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Team members
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {contributors.map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3  hover:bg-gray-800 border border-transparent hover:border-gray-700 rounded-lg text-center text-xs sm:text-sm"
                >
                  <img
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    className="w-15 h-15 sm:w-24 sm:h-24 rounded-3xl mb-1"
                  />
                  <p className="mt-2 font-medium">{contributor.login}</p>
                  <p className="text-gray-400">
                    Contributions: {contributor.contributions}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* right-section */}
        <div className="  p-4 rounded-lg">
          {/* about */}
          <div>
            <h2 className="semi-bold text-xl">About</h2>
            <div className="text-sm sm:text-base text-gray-300">
              <div className="flex items-center gap-1 p-2">
                <Star /> {repoData.stargazers_count} Stars
              </div>
              <div className="flex items-center gap-1 p-2">
                <GitFork /> {repoData.forks_count} Forks
              </div>
              <div className="flex items-center gap-1 p-2">
                <Code /> {repoData.language}
              </div>
              <div className="flex items-center gap-1 p-2">
                <Calendar /> Created:{" "}
                {new Date(repoData.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1 p-2">
                <Calendar /> Updated:{" "}
                {new Date(repoData.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-9">
            <h2 className="semi-bold text-xl">Additional Details</h2>
            <ul className="list-disc pl-4 sm:pl-5  text-xs sm:text-base text-gray-300 mx-2">
              <li className="p-2">Default Branch: {repoData.default_branch}</li>
              <li className="p-2">
                License:{" "}
                {repoData.license
                  ? repoData.license.name
                  : "No license specified"}
              </li>
              <li className="p-2">Watchers: {repoData.watchers_count}</li>
              <li className="p-2">Size: {repoData.size} KB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
