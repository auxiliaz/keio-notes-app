# Keio Notes App

Keio Notes is a simple and aesthetic web-based notes application built with **Next.js**.  
This project focuses on providing a clean user experience for writing notes and managing daily to-do activities, using **localStorage** as the main data storage without a backend.

---

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **LocalStorage** (client-side data persistence)

---

## Application Pages & Features

### 1. Landing Page
- Introduction to Keio Notes
- Simple and minimal design
- Entry point before authentication

---

### 2. Authentication (Login & Register)
- User registration and login using **localStorage**
- No backend or server-side authentication
- Used only to simulate authentication flow

---

### 3. Notes Page
Users can manage personal notes with the following features:
- Create a new note
- View a list of notes
- View note details
- Edit note title and content
- Add and remove tags
- Upload images (stored as data in localStorage)
- Delete notes

All notes data is stored locally in the browser using **localStorage**.

---

### 4. Note Detail Page
- Display full note content
- Edit mode for updating title, content, and tags
- Delete note functionality
- Data updates are synced directly to localStorage

---

### 5. To-Do Page
- Displays a predefined activity (static from code)
- Inside the activity, users can:
  - Add new to-do items
  - Delete to-do items
  - Mark items as done (checked)

> Note: Users cannot create new activities yet, only manage to-do items within the existing activity.

---

### 6. Logout
- Clears authentication data from localStorage
- Redirects user back to the register page

---

## Application Flow

1. User opens the landing page
2. User registers or logs in
3. After login, user is redirected to the dashboard
4. User can:
   - Manage notes (create, read, update, delete)
   - Access note detail pages
   - Manage to-do items
5. User logs out and returns to the landing page

---

## Data Management

- All data (users, notes, tags, to-do items) is stored using **localStorage**
- No backend or database integration
- Data persists as long as the browser storage is not cleared

---

## Limitations

- No backend or server-side database
- Authentication is client-side only (not secure for production)
- To-do activities are still static and defined in code
- Data is device- and browser-specific (localStorage based)

---

## Installation & Running the Project

Clone the repository:
```bash
git clone https://github.com/your-username/keio-notes-app.git
```

Install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open the app in your browser:
```
http://localhost:3000
```