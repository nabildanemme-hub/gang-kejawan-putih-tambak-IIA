// 1. Fungsi Jam Digital (Real-time)
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Kita cari elemen yang punya id 'jam-digital' (akan kita tambahkan ke HTML)
    const clockElement = document.getElementById('jam-digital');
    if(clockElement) {
        clockElement.innerText = `${hours}:${minutes}:${seconds} WIB`;
    }
}

// Jalankan jam setiap 1 detik
setInterval(updateClock, 1000);

// 2. Simulasi Update Status Keamanan
function gantiStatusKeamanan(status) {
    const badge = document.querySelector('.status-badge');
    if(status === 'bahaya') {
        badge.innerText = '⚠️ PERLU WASPADA';
        badge.style.backgroundColor = '#f8d7da';
        badge.style.color = '#721c24';
    } else {
        badge.innerText = '✅ KONDUSIF & AMAN';
        badge.style.backgroundColor = '#d4edda';
        badge.style.color = '#155724';
    }
}

// 3. Pesan Selamat Datang Berdasarkan Waktu
window.onload = function() {
    const h1 = document.querySelector('header h1');
    const hour = new Date().getHours();
    let salam = "Selamat Datang";

    if (hour < 11) salam = "Selamat Pagi";
    else if (hour < 15) salam = "Selamat Siang";
    else if (hour < 19) salam = "Selamat Sore";
    else salam = "Selamat Malam";

    console.log(`Sistem Berhasil Dimuat. Jam: ${hour}. Pesan: ${salam}`);
    // Kamu bisa ganti teks header secara dinamis
    // document.querySelector('header p').innerText = `${salam}, Warga RT 01!`;
};

let saldoSekarang = 2500000;
const targetDana = 5000000;

function simulasiBayarIuran() {
    // Tambahkan 50 ribu setiap diklik
    saldoSekarang += 50000;
    
    // Update teks saldo (menggunakan fungsi bawaan JS untuk format Rupiah)
    document.getElementById('saldo-tekstual').innerText = "Rp " + saldoSekarang.toLocaleString('id-ID');
    
    // Hitung persentase untuk bar
    let persen = (saldoSekarang / targetDana) * 100;
    if (persen > 100) persen = 100; // Mentok di 100%
    
    // Update lebar bar kas
    document.getElementById('bar-kas').style.width = persen + "%";
    
    if(persen >= 100) {
        alert("Hore! Target Dana Aspal Tercapai!");
    }
}