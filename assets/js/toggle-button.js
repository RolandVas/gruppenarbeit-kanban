

function menuOpen() {
  
        document.getElementById("menulist-mobil").style.display = 'flex';
        document.getElementById("tgBtn").classList.add('d-none');
        document.getElementById("tgBtnClose").classList.remove('d-none');
  
    
}

function menuClose() {

    document.getElementById("menulist-mobil").style.display = 'none';
    document.getElementById("tgBtn").classList.remove('d-none');
    document.getElementById("tgBtnClose").classList.add('d-none');
}