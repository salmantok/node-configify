# node-configify

> `node-configify` utilitas sederhana dan ringan untuk mengelola konfigurasi di Node.js.

## Kenapa node-configify?

✔ Sangat ringan

✔ Tidak membawa fitur berlebihan

✔ API modern & bersih

✔ Alternatif super kecil untuk `dotenv`

✔ Dapat dipakai untuk aplikasi Node.js kecil maupun besar

✔ Bisa dikelola, di-merge, di-reset kapan saja

## Instalasi

```sh
npm install node-configify
```

## Penggunaan Dasar

```js
import conf from 'node-configify';

// Set konfigurasi
conf.set('APP_NAME', 'MyApp');

// Ambil konfigurasi
console.log(conf.get('APP_NAME')); // "MyApp"

// Cek key
console.log(conf.has('APP_NAME')); // true

// Dapatkan semua konfigurasi
console.log(conf.all());
```

# API

## `set(key, value)`

Menambah atau memperbarui parameter konfigurasi.

```js
conf.set('PORT', 3000);
```

## `get(key)`

Mengambil nilai dari store.

```js
console.log(conf.get('PORT')); // 3000
```

## `has(key)`

Cek apakah key tersedia.

```js
console.log(conf.has('PORT')); // true
```

## `delete(key)`

Menghapus parameter tertentu.

```js
conf.delete('PORT');
```

## `merge(object)`

Menggabungkan objek konfigurasi.

```js
conf.merge({
    MODE: 'production',
    DEBUG: false,
});
```

## `clear()`

Reset seluruh konfigurasi.

```js
conf.clear();
```

## `all()`

Mengambil seluruh konfigurasi dalam bentuk object baru (immutable).

```js
console.log(conf.all());
```

# Membaca File `.env`

`node-configify` menyediakan fungsi mirip `dotenv` tanpa dependensi besar.

## `conf(filepath = '.env', options)`

### Contoh `.env`

```sh
API_KEY=12345
NAME="Node App"
```

### Penggunaan

```js
import conf from 'node-configify';
conf.config(); // otomatis membaca .env

console.log(conf.get('API_KEY'));
// atau
console.log(process.env.NAME);
```

## Cara Kerja Loader `.env`

- Mengabaikan baris kosong
- Mengabaikan baris komentar (`#`)
- Parsing `KEY=VALUE`
- Mendukung nilai ber-kutip `'value'` atau `"value"`
- Menyimpan nilai ke:
    - internal store (`this.store`)
    - optional ke `process.env`
