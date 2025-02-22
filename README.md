# Virtual Loyalty App
So far, I have only created the app's base from which we can start working. For now, I have added all the screens to the app.js file so that you guys can understand the codes better. Moving forward we need to make individual files for the respective pages. I have also added some placeholder images that I alr had. 


## 🚀 How to Set Up & Run the Project
Follow these steps to **clone, install, and run the project locally**:

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Cliffin-Joseph/Virtual-Loyalty-App.git
```
This will download the project to your local machine.

### **2️⃣ Navigate into the Project Directory**
```sh
cd Virtual-Loyalty-App
```

### **3️⃣ Install Dependencies**
Since `node_modules/` is not uploaded, install dependencies manually:
```sh
npm install
```

### **4️⃣ Start the App in Expo**
Run the following command to launch the app:
```sh
npx expo start
```

This opens the **Expo Developer Tools** in your browser. You can:
- Scan the QR code to test the app on your phone 📱
- Run it on an emulator (Android Studio/Xcode)

---

## 🛠 How to Work on the Project as a Team

### **5️⃣ Create a New Branch Before Making Changes**
To prevent merge conflicts, always create a new branch before coding:
```sh
git checkout -b feature-branch-name
```
Example for adding a login screen:
```sh
git checkout -b login-screen-update
```

### **6️⃣ Make & Save Changes**
Edit the code in **VS Code** or another text editor, then save your changes.

### **7️⃣ Commit & Push Changes**
After making changes, commit and push them:
```sh
git add .
git commit -m "Added login screen UI"
git push origin login-screen-update
```
Then, create a **Pull Request (PR) on GitHub** to merge your changes.

### **8️⃣ Pull the Latest Changes (Before Working Again)**
Before starting new changes, always update your local copy:
```sh
git checkout main
git pull origin main
```
Then, create a new branch for the next feature:
```sh
git checkout -b new-feature
```

---

## ⚡ Quick Reference: Common Git Commands
| Action | Command |
|------|---------|
| **Clone the project** | `git clone https://github.com/Cliffin-Joseph/Virtual-Loyalty-App.git` |
| **Navigate to project folder** | `cd Virtual-Loyalty-App` |
| **Install dependencies** | `npm install` |
| **Run the app** | `npx expo start` |
| **Create a new branch** | `git checkout -b feature-name` |
| **Commit changes** | `git add .` → `git commit -m "Your message"` |
| **Push changes** | `git push origin feature-name` |
| **Pull latest changes** | `git pull origin main` |

---

