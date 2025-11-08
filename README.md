# 🚦 TS Rate Limiter 

A modular, scalable, and production-ready API rate limiter built with TypeScript and Redis. Designed for Express and Fastify, this package provides plug-and-play middleware, CLI tools, and branded configuration for managing request limits across endpoints and IPs.
---

## ✨ Features

- 🔧 Token Bucket / Sliding Window algorithm
- 🧠 Redis-based usage tracking
- 🧩 Express & Fastify middleware support
- 🛠️ CLI tools for stats and reset
- 📦 Modular architecture with clean separation of concerns
- 📊 Configurable via JSON or YAML
- 🧪 Fully tested with Jest

---

## 📦 Installation

```bash
npm install ts-rate-limiter
```

## 🚀 Usage

### Express Integration

```ts
import express from 'express';
import { expressLimiter } from 'ts-rate-limiter';
import { RateLimiter, RedisAdapter, loadConfig } from 'ts-rate-limiter';

const app = express();
const config = loadConfig();
const adapter = new RedisAdapter(process.env.REDIS_URL || 'redis://localhost:6379');
const limiter = new RateLimiter(config, adapter);

app.use(expressLimiter(limiter));
app.get('/api', (req, res) => res
```

CLI Commands
```bash
# Show usage stats
npm run cli stats 127.0.0.1:/api

# Reset usage for a key
npm run cli reset 127.0.0.1:/api
```
🧪 Testing
```bash
npm test
```

Each folder is modular and purpose-driven:

- **core/** – Implements the rate limiting logic and exposes the public API.
- **adapters/** – Contains pluggable storage backends (e.g., Redis, in-memory).
- **middleware/** – Provides ready-to-use integrations for Express and Fastify.
- **config/** – Loads default configurations and limit presets.
- **cli/** – CLI interface with commands and branding banner.
- **utils/** – Shared utilities like logging and time calculations.
- **tests/** – Comprehensive Jest test coverage for all modules.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

💡 Author
Murad — Backend Architect & Full Stack Developer Crafted with precision, modularity, and branded elegance ✨
