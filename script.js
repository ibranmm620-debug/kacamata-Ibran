
// NOMOR WHATSAPP TOKO
// Ganti dengan nomor WhatsApp asli.
// Gunakan kode negara 62 tanpa tanda + atau angka 0 di depan.

const nomorWhatsApp = "6281234567890";

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");

let activeCategory = "semua";

// PENCARIAN DAN FILTER PRODUK
function filterProducts() {
    const keyword = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();

        const title = product.querySelector(".card-title")
            .textContent.toLowerCase();

        const category = product.dataset.category;

        const matchesSearch =
            name.includes(keyword) || title.includes(keyword);

        const matchesCategory =
            activeCategory === "semua" ||
            category === activeCategory;

        const visible = matchesSearch && matchesCategory;

        product.style.display = visible ? "flex" : "none";

        if (visible) visibleCount++;
    });

    noResults.style.display =
        visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterProducts);

// TOMBOL KATEGORI
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        activeCategory = button.dataset.category;

        filterProducts();
    });
});

// PEMBELIAN MELALUI WHATSAPP
document.querySelectorAll(".btn-buy").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const product = button.dataset.product;

        const price = Number(button.dataset.price)
            .toLocaleString("id-ID");

        const message =
            `Halo Toko Kacamata Ibran, saya tertarik membeli ${product} dengan harga Rp ${price}. Apakah produknya masih tersedia?`;

        const url =
            "https://wa.me/" + nomorWhatsApp +
            "?text=" + encodeURIComponent(message);

        window.open(url, "_blank");
    });
});

// BANTUAN CUSTOMER SERVICE
document.getElementById("csButton").href =
    "https://wa.me/" + nomorWhatsApp +
    "?text=" + encodeURIComponent(
        "Halo Toko Kacamata Ibran, saya ingin bertanya tentang produk kacamata."
    );
