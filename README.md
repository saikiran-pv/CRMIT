# 🌟 CRM Web Application

A full-featured, customizable Customer Relationship Management (CRM) system built with Ruby on Rails and MySQL, designed to help businesses manage customers, leads, contacts, and sales opportunities efficiently.

## 🚀 Features

- 🧑‍🤝‍🧑 Customer & Contact Management
- 📋 Lead and Opportunity Tracking
- 📈 Sales Pipeline Visualization
- 🗂️ Activity Logging & Notes
- 🔍 Advanced Search & Filtering
- ✅ Role-Based Access Control (Admin/User)
- 📊 Dashboard with Key Metrics
- 📬 Email Integration (optional)
- 🔁 Import/Export Data (CSV)
- 💾 Data Security & Audit Trails (PaperTrail)
- 🔄 Real-time UI updates (Hotwire/Turbo)

## 🛠 Tech Stack

- **Backend:** Ruby on Rails 7
- **Database:** MySQL
- **Frontend:** ERB + SCSS (or Tailwind CSS)
- **Authentication:** Devise
- **Authorization:** Pundit
- **Background Jobs:** Sidekiq + Redis
- **Search:** Sunspot (Solr)
- **Versioning:** PaperTrail
- **Other:** RSpec, FactoryBot, Pry

## 🔧 Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/crm-app.git
   cd crm-app

2. **Install dependencies:**

   ```bash
   bundle install
   yarn install
   ```

3. **Configure database:**

   Update `config/database.yml` with your MySQL credentials.

   ```bash
   rails db:create db:migrate db:seed
   ```

4. **Start the server:**

   ```bash
   rails server
   ```

5. **Visit the app:**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Running Tests

```bash
bundle exec rspec
```

## 📄 License

This project is open source under the [MIT License](LICENSE).

## 🙌 Acknowledgments

Built with ❤️ by Saikiran. Inspired by modern CRMs and designed to be adaptable across industries.
