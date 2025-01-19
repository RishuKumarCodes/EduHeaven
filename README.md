# EduHaven

## Overview
**EduHaven** is a platform designed to assist students in their academic journey by providing a productivity-focused environment. With features like task management, note-making, real-time study rooms, and a social touch, it aims to simplify and enhance the learning process. The project is built with the **MERN stack** and incorporates real-time collaboration, analytics, and optional AI-powered tools.

---

## Features
- **User Dashboard**: Tracks tasks completed, study time, and productivity stats.
- **To-Do List**: Helps users organize and manage their tasks efficiently.
- **Note-Making**: Rich-text editor to create, edit, and organize notes.
- **Real-Time Study Rooms**:
  - Chat and collaborate with friends.
  - Video/audio controls using WebRTC.
- **Chatbot**: Provides productivity tips and answers academic questions.
- **Friends and Social Features**: Add friends, invite them to study rooms, and track their online/offline status.
- **Analytics**: Visualize progress with charts and insights.
- **Gamification**: Earn badges and track streaks to stay motivated.

---

## Tech Stack
- **Frontend**: React.js with CSS (or Tailwind CSS)
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **AI (Optional)**: OpenAI API for chatbot and note summarization

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Git

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/EduHaven.git
   cd EduHaven
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

<!-- 3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ``` -->

4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm start
   ```
---

## Contribution Guidelines

1. You must get assigned to the issue so others know you're working on it. leave comment to get issue assigned.
2. Code must be properly formatted. (use preetier)
3. Commits should generally be minimal
4. The body of the commit message should explain why and how the change was made.It should provide context and motivation that will help both a reviewer now, and a developer looking at your changes a year later, understand the motivation behind your decisions.

We welcome contributions to make **EduHaven** better for students everywhere! Here’s how you can contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and test them thoroughly.
4. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add a brief description of your changes"
   git push origin feature-name
   ```
5. Create a Pull Request (PR) with a detailed explanation of your changes.


## Roadmap
1. **Phase 1**: Core features - User authentication, to-do list, note-making.
2. **Phase 2**: Real-time study rooms, chatbot integration, and social features.
3. **Phase 3**: Analytics, gamification, and AI-powered enhancements.
4. **Phase 4**: Mobile app development and premium features.
Please follow [our blueprint of Eduhaven](https://excalidraw.com/#json=4xq41ilJX80oi1NSyreJ6,DbujlM3-5_8JtuIxgZCj1Q) for the project planning.
---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
- Special thanks to contributors for their efforts in building **EduHaven**.
- Inspired by productivity tools and online collaborative platforms.

---

## Contact
For questions or suggestions, feel free to reach out on our[ WhatsApp group](https://chat.whatsapp.com/D2YldBvUAigD2FOzFQ8U5X)

Let’s make learning fun and productive!
