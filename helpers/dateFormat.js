export default function formatDate() {
    const days      = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months    = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const date      = new Date().getDate();
    const day       = new Date().getDay();
    const month     = new Date().getMonth();
    const year      = new Date().getFullYear();


    let seconds     = new Date().getSeconds();
    if (seconds < 10) {
        seconds     = `0${seconds}`;
    }

    let minutes     = new Date().getMinutes();
    if (minutes < 10) {
        minutes     = `0${minutes}`;
    }

    let hour        = new Date().getHours();
    if (hour < 10) {
        hour        = `0${hour}`;
    }

    return `${days[day]}, ${date} ${months[month]} ${year} ${hour}:${minutes}:${seconds}`;
}