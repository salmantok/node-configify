import fs from 'nodefs-lite';

class NodeConfigify {
    constructor(defaults = {}) {
        this.store = { ...defaults };
    }

    /** tambah atau update konfigurasi */
    set(key, value) {
        this.store[key] = value;
        return this;
    }

    /** ambil konfigurasi */
    get(key) {
        return this.store[key];
    }

    /** cek apakah key ada */
    has(key) {
        return Object.prototype.hasOwnProperty.call(this.store, key);
    }

    /** hapus konfigurasi tertentu */
    delete(key) {
        delete this.store[key];
        return this;
    }

    /** gabungkan konfigurasi baru */
    merge(obj) {
        this.store = { ...this.store, ...obj };
        return this;
    }

    /** reset semua konfigurasi */
    clear() {
        this.store = {};
        return this;
    }

    /** ambil seluruh konfigurasi */
    all() {
        return { ...this.store };
    }

    /** ----------------------------
     * LOAD FILE .env
     * ---------------------------- */
    config(filepath = '.env', options = { overrideProcessEnv: true }) {
        if (!fs.existsSync(filepath)) {
            return this; // tidak error supaya fleksibel
        }

        const content = fs.readFileSync(filepath, 'utf8');
        const lines = content.split(/\r?\n/);

        for (const line of lines) {
            const trimmed = line.trim();

            // Abaikan baris kosong atau komentar
            if (!trimmed || trimmed.startsWith('#')) continue;

            // Format KEY=VALUE
            const equalIndex = trimmed.indexOf('=');
            if (equalIndex === -1) continue;

            let key = trimmed.slice(0, equalIndex).trim();
            let value = trimmed.slice(equalIndex + 1).trim();

            // Hilangkan tanda kutip jika ada
            if (
                (value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))
            ) {
                value = value.slice(1, -1);
            }

            // Simpan ke internal store
            this.store[key] = value;

            // Simpan ke process.env jika diizinkan
            if (options.overrideProcessEnv && !process.env[key]) {
                process.env[key] = value;
            }
        }

        return this;
    }
}

const conf = new NodeConfigify();
export default conf;
