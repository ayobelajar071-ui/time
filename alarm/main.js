//const and let
const btn2 = document.getElementById("btn2")
const btn1 = document.getElementById("btn1")
const btn = document.getElementById("btn")
const input = document.getElementById("nomor")
const inputSuara = document.getElementById("suara");
let audio = new Audio();
let ingat;
let waktu;
let angka;

// yg membuat detik jadi menit

function formatTampilan(totalDetik) {
  let menit = Math.floor(totalDetik / 60);
  let detik = totalDetik % 60;

  let tampilanMenit = String(menit).padStart(2, '0');
  let tampilanDetik = String(detik).padStart(2, '0');

  return `${tampilanMenit}:${tampilanDetik}`;
}


// membuar nomor menghitung mundur
function masuk() {
  if (input.value !== "") {
    angka = parseInt(input.value);
    input.value = "";
  }

  if (isNaN(angka) || angka <= 0) {
    alert("Silakan masukkan angka detik yang valid!");
    return;
  }

  document.getElementById("text").innerHTML = formatTampilan(angka);

  clearInterval(waktu);

  waktu = setInterval(function (event) {
    angka--;
    document.getElementById("text").textContent = formatTampilan(angka);
    
    if (angka <= 0) {
      clearInterval(waktu)
      audio.play();
      ingat = alert("habis")
      audio.pause();
      waktu = null;
      angka = null;
      document.getElementById("text").innerHTML = 0

    }
  }, 1000);
}


// reset
function reset() {
  clearInterval(waktu)
  document.getElementById("text").textContent = 0
}

function resume(){
  
  clearInterval(waktu);

  waktu = setInterval(function (event) {
    angka--;
    document.getElementById("text").textContent = formatTampilan(angka);

     if (angka <= 0) {
      clearInterval(waktu)
      audio.play();
      ingat = alert("habis")
      audio.pause();
      waktu = null;
      angka = null;
      document.getElementById("text").innerHTML = 0

    }
},1000);
}


// pause/resume
function pause() {
  if (waktu) {
    clearInterval(waktu)
    waktu = null;
    document.getElementById("btn2").innerHTML = "resume"
  }
  else {
    resume()
    document.getElementById("btn2").innerHTML = "pause"
  }
}

// yg membuat tombol berfungsi
btn2.addEventListener("click", pause)
btn1.addEventListener("click", reset)
btn.addEventListener("click", masuk);

// Fungsi untuk memasukkan file ke dalam audio
inputSuara.addEventListener("change", function() {
  const file = this.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    audio.src = url; // Memasang file MP3 yang kamu pilih ke alarm
    console.log("Suara alarm berhasil dipasang!");
    }
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    masuk();
  }
});