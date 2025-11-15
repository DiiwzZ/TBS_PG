# VS Code Setup Guide

วิธีใช้ VS Code สำหรับพัฒนาโปรเจกต์ Bar Table Booking System

---

## ⚡ Quick Start (3 วิธี)

### **วิธีที่ 1: ใช้ Script (ง่ายที่สุด!)**

#### Windows (PowerShell - แนะนำ):
```powershell
# เริ่ม services ทั้งหมด
.\start-all.ps1

# หยุด services ทั้งหมด
.\stop-all.ps1
```

#### Windows (Command Prompt):
```cmd
# เริ่ม services ทั้งหมด
start-all.bat

# หยุด services ทั้งหมด
stop-all.bat
```

#### Linux/Mac:
```bash
# ทำให้ script execute ได้ (ครั้งแรกเท่านั้น)
chmod +x start-all.sh stop-all.sh

# เริ่ม services ทั้งหมด
./start-all.sh

# หยุด services ทั้งหมด
./stop-all.sh
```

---

### **วิธีที่ 2: ใช้ VS Code Tasks**

1. กด **Ctrl+Shift+P** (Windows/Linux) หรือ **Cmd+Shift+P** (Mac)
2. พิมพ์: **"Tasks: Run Task"**
3. เลือก task ที่ต้องการ:

**Tasks ที่มี:**
- 🚀 **Start All Services** - เริ่มทุกอย่างพร้อมกัน
- 🛑 **Stop All Services** - หยุดทุกอย่าง
- 🐳 **Start Infrastructure** - เริ่มแค่ MySQL, RabbitMQ, Redis
- 🗄️ **Stop Infrastructure** - หยุด Docker containers
- 👤 **Start User Service**
- 🪑 **Start Table Service**
- 📅 **Start Booking Service**
- 📱 **Start Check-in Service**
- 💳 **Start Payment Service**
- 🌐 **Start API Gateway**
- 💻 **Start Frontend**

---

### **วิธีที่ 3: ใช้ npm Scripts**

```bash
# Infrastructure
npm run start:infra      # Start MySQL, RabbitMQ, Redis
npm run stop:infra       # Stop infrastructure

# Individual Services
npm run start:user       # User Service (8081)
npm run start:table      # Table Service (8082)
npm run start:booking    # Booking Service (8083)
npm run start:checkin    # Check-in Service (8084)
npm run start:payment    # Payment Service (8085)
npm run start:gateway    # API Gateway (8080)
npm run start:frontend   # Frontend (3001)

# Utilities
npm run docker:ps        # Check container status
npm run logs:infra       # View all infrastructure logs
npm run logs:mysql       # View MySQL logs only
npm run help             # Show all commands
```

---

## 🔧 VS Code Extensions (แนะนำ)

### **Java & Spring Boot:**
1. **Extension Pack for Java** (Microsoft)
   - Java language support
   - Debugger
   - Maven & Gradle support

2. **Spring Boot Extension Pack** (VMware)
   - Spring Boot Tools
   - Spring Initializr
   - **Spring Boot Dashboard** ← สำคัญมาก!

### **Frontend:**
3. **ES7+ React/Redux/React-Native snippets**
4. **Prettier - Code formatter**
5. **ESLint**
6. **Tailwind CSS IntelliSense** (ถ้าใช้ Tailwind)

### **Docker & Database:**
7. **Docker** (Microsoft) - จัดการ containers
8. **MySQL** (cweijan) - เชื่อมต่อ database

### **Utilities:**
9. **GitLens** - Git supercharged
10. **Thunder Client** - REST API testing (ใน VS Code)

---

## 🎯 Spring Boot Dashboard

หลังจากติดตั้ง **Spring Boot Extension Pack**:

1. เปิด sidebar → จะเห็น **Spring Boot Dashboard**
2. Dashboard จะแสดง Spring Boot apps ทั้งหมด
3. คลิก **▶️ Start** ข้างชื่อ service เพื่อรัน
4. คลิก **⏹️ Stop** เพื่อหยุด
5. ดู **Logs** ได้ในแท็บ OUTPUT

**มันทำงานเหมือน IntelliJ แต่อยู่ใน VS Code!** 🎉

---

## 🐛 Debugging ใน VS Code

ไฟล์ `.vscode/launch.json` ถูกสร้างไว้แล้ว สำหรับ debug:

1. เปิดไฟล์ `.vscode/launch.json`
2. เลือก configuration ที่ต้องการ
3. กด **F5** เพื่อเริ่ม debug
4. ตั้ง breakpoints ได้ตามปกติ

---

## 📁 Project Structure

```
TBS_PG/
├── start-all.bat          # Windows start script
├── start-all.sh           # Linux/Mac start script
├── stop-all.bat           # Windows stop script
├── stop-all.sh            # Linux/Mac stop script
├── package.json           # npm scripts
├── .vscode/
│   ├── tasks.json         # VS Code tasks
│   └── launch.json        # Debug configurations
├── services/              # Backend microservices
│   ├── user-service/
│   ├── table-service/
│   ├── booking-service/
│   ├── checkin-service/
│   ├── payment-service/
│   └── api-gateway/
├── frontend/              # Next.js frontend
└── deploy/
    └── docker-compose.yaml
```

---

## 🚀 Daily Workflow

### **เริ่มวัน (เช้า):**

```bash
# วิธี 1: ใช้ script
start-all.bat              # Windows
./start-all.sh             # Linux/Mac

# วิธี 2: ใช้ VS Code Task
# Ctrl+Shift+P → "Tasks: Run Task" → "🚀 Start All Services"
```

### **ทำงาน:**

- แก้ไข code
- Services จะ auto-reload (Spring Boot DevTools)
- Frontend จะ hot-reload อัตโนมัติ

### **เลิกงาน (เย็น):**

```bash
# หยุด services
stop-all.bat              # Windows
./stop-all.sh             # Linux/Mac

# หรือปิด terminal windows (Ctrl+C)
```

---

## 💡 Tips

### **เปิด Multiple Terminals:**

ใน VS Code:
1. กด **Ctrl+Shift+`** (backtick) เพื่อเปิด terminal
2. กด **+** icon เพื่อเปิด terminal ใหม่
3. หรือกด **Split Terminal** icon

### **Workspace Recommendations:**

VS Code จะแนะนำให้ติดตั้ง extensions ที่เราแนะนำอัตโนมัติ

### **Keyboard Shortcuts:**

- **Ctrl+Shift+P**: Command Palette (รัน tasks)
- **Ctrl+`**: Toggle Terminal
- **F5**: Start Debugging
- **Ctrl+Shift+F5**: Restart Debugging
- **Ctrl+Shift+B**: Run Build Task

---

## ⚠️ Troubleshooting

### **Script ไม่ทำงาน (Linux/Mac):**

```bash
# ทำให้ executable
chmod +x start-all.sh stop-all.sh
```

### **Port Already in Use:**

```bash
# ตรวจสอบ port (Windows)
netstat -ano | findstr :8080

# หยุด process
taskkill /F /PID <PID>

# ตรวจสอบ port (Linux/Mac)
lsof -i :8080

# หยุด process
kill -9 <PID>
```

### **Services ไม่เริ่ม:**

1. ตรวจสอบ Docker Desktop ทำงานอยู่หรือไม่
2. ตรวจสอบ infrastructure containers:
   ```bash
   npm run docker:ps
   ```
3. ดู logs:
   ```bash
   npm run logs:infra
   ```

### **Gradle Build Error:**

```bash
# Clean และ build ใหม่
./gradlew clean build -x test

# Windows
gradlew.bat clean build -x test
```

---

## 📚 Additional Resources

- [Full Setup Guide](./docs/SETUP.md)
- [Architecture Documentation](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [GitHub Repository](https://github.com/DiiwzZ/TBS_PG)

---

## 🤝 Need Help?

1. ดู [docs/SETUP.md](./docs/SETUP.md) สำหรับรายละเอียดเพิ่มเติม
2. เปิด [GitHub Issues](https://github.com/DiiwzZ/TBS_PG/issues)
3. ติดต่อ Friyen Team

---

**Happy Coding! 🚀**

