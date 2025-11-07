# 🧪 Server Actions & API Testing Suite

Kompletno rešenje za testiranje Next.js Server Actions i API endpoints sa više opcija za testiranje.

## 🚀 Dostupne opcije za testiranje

### 1. **Browser Interface (Preporučeno)**
Idite na: `http://localhost:3000/test-actions`

**Mogućnosti:**
- ✅ **Input forme** za dodavanje/izmenu podataka
- ✅ **Server Actions** testiranje sa stvarnim formama
- ✅ **API endpoints** testiranje
- ✅ **Real-time prikaz** studenata
- ✅ **Auto-fill** update forme kada izaberete studenta
- ✅ **Automatsko refresh** liste nakon operacija

### 2. **Insomnia (Besplatno!)**
Importujte fajl: `insomnia-collection.json`

**Koraci:**
1. Otvorite Insomnia
2. Kliknite "Import/Export" → "Import Data"
3. Izaberite `insomnia-collection.json`
4. Testirajte sve CRUD operacije

### 3. **VS Code REST Client**
Instalirajte REST Client extension i koristite: `api-tests.http`

### 4. **cURL Script**
Pokrenite: `./test-api.sh`

### 5. **Direktno cURL komande**

```bash
# Dobij sve studente
curl -X GET http://localhost:3000/api/students

# Dobij studenta po ID
curl -X GET http://localhost:3000/api/students/1

# Kreiraj studenta
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Marko Petrović","email":"marko@example.com"}'

# Ažuriraj studenta
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Marko (Ažuriran)","email":"marko.updated@example.com"}'

# Obriši studenta
curl -X DELETE http://localhost:3000/api/students/1
```

## 📁 Kreisani fajlovi

- `/app/test-actions/page.tsx` - Browser test interface
- `/app/api/students/route.ts` - API endpoints (GET, POST)
- `/app/api/students/[id]/route.ts` - API endpoints (GET, PUT, DELETE)
- `/lib/actions.ts` - Server Actions (dodane test funkcije)
- `insomnia-collection.json` - Insomnia kolekcija
- `api-tests.http` - VS Code REST Client
- `test-api.sh` - Bash script sa cURL komandama

## 🔧 Dodatne Server Actions funkcije

Kreisane su dodatne funkcije bez `redirect()` poziva specifično za testiranje:

- `createStudentTest()` - Returns success/error objekti
- `updateStudentTest()` - Returns success/error objekti
- `deleteStudentTest()` - Returns success/error objekti

## 🎯 Prednosti svakog pristupa

| Pristup | Prednosti |
|---------|-----------|
| **Browser Interface** | ✅ Najlakši za korišćenje<br>✅ Input forme<br>✅ Real-time feedback |
| **Insomnia** | ✅ Profesionalni alat<br>✅ Besplatan<br>✅ Export/Import |
| **VS Code REST Client** | ✅ Integrisano u editor<br>✅ Brzo testiranje |
| **cURL Script** | ✅ Automatizovano<br>✅ CI/CD ready |

## 🏃‍♂️ Pokretanje

```bash
npm run dev
# Aplikacija je dostupna na http://localhost:3000
```

Zatim idite na `http://localhost:3000/test-actions` za kompletno testiranje! 🎉