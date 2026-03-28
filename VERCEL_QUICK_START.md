# دليل سريع: استضافة على Vercel (5 دقائق)

## الخطوات السريعة

### 1️⃣ أنشئ حساب Vercel
- اذهب إلى https://vercel.com
- اضغط **Sign Up** واختر **GitHub**
- وافق على الأذونات

### 2️⃣ رفع المشروع على GitHub
```bash
cd /home/ubuntu/faselhd-stremio-addon
git init
git add .
git commit -m "FaselHD Stremio Addon"
git remote add origin https://github.com/YOUR_USERNAME/faselhd-stremio-addon.git
git branch -M main
git push -u origin main
```

### 3️⃣ استيراد إلى Vercel
- في Vercel Dashboard اضغط **Add New** → **Project**
- اختر **Import Git Repository**
- ابحث عن `faselhd-stremio-addon`
- اضغط **Import**

### 4️⃣ التكوين
- **Framework:** Other
- **Build Command:** `pnpm build`
- **Output Directory:** `dist`
- اضغط **Deploy**

### 5️⃣ انتظر 2-5 دقائق ✅

## الرابط النهائي
```
https://YOUR_VERCEL_URL/api/stremio/manifest.json
```

## تثبيت في Stremio (iPhone)
1. افتح Stremio
2. Add-ons → Discover → +
3. الصق الرابط أعلاه
4. اضغط Install

---

للتفاصيل الكاملة، اقرأ `VERCEL_DEPLOYMENT.md`
