# Angal Backend (Merged)

Internal staff system API.

Features:
- User registration & login (JWT)
- Boss approval flow for staff
- File CRUD with per-file permissions
- Notifications for new user + approval
- Central error logging (file/line via stack)
- Rate limiting (Upstash)

Environment: root .env (outside backend) with MONGO_URI, JWT_SECRET, UPSTASH vars.

Scripts:
```bash
npm run dev
npm run start
npm run seed
npm run smoke
```

Health: GET /api/health
