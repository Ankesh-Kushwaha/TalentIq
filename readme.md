# 🚀 Online Judge Platform (LeetCode-Style)

A **full-stack competitive programming platform** similar to **LeetCode / Codeforces**, designed to securely execute user-submitted code, evaluate it against multiple test cases, and return accurate verdicts using a **Docker-based sandboxed execution engine**.

---

## 📌 Features

### ✅ Core Judge Features

- Supports multiple programming languages (C++, Python, Java, etc.)
- Multiple test cases per problem
- Accurate verdict system:
  - **AC** – Accepted
  - **WA** – Wrong Answer
  - **TLE** – Time Limit Exceeded
  - **RE** – Runtime Error
  - **CE** – Compilation Error
  - **SYSTEM_ERROR** – Infrastructure failure
- Stops execution on first failing test case (Judge0 behavior)

### 🔐 Security

- Docker-based isolated execution
- No network access inside containers
- Read-only filesystem
- CPU and memory limits
- Process count limits (fork-bomb protection)
- Output size limits
- Shell-injection safe execution

### ⚙️ Architecture

- REST API for submissions
- Redis-based job queue
- Horizontally scalable worker processes
- MongoDB for persistent storage
- Docker sandbox for code execution

---

## 🏗️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- Docker

### Infrastructure

- Docker containers for secure code execution
- Redis List Queue (`LPUSH / BLPOP`)
- Stateless workers (PM2 / Kubernetes ready)

---

## 📂 Project Structure

```bash
.
├── controllers/
│   └── codeSubmission.js
├── models/
│   ├── Submission.js
│   ├── Language.js
│   └── TestCase.js
├── workers/
│   ├── worker.js
│   └── utils/
│       └── dockerImageManager.js
├── routes/
│   └── codeSubmissionroute.js
├── scripts/
│   └── seedLanguages.js
├── config/
│   └── redisConfig.js
├── utils/
│   └── env.js
├── README.md
└── package.json
