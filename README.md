# Sunika Lombard — Portfolio

React 19 + Firebase Hosting portfolio. Built with Create React App, Firestore for data, and a custom component library.

---

## Tech Stack

- **React 19** (Create React App / react-scripts 5)
- **Firebase Hosting** — SPA with `/**` → `/index.html` rewrites
- **Cloud Firestore** — portfolio data + contact form
- **react-icons** — icon library
- **CSS Modules** + CSS custom properties for theming (light/dark)

---

## Local Development

### 1. Prerequisites

- Node.js 18+
- A Firebase project (see setup below)

### 2. Clone and install

```bash
git clone <repo-url>
cd Sunika-Online-Portfolio/frontend
npm install
```

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local` with values from your Firebase project (see Firebase Setup below). **Never commit `.env.local`.**

### 4. Start the dev server

```bash
npm start
```

Runs at `http://localhost:3000`.

---

## Firebase Setup (one-time)

### Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign in.
2. Click **Add project**, name it (e.g. `sunika-portfolio`), accept the terms.
3. Enable Google Analytics if you like (optional).

### Step 2 — Enable Firestore

1. In the Firebase Console, open your project.
2. Go to **Build → Firestore Database**.
3. Click **Create database**.
4. Choose **Start in production mode** (the rules in `firestore.rules` handle permissions).
5. Pick the region closest to South Africa: **europe-west1** or **us-central1**.
6. Click **Enable**.

### Step 3 — Enable Hosting

1. Go to **Build → Hosting**.
2. Click **Get started** and follow the prompts.
3. You don't need to install the Firebase CLI on your machine right now — the GitHub Action handles deployment.

### Step 4 — Register the web app and get config values

1. Go to **Project Settings** (gear icon, top left) → **General**.
2. Scroll to **Your apps** and click **Add app → Web** (`</>`).
3. Register the app (name it anything, e.g. "portfolio-web").
4. Copy the config object — it looks like this:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "sunika-portfolio.firebaseapp.com",
  projectId:         "sunika-portfolio",
  storageBucket:     "sunika-portfolio.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abc123",
  measurementId:     "G-XXXXXXXXXX"
};
```

5. Put these values in `frontend/.env.local`:

```
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=sunika-portfolio.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=sunika-portfolio
REACT_APP_FIREBASE_STORAGE_BUCKET=sunika-portfolio.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abc123
REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 5 — Update `.firebaserc`

Edit `.firebaserc` and replace `sunika-portfolio` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "YOUR-PROJECT-ID"
  }
}
```

### Step 6 — Seed Firestore with portfolio data

The seed script uses the Firebase Admin SDK. You need a **service account key**:

1. Go to **Project Settings → Service accounts**.
2. Click **Generate new private key** → **Generate key**.
3. Save the downloaded JSON file somewhere safe on your computer. **Do not commit it to git.**

Run the seed script (from the repo root):

```bash
node scripts/seedFirestore.mjs /path/to/serviceAccountKey.json
```

This populates:
- `portfolio/personal` — name, title, bio, photo URL
- `portfolio/contact` — email, phone, location
- `portfolio/social` — Instagram + LinkedIn
- `portfolio/skills` — creative / technical / soft skills
- `portfolio/interests` — interest tags
- `education/` — Open Window BA + Matric
- `projects/` — 13 design projects with metadata

### Step 7 — Deploy Firestore rules

Install the Firebase CLI if you haven't:

```bash
npm install -g firebase-tools
firebase login
```

Then deploy:

```bash
firebase deploy --only firestore:rules
```

---

## GitHub Actions CI/CD (auto-deploy on push)

The workflow in `.github/workflows/deploy-frontend.yml` builds the React app and deploys to Firebase Hosting on every push to `main`.

### Required GitHub Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.

Add all of these:

| Secret name | Where to find it |
|---|---|
| `REACT_APP_FIREBASE_API_KEY` | Firebase Console → Project Settings → Web app config |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Same |
| `REACT_APP_FIREBASE_PROJECT_ID` | Same |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Same |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Same |
| `REACT_APP_FIREBASE_APP_ID` | Same |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | Same |
| `FIREBASE_SERVICE_ACCOUNT` | See below |

### Getting `FIREBASE_SERVICE_ACCOUNT`

1. Go to **Project Settings → Service accounts**.
2. Click **Generate new private key**.
3. Open the downloaded JSON file in a text editor.
4. Copy the **entire file contents** (the whole JSON object).
5. Paste that as the value of the `FIREBASE_SERVICE_ACCOUNT` secret.

Once these secrets are set, every push to `main` automatically builds and deploys the site.

---

## Adding a New Design Project

### 1. Add images

Create a folder inside `frontend/src/images/Graphic Design/` with the project name, and add your images there.

### 2. Add a Firestore document

Go to the Firebase Console → **Firestore Database → projects** collection and click **Add document**.

Fields to set:

| Field | Type | Example |
|---|---|---|
| `title` | string | `Coffee Shop Branding` |
| `imageFolder` | string | `Coffee Shop Branding` ← must match the folder name exactly |
| `category` | string | `Branding` |
| `year` | string | `2025` |
| `description` | string | Short description of the project |
| `tags` | array | `["Logo", "Packaging", "Print"]` |
| `order` | number | `14` ← controls display order |

### 3. Deploy

Commit and push — GitHub Actions builds and deploys automatically.

---

## Updating Portfolio Content

All content is stored in Firestore. Edit documents directly in the Firebase Console:

| What to change | Collection / document |
|---|---|
| Name, bio, photo | `portfolio/personal` |
| Contact info | `portfolio/contact` |
| Instagram / LinkedIn URLs | `portfolio/social` → `platforms` array |
| Skills | `portfolio/skills` → `categories` array |
| Interests | `portfolio/interests` → `items` array |
| Education | `education/` collection |
| Design projects | `projects/` collection |

---

## Personal Photos (Polaroid section on Home page)

Place photos named `photo-1.jpg`, `photo-2.jpg`, etc. in `frontend/public/photos/`. The site auto-detects how many there are (up to 12). `profile.jpg` in the same folder is used as the Bio portrait.

---

## Folder Structure

```
Sunika-Online-Portfolio/
├── .github/workflows/deploy-frontend.yml   # CI/CD
├── firebase.json                            # Hosting + Firestore config
├── .firebaserc                              # Firebase project alias
├── firestore.rules                          # Security rules
├── scripts/
│   └── seedFirestore.mjs                   # One-time data seed
└── frontend/
    ├── .env.local.example                  # Copy → .env.local
    ├── public/
    │   └── photos/                         # Polaroid + profile photos
    └── src/
        ├── components/                     # Shared UI components
        ├── firebase/                       # Firebase init + Firestore helpers
        ├── hooks/                          # Custom React hooks
        ├── images/Graphic Design/          # Project images (bundled at build)
        ├── pages/
        │   ├── Home/                       # Landing page
        │   ├── Bio/                        # About + education
        │   ├── Projects/                   # Design portfolio grid
        │   └── Connect/                    # Contact form
        └── styles/                         # Global CSS + theme variables
```
