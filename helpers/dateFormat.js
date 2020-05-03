export default function formatDate() {
    const days      = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months    = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const date      = new Date().getDate();
    const day       = new Date().getDay();
    const month     = new Date().getMonth();
    const year      = new Date().getFullYear();


    const seconds   = new Date().getSeconds();
    const minutes   = new Date().getMinutes();
    const hour      = new Date().getHours();

    return `${days[day]}, ${date} ${months[month]} ${year} ${hour}:${minutes}:${seconds}`;
}