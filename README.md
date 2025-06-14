
# 📁 Document Vault

**Document Vault** is a secure cloud-based application that allows users to upload, store, manage, and access their personal or professional documents from anywhere. Built with the **Next.js 14 App Router**, **MongoDB**, and **Tailwind CSS**, the app provides a seamless and responsive experience across devices.

---

## 🚀 Features

* 🔐 **Authentication** with GitHub using NextAuth
* 📤 **Upload** and store documents securely
* 📂 **View and manage** uploaded documents in a dashboard
* 📥 **Download/Delete** any document
* 🌐 **Responsive UI** with light/dark mode support
* 🧾 Metadata like file size, upload date, and file name
* ⚡ Built using modern technologies (Next.js 14, TypeScript, MongoDB, Tailwind CSS)

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
* **Backend**: Node.js, Next.js API Routes
* **Auth**: GitHub OAuth via NextAuth.js
* **Database**: MongoDB (Mongoose ODM)
* **Storage**: Files stored in MongoDB GridFS (or filesystem as configured)

---

## 📸 Screenshots

> Include UI screenshots of:

* Login Page
* Dashboard
* Upload Modal
* File Listing

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/document-vault.git
cd document-vault
npm install
```

---

## 🧪 Environment Variables

Create a `.env.local` file in the root:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/document-vault?retryWrites=true&w=majority
```

---

## 🏃 Running the App Locally

```bash
npm run dev
```

App will run on: [http://localhost:3000](http://localhost:3000)

---

## 🗃 Folder Structure (App Router)

```
src/
│
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/route.ts
│   ├── dashboard/
│   └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── DocumentList.tsx
│   └── UploadForm.tsx
│
├── libs/
│   └── mongodb.ts
│
├── models/
│   └── document.ts
│
├── styles/
│   └── globals.css
```

---

## 📦 Deployment

Easily deploy to **Vercel**. Set environment variables in the dashboard before deploying.

---

## 👨‍💻 Author

**Nitindeep Singh**
[LinkedIn](https://www.linkedin.com/in/nitindeep-singh)
[GitHub](https://github.com/nitindeep65)

---

## 📄 License

This project is licensed under the MIT License.

---

Let me know if you want me to:

* Add badges (Vercel Deploy, GitHub Stars, etc.)
* Include demo credentials
* Write documentation for each component or endpoint

I can format and export it as a file too if you want.
