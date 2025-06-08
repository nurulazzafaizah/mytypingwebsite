document.addEventListener("DOMContentLoaded", function () {
const registrasiBtn = document.querySelector(".btn.primary");
const loginBtn = document.querySelector(".btn.secondary");

if (registrasiBtn) {
registrasiBtn.addEventListener("click", () => {
    window.location.href = "login.html";
});
}

if (loginBtn) {
loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
});
}
});
