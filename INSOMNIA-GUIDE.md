# 📱 Insomnia Import Guide - Korak po korak

## 🔥 **Method 1: Drag & Drop (Najlakše)**

1. **Otvorite Insomnia**
2. **Pronađite fajl** `insomnia-collection-detailed.json` u Finder/Explorer
3. **Drag & Drop** fajl direktno u Insomnia prozor
4. **Kliknite "Import"** ✅

---

## 🔥 **Method 2: Import Button**

### **Korak 1: Otvorite Import**
- Kliknite na **"Create"** (+ dugme) u gornjem levom uglu
- Ili koristite **Cmd+N** (Mac) / **Ctrl+N** (Windows)
- Izaberite **"Import"**

### **Korak 2: Choose File**
- Kliknite **"From File"**
- Navigate do: `/Users/drasko/Projekti/server-form-actions/actions/`
- Izaberite: `insomnia-collection-detailed.json`
- Kliknite **"Open"**

### **Korak 3: Import**
- Pregledajte šta će se importovati
- Kliknite **"Scan"** → **"Import"**

---

## 🎯 **Šta ćete videti nakon import-a:**

```
🎓 Students API - Server Actions/
├── 👥 Students CRUD/
│   ├── 📋 GET All Students
│   ├── 🔍 GET Student by ID
│   ├── ➕ POST Create Student
│   ├── ✏️ PUT Update Student
│   └── 🗑️ DELETE Student
└── 🌍 Environments:
    ├── 🌍 Local Development (http://localhost:3000)
    └── 🚀 Production (za kasnije)
```

---

## 🚀 **Kako testirati u Insomnia:**

### **1. Proverite Environment**
- Dole levo izaberite: **"🌍 Local Development"**
- URL treba da bude: `http://localhost:3000`

### **2. Testirajte redosledno:**

**a) GET All Students** 📋
- Kliknite na "📋 GET All Students"
- Kliknite **"Send"**
- Trebalo bi da vidite listu studenata (možda praznu)

**b) POST Create Student** ➕
- Kliknite na "➕ POST Create Student"
- Videćete JSON u **Body** tabu:
```json
{
  "name": "Ana Marić",
  "email": "ana.maric@example.com"
}
```
- **Promenite podatke** ako hoćete
- Kliknite **"Send"**
- Trebalo bi da vidite kreiranog studenta sa ID

**c) GET Student by ID** 🔍
- Kliknite na "🔍 GET Student by ID"
- **Promenite URL** sa `/students/1` na stvarni ID studenta
- Kliknite **"Send"**

**d) PUT Update Student** ✏️
- Slično kao POST, ali menjajte postojeći
- **Promenite URL** na stvarni ID
- **Promenite Body** podatke
- Kliknite **"Send"**

**e) DELETE Student** 🗑️
- **Promenite URL** na stvarni ID studenta
- Kliknite **"Send"**
- Student će biti obrisan

---

## 💡 **Pro Tips:**

1. **Environment Variables** - `{{ _.base_url }}` automatski koristi izabrani environment
2. **Copy Response** - Desni klik na response → Copy kao cURL
3. **History** - Insomnia pamti sve zahteve
4. **Collections** - Organizujte testove u foldere

---

## 🆘 **Troubleshooting:**

**Problem:** "Could not connect"
- ✅ **Rešenje:** Proverite da li je `npm run dev` pokrenuto

**Problem:** "404 Not Found"
- ✅ **Rešenje:** Proverite URL (trebao bi biti localhost:3000)

**Problem:** Student ID ne postoji
- ✅ **Rešenje:** Prvo GET All Students da vidite postojeće ID-jeve

---

Probajte import i javite kako ide! 🎉