# استضافة إضافة FaselHD Stremio على Vercel

دليل شامل لاستضافة الإضافة على Vercel المجاني بدون قاعدة بيانات.

## المتطلبات

- حساب GitHub (مجاني)
- حساب Vercel (مجاني)
- تطبيق Stremio على جهازك

## الخطوة 1: تحضير المشروع على GitHub

### 1.1 إنشاء مستودع GitHub

1. اذهب إلى [github.com](https://github.com)
2. اضغط على **New Repository**
3. اختر اسم المستودع: `faselhd-stremio-addon`
4. اختر **Public** (عام)
5. اضغط **Create Repository**

### 1.2 رفع المشروع إلى GitHub

```bash
# من مجلد المشروع
cd /home/ubuntu/faselhd-stremio-addon

# إنشاء git repository محلي
git init
git add .
git commit -m "Initial commit: FaselHD Stremio Addon"

# إضافة remote repository
git remote add origin https://github.com/YOUR_USERNAME/faselhd-stremio-addon.git

# رفع المشروع
git branch -M main
git push -u origin main
```

**ملاحظة:** استبدل `YOUR_USERNAME` باسم المستخدم GitHub الخاص بك.

## الخطوة 2: الاستضافة على Vercel

### 2.1 ربط Vercel مع GitHub

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط على **Sign Up** واختر **Continue with GitHub**
3. وافق على الأذونات
4. سيتم توجيهك إلى لوحة التحكم

### 2.2 استيراد المشروع

1. اضغط على **Add New** → **Project**
2. اختر **Import Git Repository**
3. ابحث عن `faselhd-stremio-addon`
4. اضغط **Import**

### 2.3 تكوين المشروع

في صفحة التكوين:

**Framework Preset:** اختر **Other**

**Build Command:**
```
pnpm build
```

**Output Directory:**
```
dist
```

**Environment Variables:** اتركها فارغة (الإضافة لا تحتاج متغيرات بيئة)

اضغط **Deploy**

### 2.4 انتظر الاستضافة

- سيستغرق البناء 2-5 دقائق
- ستحصل على رابط مثل: `https://faselhd-addon-xxxxx.vercel.app`
- اضغط على الرابط للتحقق من أن الإضافة تعمل

## الخطوة 3: التحقق من الاستضافة

### اختبر الـ Manifest

افتح هذا الرابط في المتصفح:
```
https://YOUR_VERCEL_URL/api/stremio/manifest.json
```

يجب أن ترى JSON مثل هذا:
```json
{
  "id": "org.faselhd.stremio",
  "version": "1.0.0",
  "name": "FaselHD Stremio Addon",
  ...
}
```

### اختبر Stream Endpoint

```
https://YOUR_VERCEL_URL/api/stremio/stream/movie/tt1254207.json
```

يجب أن ترى قائمة البث (قد تكون فارغة إذا لم يكن المحتوى على FaselHD).

## الخطوة 4: تثبيت الإضافة في Stremio

### على جهاز iPhone:

1. افتح تطبيق Stremio
2. اذهب إلى **Add-ons** (الإضافات)
3. اضغط على **Discover** (استكشف)
4. ابحث عن أيقونة **+** أو **Add**
5. الصق رابط Manifest:
   ```
   https://YOUR_VERCEL_URL/api/stremio/manifest.json
   ```
6. اضغط **Install** (تثبيت)

### بديل: One-Click Installation

استخدم هذا الرابط:
```
stremio://YOUR_VERCEL_URL/api/stremio/manifest.json
```

## الخطوة 5: اختبار الإضافة

1. افتح Stremio
2. ابحث عن فيلم مثل "Big Buck Bunny"
3. يجب أن ترى خيار "FaselHD" في قائمة البث
4. اضغط عليه لبدء المشاهدة

## استكشاف الأخطاء

### الخطأ: "Failed to get addon manifest"

**الحل:**
- تأكد من أن الرابط يستخدم HTTPS (ليس HTTP)
- تحقق من أن Vercel deployment نجح
- جرب إعادة تحميل الصفحة في المتصفح

### الخطأ: "No streams found"

**الحل:**
- تأكد من أن المحتوى موجود على FaselHD
- جرب محتوى آخر
- تحقق من أن FaselHD API يعمل

### الإضافة بطيئة

**الحل:**
- Vercel قد تأخذ وقت أطول في الطلب الأول (Cold Start)
- الطلبات اللاحقة ستكون أسرع
- إذا استمرت البطء، قد تحتاج لـ Vercel Pro

## التحديثات المستقبلية

### لتحديث الإضافة:

1. عدّل الملفات محلياً
2. اضغط على GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel سيعيد البناء تلقائياً

## الإعدادات المتقدمة (اختياري)

### استخدام دومين مخصص

1. في Vercel Dashboard، اذهب إلى **Settings** → **Domains**
2. أضف دومينك (مثل: `addon.example.com`)
3. اتبع التعليمات لتحديث DNS

### تفعيل Analytics

1. اذهب إلى **Settings** → **Analytics**
2. فعّل Analytics لمراقبة الاستخدام

### إعدادات الأداء

1. اذهب إلى **Settings** → **Functions**
2. يمكنك زيادة Memory إذا احتجت (Vercel Pro فقط)

## ملاحظات مهمة

- ✅ الإضافة **مجانية تماماً** على Vercel
- ✅ لا تحتاج **قاعدة بيانات**
- ✅ تدعم **HTTPS تلقائياً**
- ✅ تحديثات **تلقائية** من GitHub
- ⚠️ قد تكون بطيئة قليلاً في الطلب الأول (Cold Start)
- ⚠️ Vercel قد تعطل الخدمة إذا تجاوزت حدود الاستخدام المجاني

## الدعم والمساعدة

إذا واجهت مشاكل:

1. تحقق من **Vercel Logs**: Dashboard → Deployments → View Logs
2. تحقق من **Browser Console**: F12 في المتصفح
3. تأكد من أن **GitHub Repository** محدث

## الخطوات التالية

بعد الاستضافة الناجحة:

1. **أضف دومين مخصص** (اختياري)
2. **فعّل Analytics** لمراقبة الاستخدام
3. **أضف Webhook** لتنبيهات الأخطاء
4. **شارك الإضافة** مع أصدقائك!

---

**نسخة الدليل:** 1.0  
**آخر تحديث:** مارس 2026  
**الحالة:** جاهز للإنتاج
