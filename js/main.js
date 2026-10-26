// ===================== KONFIGURASI =====================
const WEDDING_DATE = new Date('2027-01-15T08:00:00+07:00');

// ===================== BUKA UNDANGAN =====================
const cover = document.getElementById('cover');
const content = document.getElementById('content');

document.getElementById('open-btn').addEventListener('click', () => {
  cover.classList.add('is-hidden');
  content.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => cover.remove(), 800);
  setMusicState(true);
  initReveal();
});

// ===================== COUNTDOWN =====================
function updateCountdown() {
  const diff = WEDDING_DATE - new Date();
  if (diff <= 0) return;

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins  = Math.floor((diff / (1000 * 60)) % 60);
  const secs  = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===================== ANIMASI SAAT SCROLL =====================
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}

// ===================== TOMBOL KALENDER (.ics) =====================
document.getElementById('calendar-btn').addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:20270115T010000Z',   // 15 Januari 2027, 08.00 WIB
    'DTEND:20270115T070000Z',     // 15 Januari 2027, 14.00 WIB
    'SUMMARY:Pernikahan Amelia & Yusuf',
    'LOCATION:Lapangan Olahraga Desa Semingkir',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'pernikahan.ics';
  link.click();
  URL.revokeObjectURL(link.href);
});

// ===================== MUSIK LATAR =====================
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
music.volume = 0.5;

function setMusicState(playing) {
  if (playing) {
    music.play().catch(() => {});
    musicBtn.classList.add('is-playing');
    musicBtn.classList.remove('is-muted');
    musicBtn.textContent = '♫';
  } else {
    music.pause();
    musicBtn.classList.remove('is-playing');
    musicBtn.classList.add('is-muted');
    musicBtn.textContent = '♪';
  }
}

musicBtn.addEventListener('click', () => setMusicState(music.paused));