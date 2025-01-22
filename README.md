# 🚀 SpaceX Launches Dashboard
Welcome to the **SpaceX Launches Dashboard**! This project is a web application built using **Next.js** and **shadcn/ui** that displays information about SpaceX launches. It includes advanced filtering options and seamless pagination for a user-friendly experience.  

---

## ✨ Features

- 📅 **Filters:** Filter launches by year, launch success, and landing success.
- 🔄 **Pagination:** Easily navigate between pages with dynamic pagination.
- 🎨 **Beautiful UI:** Styled with **shadcn/ui** for a clean and modern design.
- 🌐 **API Integration:** Fetches real-time data from the [SpaceX API](https://github.com/r-spacex/SpaceX-API).

---

## 🛠️ Tech Stack

- **Next.js** 🌟
- **TypeScript** 📘
- **shadcn/ui** 🎨
- **Lucide Icons** 🖍️

---

## 🚦 How to Run
### 1. Clone the Repository
git clone [https://github.com/yourusername/spacex-launches-dashboard](https://github.com/tarleomkar/Weoto-Devs).git
cd spacex-launches-dashboard

2. Install Dependencies
npm install
# or
yarn install

3. Start the Development Server
npm run dev
# or
yarn dev

4. Open in Browser
Go to http://localhost:3000 to view the application.

⚙️ Project Structure
.
├── components/
│   ├── Filters.tsx    # Filters for launch year, success, etc.
│   ├── LaunchCard.tsx # Individual launch display card
├── pages/
│   ├── index.tsx      # Main dashboard page
├── public/            # Static assets
├── styles/            # Global and component styles
└── README.md          # Project documentation

📖 API Reference
The app uses the SpaceX API. Here's an example API request:
GET [https://api.spacexdata.com/v3/launches](https://api.spacexdata.com/v3/launches?limit=100)
📂 Features Breakdown
🧪 Filters
Launch Year
Launch Success
Landing Success

🔄 Pagination
Dynamically handles pages based on API data.
Disabled navigation buttons when on the first/last page.

👨‍💻 Developer
Omkar Tarle 🚀
GitHub: omkartarle
🎉 Future Enhancements
Add sorting options (e.g., by mission name, flight number).
Implement server-side rendering (SSR) for improved performance.
Enhance the design with animations using Framer Motion.

🌟 If you find this project helpful, give it a ⭐ on GitHub!
Let me know if you want me to tweak anything further! 😎
Happy Coding!!
