# 📊 CRMIT – Customer Relationship Management App

A full-stack CRM application built with React and Ruby on Rails. Designed to help teams manage leads, track customer interactions, and automate follow-ups.

---

## 🚀 Overview

CRMIT is a two-part application:
- `frontend/`: A modern UI built with React, TailwindCSS, and React Router.
- `backend/`: A RESTful API built with Ruby on Rails and PostgreSQL.

It supports user authentication, lead tracking, activity logging, and more.

---

## 🧱 Tech Stack

| Layer      | Tech                           |
|------------|--------------------------------|
| Frontend   | React, TailwindCSS, React Router |
| Backend    | Ruby on Rails, PostgreSQL       |
| Dev Tools  | Git, GitHub, ESLint, Prettier   |
| Deployment | (Add Heroku/Vercel/Fly.io/etc.) |

---

## 📂 Folder Structure

```bash

CRM/
├── frontend/ → React SPA (UI, routing, views)
├── backend/ → Rails API (models, controllers, db)
└── README.md
```

---

## 🧪 Features

- 🔐 User authentication (login/signup)
- 📇 Lead management
- 🧾 Activity logging
- 📊 Dashboard analytics
- 🛠️ RESTful API integration
- ✅ Responsive UI

---

## 🛠️ Getting Started

Clone the repository:

```bash
git clone https://github.com/saikiran-pv/CRMIT.git
cd CRMIT
```

Backend Setup (Rails)

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s
```

Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

By default:

    Frontend runs at http://localhost:3000

    Backend runs at http://localhost:3001



Tests

To be added:

    Rails unit tests with RSpec

    React component tests with Jest + React Testing Library


Author

Saikiranreddy Peddavootla

    GitHub: @saikiran-pv

    LinkedIn: https://www.linkedin.com/in/saikiran-reddy-peddavootla-892049164/
