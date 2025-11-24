# Firebase Seeding - Action Required 🔥

## ⚠️ The Issue
The seed tool is ready and working, but **Firestore security rules are blocking writes**.

## ✅ Quick Fix (2 minutes)

### 1. Open Firebase Console
**Click this link**: https://console.firebase.google.com/project/ai-tutor-app-96e60/firestore/rules

### 2. Update the Rules
Replace the code in the editor with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Click "Publish"
Blue button at the top

### 4. Run Seed Tool
- The `seed.html` page is already open in your browser
- Click **"Retry Seeding"**
- Wait 1-2 minutes
- Done! 300 properties created!

### 5. Secure Rules (After Seeding)
Go back and change rules to:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📊 What You'll Get
- 300 properties (Kenyan locations)
- 50 users (20 hosts)
- 10 categories

**Direct Link**: https://console.firebase.google.com/project/ai-tutor-app-96e60/firestore/rules
