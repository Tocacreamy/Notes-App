# 📝 Notes App

A modern notes application built with vanilla JavaScript, Web Components, and glassmorphism UI. Features include creating, viewing, archiving, unarchiving, and deleting notes, with beautiful custom alerts and loading animations.

---

## ✨ Features

- 🆕 **Create, view, archive, unarchive, and delete notes**
- 📂 **Separation of unarchived and archived notes**
- 🧊 **Glassmorphism-inspired UI**
- 🚨 **Custom animated alerts using Web Components and Motion One**
- 🧩 **Modular code structure with Webpack**

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```sh
git clone <your-repo-url>
cd Notes-App
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Run the development server

```sh
npm start
```

🌐 Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 Project Structure

```
src/
  script/
    components/
      addNoteForm.js
      appBar.js
      appFooter.js
      customAlert.js
      detailNote.js
      loading.js
      noteListFetch.js
    utils/
      api.js
      showCustomAlert.js
  styles/
    style.css
index.html
webpack.config.js
```

---

## 🛠️ Usage

- ➕ **Add a note:** Use the form at the top.
- 📥 **Archive/Unarchive:** Use the Archive/Unarchive button on each note.
- 🗑️ **Delete:** Use the Hapus button.
- 🔍 **Detail:** Use the Detail button to view note details.
- 🎉 **Alerts:** Success/error actions show animated glassmorphism alerts.
- ⏳ **Loading:** A glassmorphism loading overlay appears during data fetch.

---

## 🚨 Custom Alert

Custom alerts are implemented as a Web Component (`<custom-alert>`) and can be triggered from anywhere in your app:

```js
import { showCustomAlert } from "./src/script/utils/showCustomAlert.js";

showCustomAlert("Catatan berhasil ditambahkan!", "success");
showCustomAlert("Catatan berhasil dihapus!", "success");
showCustomAlert("Catatan berhasil diarsipkan!", "success");
showCustomAlert("Catatan berhasil dipulihkan!", "success");
```

---

## 🏗️ Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist/` folder.

---

## 🧑‍💻 Tech Stack

- Vanilla JavaScript (ES Modules)
- Web Components
- [Motion One](https://motion.dev/) for animation
- Webpack for bundling
- CSS (glassmorphism, responsive)

---

## 🙏 Credits

- [Dicoding Notes API](https://notes-api.dicoding.dev/)
- [Motion One](https://motion.dev/)
- Glassmorphism inspiration from [glassmorphism.com](https://glassmorphism.com/)

---

## 📄 License

MIT
