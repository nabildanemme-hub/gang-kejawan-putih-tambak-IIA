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



// Fungsi Membuka Lightbox
function openLightbox(element) {
    const imgUrl = element.querySelector('img').src;
    const caption = element.querySelector('.pin-desc').innerText;
    
    document.getElementById('lightbox-img').src = imgUrl;
    document.getElementById('lightbox-caption').innerText = caption;
    document.getElementById('lightbox').style.display = 'flex';
}

// Fungsi Menutup Lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Fungsi untuk menghilangkan loading tepat setelah 3 detik
window.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader-wrapper");
    
    // Ubah ke 2000 milidetik (2 detik)
    setTimeout(() => {
        loader.classList.add("loader-hidden");
        
        // Hapus elemen dari tampilan agar tidak mengganggu klik di bawahnya
        setTimeout(() => {
            loader.style.display = "none";
        }, 500); 
        
    }, 2000); 
});




  // Fungsi untuk mengecek dan memunculkan iklan
  function cekDanMunculkanIklan() {
    const durasi4Jam = 4 * 60 * 60 * 1000; // 4 jam dalam milidetik
    const sekarang = new Date().getTime();
    const terakhirMuncul = localStorage.getItem("lastIklanTime");

    // Jika belum pernah muncul ATAU sudah lewat dari 4 jam
    if (!terakhirMuncul || (sekarang - terakhirMuncul > durasi4Jam)) {
      setTimeout(function() {
        const modal = document.getElementById("iklanModal");
        if (modal) {
          modal.style.display = "flex";
          // Catat waktu muncul di browser warga
          localStorage.setItem("lastIklanTime", sekarang);
        }
      }, 3000); // Muncul setelah 3 detik
    } else {
      console.log("Iklan masih dalam masa jeda 4 jam.");
    }
  }

  // Fungsi untuk menutup iklan
  function tutupPopup() {
    const modal = document.getElementById("iklanModal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  // Klik di area hitam (luar gambar) untuk menutup
  window.onclick = function(event) {
    const modal = document.getElementById("iklanModal");
    if (event.target == modal) {
      tutupPopup();
    }
  }



function cariUMKM() {
    // 1. Njupuk opo sing diketik warga
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // 2. Nggoleki kabeh kartu sing duwe class 'card-umkm'
    let cards = document.getElementsByClassName('card-umkm');

    for (let i = 0; i < cards.length; i++) {
        // 3. Njupuk keyword teko atribut 'data-name'
        let name = cards[i].getAttribute('data-name').toLowerCase();
        
        // 4. Njupuk teks teko judul (h3) ben pencariane luwih akurat
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        
        // 5. Cocokno: nek ono isine, tampilno. Nek gak ono, dhelikno.
        if (name.includes(input) || title.includes(input)) {
            cards[i].style.display = ""; // Tampil
        } else {
            cards[i].style.display = "none"; // Hilang
        }
    }
}


function cekStatusToko() {
    // Ambil jam sekarang (format 0-23)
    const jamSekarang = new Date().getHours();
    
    // Ambil semua kartu UMKM
    const kartuUMKM = document.querySelectorAll('.card-umkm');

    kartuUMKM.forEach(card => {
        const jamBuka = parseInt(card.getAttribute('data-buka'));
        const jamTutup = parseInt(card.getAttribute('data-tutup'));
        const statusLabel = card.querySelector('.status-toko');

        if (jamSekarang >= jamBuka && jamSekarang < jamTutup) {
            statusLabel.innerText = "● SEDANG BUKA";
            statusLabel.className = "status-toko status-buka";
        } else {
            statusLabel.innerText = "○ SUDAH TUTUP";
            statusLabel.className = "status-toko status-tutup";
        }
    });
}

window.onload = function() {
    // 1. Jalankan Jam
    updateClock(); 
    setInterval(updateClock, 1000); 

    // 2. Jalankan Status Toko
    cekStatusToko();

    // 3. Jalankan Iklan
    cekDanMunculkanIklan();

    // 4. Masukkan logika "Salam" ke sini (ini hasil gabungan tadi)
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



