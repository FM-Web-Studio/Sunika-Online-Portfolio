# Portfolio Website - Update Guide

This is a simple guide for updating this portfolio website without needing to know how to code. I built this for someone who's never touched code before, so if that's you - you're in the right place.

## Important Thing to Know Upfront

When you save your changes here and push them, they go live on the actual website pretty much immediately. So just make sure you're happy with what you changed before you hit that button.

---

## First Time Setup

### What You'll Need

You need two free programs:

**GitHub Desktop** (https://desktop.github.com/)
- This is how you'll download the website files and publish changes
- Just download it, install it, and sign in with GitHub

**Visual Studio Code** (https://code.visualstudio.com/)
- This is a text editor that makes it way easier to change files
- Download, install, done

### Getting the Files

1. Open GitHub Desktop
2. Click File → Clone Repository
3. Find this repository in the list (or paste the URL)
4. Pick a folder on your computer where you want to save everything
5. Click Clone and wait for it to download

### Installing Node.js

You need Node.js installed to run the website on your computer. Let's check if you have it first.

**Check if you already have it:**

On Windows:
1. Press Windows key + R
2. Type `cmd` and press Enter
3. Type `node --version` and press Enter
4. If you see something like "v18.0.0" or any version number, you're good - skip to the next section

On Mac:
1. Open Spotlight (Cmd + Space)
2. Type `terminal` and press Enter
3. Type `node --version` and press Enter
4. If you see something like "v18.0.0" or any version number, you're good - skip to the next section

**If you don't have it, install it:**

1. Go to https://nodejs.org/
2. Download the LTS version (the one that says "Recommended for most users")
3. Run the installer
4. Just click Next through everything, the defaults are fine
5. Restart your computer
6. Test again using the steps above to make sure it worked

Node.js comes with npm automatically, so once Node is installed, you're set.

### Opening the Project

1. In GitHub Desktop, click Repository → Open in Visual Studio Code
2. You'll see a bunch of folders on the left
3. The main one you care about is **frontend/src** - that's where you'll make most changes

### Running the Website Locally

Before you push changes, you probably want to see what they look like. Here's how to run the site on your computer:

**First time only:**
1. In VS Code, click **Terminal** at the top → **New Terminal**
2. Type `cd frontend` and press Enter
3. Type `npm install` and press Enter (this installs all the website dependencies - takes a minute)

**Every time you want to preview:**
1. Open the terminal in VS Code (Terminal → New Terminal)
2. If you're not in the frontend folder, type `cd frontend` and press Enter
3. Type `npm run dev` and press Enter
4. Wait a few seconds - you'll see a message with an address like `http://localhost:3000`
5. Hold Ctrl (or Cmd on Mac) and click that address, or just open it in your browser

Now the website is running on your computer. Any time you save a file (Ctrl+S or Cmd+S), the page automatically refreshes to show your changes.

**To stop the server:**
- Just press Ctrl+C (Cmd+C on Mac) in the terminal, or close the terminal tab

The commands are the same for Windows and Mac.

---

## Adding Gallery Images

The gallery has different categories: paintings, drawings, baking, and artistic mix. Here's how to add new stuff:

### Put the Image File in the Right Place

1. Go to **frontend/src/images/Gallery**
2. Pick the folder that matches your art type:
   - **Paintings** - paintings
   - **Drawings** - drawings  
   - **Baking** - photos of baked stuff
   - **Artistic Mix** - clay, mosaic, whatever else

3. Just drag your image into that folder
   - Keep the filename simple - like "Blue Lion.jpg" or "Chocolate Cake.jpg"
   - Avoid weird characters (%, #, @, etc)

### Tell the Website About It

Open **frontend/src/information/gallery.json**

This file has all the info about each piece. Find the section that matches what you added ("paintings", "drawings", etc).

Each entry looks like this:
```json
{ "number": 32, "title": "Yellow Bird", "description": "Bright yellow bird.", "price": 100, "dimensions": "20x20 cm", "sold": true }
```

To add a new one:
1. Find the last entry in that section (look for the `]` bracket)
2. Add a comma after the last `}`
3. Press Enter and copy this template:

```json
{ "number": 33, "title": "Your Title", "description": "Description here", "price": 150, "dimensions": "30x40 cm", "sold": false }
```

Few things:
- The number should be the next one in sequence
- Title should match your image filename
- Set sold to `true` or `false`
- Don't mess with the commas and quotes - they're important

**Example** - adding a new painting:

Before:
```json
"paintings": [
  { "number": 31, "title": "Swans", "description": "Graceful swans on water.", "price": 150, "dimensions": "30x40 cm", "sold": true },
  { "number": 32, "title": "Yellow Bird", "description": "Bright yellow bird.", "price": 100, "dimensions": "20x20 cm", "sold": true }
],
```

After:
```json
"paintings": [
  { "number": 31, "title": "Swans", "description": "Graceful swans on water.", "price": 150, "dimensions": "30x40 cm", "sold": true },
  { "number": 32, "title": "Yellow Bird", "description": "Bright yellow bird.", "price": 100, "dimensions": "20x20 cm", "sold": true },
  { "number": 33, "title": "Purple Sunset", "description": "Beautiful purple and orange sunset over the ocean.", "price": 180, "dimensions": "40x50 cm", "sold": false }
],
```

### Removing Something

Just delete the entire line for that item in gallery.json (including the commas). You can also delete the image file itself if you want.

---

## Adding Design Projects

### Add Your Images

1. Go to **frontend/src/images/Graphic Design**
2. Make a new folder and name it whatever your project is called
3. Drop all your project images in there

### Add the Project Info

Open **frontend/src/information/projects.json**

Find the last project, add a comma after its `}`, then add yours:

```json
{
  "id": 7,
  "name": "Coffee Shop Branding",
  "folder": "Coffee Shop Branding",
  "description": "A complete branding package for a local coffee shop including logo, menu design, and merchandise.",
  "category": "Branding",
  "year": "2024"
}
```

Important: The folder name here must match EXACTLY what you named the folder.

### Editing Existing Projects

Just open projects.json, find what you want to change, and edit the text between the quotes. Pretty straightforward.

---

## Updating Bio and Contact Info

**Bio stuff:** frontend/src/information/bio.json
- Name, title, headline
- Hobbies, achievements
- Education, work experience

**Contact info:** frontend/src/information/contact.json  
- Email, phone
- Social media handles
- What you're available for

Just change the text between the quotes. Leave the commas, brackets, and quotes alone - they need to stay.

---

## Publishing Your Changes

Once you've made changes and tested them locally (see "Running the Website Locally" above):

1. **Save everything** - Hit Ctrl+S in VS Code (Cmd+S on Mac)

2. **Open GitHub Desktop** - You'll see what changed

3. **Write what you did** - Bottom left, there's a box that says "Summary". Write something like "Added new painting" or "Updated contact info"

4. **Commit to main** - Click that blue button

5. **Push origin** - Click this to send it to the web

That's it. Give it a few minutes and the website updates automatically.

---

## Common Mistakes

Stuff that'll probably trip you up at first:
- **Commas** - Every entry needs a comma after it except the last one
- **Quotes** - Keep the quotation marks, they're not optional
- **Folder names** - In projects.json, the folder name has to match exactly
- **Numbers** - Use the next number in sequence, don't skip
- **Filenames** - Keep them simple, no special characters

---

## If You Break Something

Don't stress. In GitHub Desktop:
1. Click History at the top
2. Right-click your last change
3. Click "Revert Changes in Commit"

This undoes whatever you just did. Problem solved.

---

## Quick Checklist

Before you push:
- [ ] Saved everything? (Ctrl+S)
- [ ] Commas and quotes look right?
- [ ] Wrote a commit message?
- [ ] Actually want this live?

---

That's pretty much it. The site's built to be simple to update - no coding needed. Just change the files, push, and you're done.

If something's confusing or breaks, just revert it or reach out for help.