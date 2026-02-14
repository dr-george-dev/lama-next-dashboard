 # Prisma 7 Migration & Troubleshooting Guide

## Problem Overview
The database seeding failed with multiple errors due to breaking changes between Prisma 5/6 (used in Lama Dev's tutorial) and Prisma 7.x (current version).

---

## Key Differences: Prisma 5/6 vs Prisma 7

### 1. **NEW: prisma.config.ts File**
**Before (Prisma 5/6):**
- Configuration lived in `package.json` under `prisma` field

**After (Prisma 7):**
- Dedicated `prisma.config.ts` configuration file
```typescript
// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### 2. **Generator Provider Name Changed**
**Before:**
```prisma
generator client {
  provider = "prisma-client-js"
}
```

**After:**
```prisma
generator client {
  provider = "prisma-client"
}
```

### 3. **DATABASE_URL Removed from Schema**
**Before:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**After:**
```prisma
datasource db {
  provider = "postgresql"
  // No url field! Handled by prisma.config.ts and adapter
}
```

### 4. **Mandatory Database Adapter** ⚠️
**Before (Prisma 5/6):**
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() // This worked!
```

**After (Prisma 7):**
```typescript
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }); // MUST provide adapter!
```

**Error if you don't use adapter:**
```
PrismaClientConstructorValidationError: Using engine type "client" requires 
either "adapter" or "accelerateUrl" to be provided to PrismaClient constructor.
```

---

## Problems Encountered & Solutions

### **Issue #1: Multiple TypeScript Errors in seed.ts**

**Errors Found:**
1. ❌ `PrismaClient` expected 1 argument, got 0
2. ❌ Class creation missing required `supervisorId` field
3. ❌ Invalid `birthday` field on Teacher model
4. ❌ Invalid `birthday` field on Student model
5. ❌ Result model requires both `examId` AND `assignmentId`
6. ❌ Event model uses wrong field names (`startTime`/`endTime` instead of `startDate`/`endDate`)

**Solutions Applied:**

**1. Added adapter to PrismaClient:**
```typescript
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```

**2. Fixed Class creation - added supervisorId:**
```typescript
// Before
await prisma.class.create({
  data: {
    name: `${i}A`, 
    gradeId: i, 
    capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
    // Missing supervisorId!
  },
});

// After
await prisma.class.create({
  data: {
    name: `${i}A`, 
    gradeId: i, 
    capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
    supervisorId: `teacher${i}`,
  },
});
```

**3. Removed invalid birthday fields:**
```typescript
// Removed these lines - birthday field doesn't exist in schema
birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
```

**4. Fixed Result creation (both fields required):**
```typescript
// Before - tried to use only one field with spread operator
...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),

// After - provide both fields
examId: i <= 5 ? i : 1,
assignmentId: i > 5 ? i - 5 : 1,
```

**5. Fixed Event field names:**
```typescript
// Before
startTime: new Date(...),
endTime: new Date(...),

// After
startDate: new Date(...),
endDate: new Date(...),
```

### **Issue #2: Circular Dependency Problem**

**Problem:** Classes need a `supervisorId` (teacher reference), but we were creating classes BEFORE teachers existed.

**Solution:** Reordered the seed operations:
```typescript
// Correct order:
1. ADMIN
2. GRADE
3. SUBJECT
4. TEACHER (create first, without classes)
5. CLASS (now can reference existing teachers)
6. UPDATE TEACHER (connect them to classes)
7. PARENT
8. STUDENT
9. LESSON, EXAM, ASSIGNMENT, RESULT, ATTENDANCE, EVENT, ANNOUNCEMENT
```

### **Issue #3: Malformed DATABASE_URL in .env**

**Problem:**
```env
postgresql
DATABASE_URL="://dr-george-dev:dr-george-dev@localhost:5432/school"
```

**Solution:**
```env
DATABASE_URL="postgresql://dr-george-dev:dr-george-dev@localhost:5432/school"
```

### **Issue #4: Schema Validation Error**

**Error:**
```
Error: The datasource property `url` is no longer supported in schema files.
```

**Solution:** Removed `url = env("DATABASE_URL")` from schema.prisma since Prisma 7 handles this through the adapter.

### **Issue #5: Version Mismatch** 🎯 **THE FINAL FIX**

**Problem:**
```
TypeError: Cannot read properties of undefined (reading 'graph')
```

**Root Cause:** 
- `prisma` CLI: **7.3.0**
- `@prisma/client`: **7.4.0**
- Generated client was incompatible

**Solution:**
```bash
# 1. Update Prisma CLI to match client version
npm install -D prisma@7.4.0

# 2. Delete old generated client
Remove-Item -Recurse -Force generated

# 3. Regenerate with matching versions
npx prisma generate

# 4. Run seed successfully
npx prisma db seed
```

---

## Final Working Configuration

### **prisma.config.ts**
```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### **prisma/schema.prisma**
```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  // No url field in Prisma 7!
}
```

### **.env**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### **src/lib/prisma.ts**
```typescript
import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../../generated/prisma/client";
import pg from "pg";

const connectionString = `${process.env.DATABASE_URL}`

const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export { prisma }
```

### **prisma/seed.ts** (key parts)
```typescript
import { PrismaClient } from "../generated/prisma/client";
import { DayOfWeek, UserSex } from "../generated/prisma/enums";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed in correct order:
  // 1. ADMIN, GRADE, SUBJECT
  // 2. TEACHER (without class connections)
  // 3. CLASS (with supervisorId)
  // 4. Update TEACHER (connect to classes)
  // 5. PARENT, STUDENT, etc.
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

---

## Quick Troubleshooting Checklist

✅ **Version Sync:**
```bash
npm list prisma @prisma/client @prisma/adapter-pg
# All Prisma packages should have matching versions!
```

✅ **Regenerate After Changes:**
```bash
npx prisma generate
```

✅ **Check Database Connection:**
```bash
npx prisma db pull
# or
npx prisma migrate status
```

✅ **Clear and Regenerate:**
```bash
Remove-Item -Recurse -Force generated
npx prisma generate
```

✅ **View Data:**
```bash
npx prisma studio
```

---

## Key Takeaways

1. **Prisma 7 requires adapters** - No more direct database connections
2. **Remove `url` from schema.prisma** - It's now in prisma.config.ts
3. **Always sync versions** - Mismatched versions cause cryptic errors
4. **Regenerate after version updates** - Delete `generated/` folder first
5. **Order matters in seeding** - Create referenced entities before referencing them
6. **Schema field names must match exactly** - No more `startTime` vs `startDate` mismatches

---

## Resources

- [Prisma 7 Upgrade Guide](https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7)
- [Prisma Database Adapters](https://www.prisma.io/docs/orm/overview/databases/database-adapters)
- [Prisma Client Configuration](https://pris.ly/d/prisma7-client-config)

---

**Date Solved:** February 14, 2026  
**Final Versions:** Prisma 7.4.0, @prisma/client 7.4.0, @prisma/adapter-pg 7.4.0
