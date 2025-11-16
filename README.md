# 🔐 Password Tester
A mini project that allows users to test password strength, estimate crack time, and receive feedback for improvement with information,simulation thinking of hacker in real life
## 🚀 Features
- Real-time password strength analysis
- Estimated crack time calculation
- Helpful suggestions to improve weak passwords
- Modern, responsive UI

## 🛠️ Tech Stack
## 🖥️ Front-End
- [React](https://react.dev/) – UI framework
- [Vite](https://vitejs.dev/) – Fast bundler and dev server
- [TypeScript](https://www.typescriptlang.org/) – Type-safe development
- [Mantine](https://mantine.dev/) – UI component library
- [TsParticles](https://particles.js.org/) - UI Animation Library
## ⚙️ Back-End
-JavaScript
## 🚀 Deployment
- [Vercel](https://vercel.com/) - Deploy front-end
- [Render](https://render.com/) - Deploy back-end
## LIBARY
- [zxcvbn](https://github.com/dropbox/zxcvbn) – Password strength estimation,you can learn about operating principle in this link  
## 🔍 How It Works
Almost app test password usually just exam length or need special character(#,%,@@),this is good but not safety in real life.Once password is 'An2007@" meet all the need of one strength password but we can crack it easily with infomation I collect . The project use `zxcvbn` library(one libary in DropBox) and custom dictionary is created by PII(name,birthday,nickname) to evaluate strength of password.It simulation a hacker attack in real life
## 🔄 Flow
1. User enters a password in the input field.
2. Frontend sends the password to `zxcvbn` for analysis.
3. The result is displayed instantly with strength level and suggestions.

## 📦 Installation
Clone the repository:
```bash
git clone https://github.com/ry2811/Password-Strength
npm install
```
Run front-end
```bash
cd password
npm run dev
```
Run back-end
```bash
cd password-tester-be
node index.js
```
## 🌐Website : https://password-strength-navy.vercel.app/  
## Screenshots : 
<img width="1539" height="1062" alt="image" src="https://github.com/user-attachments/assets/81676703-ffae-42a0-90d4-11070217fc7f" />
<img width="2543" height="1451" alt="image" src="https://github.com/user-attachments/assets/8c5e6b80-73d6-47ef-8d40-610876ca928d" />  

## 🌱Future Plans
- Add API "I have PWNED" to check password leak
- Export strength reports as PDF
- Mobile-first redesign
- Localization (English + Vietnamese)

## 🤝 Contributing  
Contributions are welcome!  
Feel free to open issues or submit pull requests.  
If you find this project useful, please ⭐ the repository to support its development.  
## 📬 Contact    
**Email:** nguyendangkhoi2811@gmail.com
## 📄 License  
This project is licensed under the MIT License.

---







