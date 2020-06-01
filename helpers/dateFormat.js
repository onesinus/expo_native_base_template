export default function formatDate(datetime = Date.now(), type='datetime') {
    const days      = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months    = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dateObj = new Date(datetime);

    const date      = dateObj.getDate();
    const day       = dateObj.getDay();
    const month     = dateObj.getMonth();
    const year      = dateObj.getFullYear();


    let seconds     = dateObj.getSeconds();
    if (seconds < 10) {
        seconds     = `0${seconds}`;
    }

    let minutes     = dateObj.getMinutes();
    if (minutes < 10) {
        minutes     = `0${minutes}`;
    }

    let hour        = dateObj.getHours();
    if (hour < 10) {
        hour        = `0${hour}`;
    }

    if (type === 'datetime') {
        return `${days[day]}, ${date} ${months[month]} ${year} ${hour}:${minutes}:${seconds}`;
    }else if(type === 'date') {
        return `${days[day]}, ${date} ${months[month]} ${year}`;
    }else if(type === 'time') {
        return `${hour}:${minutes}:${seconds}`;
    }
}