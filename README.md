# 🎬 YouTube Clone — Frontend

This is the React frontend of the YouTube Clone project built using Vite.  
It provides a YouTube-style UI where users can register, login, watch videos, upload videos and comment.

---

## 🚀 Features

### 🔐 Authentication
- User Register page
- User Login page
- Auth state using Context API
- Protected routes (cannot access app without login)
- Auto redirect logic

### 🎥 Video Features
- Home video feed
- Video player page
- Like / Dislike buttons
- View count display
- Category filter buttons

### 💬 Comments
- Add comments
- View comments per video

### 📤 Upload
- Upload video with thumbnail
- Protected upload page

### 🎨 UI
- YouTube inspired dark theme
- Sidebar navigation
- Header with search bar
- Responsive grid layout

---

## 🛠 Tech Stack

| Tech | Usage |
|---|---|
| React + Vite | Frontend framework |
| React Router DOM | Routing |
| Axios | API calls |
| Context API | Auth state |
| CSS | Styling |

---

## 📦 Installation

1️⃣ Open terminal and go to frontend folder:

```bash
cd youtube-client
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start development server:

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```