// ==============================
// Select Elements
// ==============================

const gallery = document.getElementById("gallery");

const imageCards = document.querySelectorAll(".image-card");
const categoryButtons = document.querySelectorAll(".category");

const searchInput = document.getElementById("searchInput");


// Add Image Elements
const addImageButton = document.getElementById("addImageButton");
const addImageModal = document.getElementById("addImageModal");
const modalClose = document.getElementById("modalClose");

const imageUrlInput = document.getElementById("imageUrl");
const imageTitleInput = document.getElementById("imageTitle");
const imageCategoryInput = document.getElementById("imageCategory");

const saveImageButton = document.getElementById("saveImageButton");


// Lightbox Elements
const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");

const closeButton = document.getElementById("close");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");


// ==============================
// Variables
// ==============================

let selectedCategory = "all";

let currentIndex = 0;


// ==============================
// Get Visible Images
// ==============================

function getVisibleImages() {

    const allCards = document.querySelectorAll(".image-card");

    const searchText = searchInput.value.toLowerCase().trim();

    return Array.from(allCards).filter(function (card) {

        const category = card.dataset.category;

        const image = card.querySelector("img");

        const title = card.querySelector("h3");

        const categoryText = card.querySelector("p");


        const imageAlt = image
            ? image.alt.toLowerCase()
            : "";

        const titleText = title
            ? title.textContent.toLowerCase()
            : "";

        const categoryName = categoryText
            ? categoryText.textContent.toLowerCase()
            : "";


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        const matchesSearch =
            titleText.includes(searchText) ||
            imageAlt.includes(searchText) ||
            categoryName.includes(searchText);


        return matchesCategory && matchesSearch;

    });
}


// ==============================
// Filter Gallery
// ==============================

function filterGallery() {

    const allCards = document.querySelectorAll(".image-card");

    const visibleImages = getVisibleImages();


    allCards.forEach(function (card) {

        if (visibleImages.includes(card)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


// ==============================
// Category Filtering
// ==============================

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        categoryButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedCategory = button.dataset.category;


        filterGallery();

    });

});


// ==============================
// Search
// ==============================

searchInput.addEventListener("input", function () {

    filterGallery();

});


// ==============================
// Open Lightbox
// ==============================

function openLightbox(index) {

    const visibleImages = getVisibleImages();


    if (visibleImages.length === 0) {
        return;
    }


    currentIndex = index;


    const card = visibleImages[currentIndex];

    const image = card.querySelector("img");

    const title = card.querySelector("h3");

    const category = card.querySelector("p");


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;

    lightboxCategory.textContent = category.textContent;


    lightbox.classList.add("active");


    document.body.style.overflow = "hidden";

}


// ==============================
// Update Lightbox
// ==============================

function updateLightbox() {

    const visibleImages = getVisibleImages();


    if (visibleImages.length === 0) {
        closeLightbox();
        return;
    }


    const card = visibleImages[currentIndex];

    const image = card.querySelector("img");

    const title = card.querySelector("h3");

    const category = card.querySelector("p");


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;

    lightboxCategory.textContent = category.textContent;

}


// ==============================
// Close Lightbox
// ==============================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}


// ==============================
// Previous Image
// ==============================

function showPrevious() {

    const visibleImages = getVisibleImages();


    if (visibleImages.length === 0) {
        return;
    }


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex = visibleImages.length - 1;

    }


    updateLightbox();

}


// ==============================
// Next Image
// ==============================

function showNext() {

    const visibleImages = getVisibleImages();


    if (visibleImages.length === 0) {
        return;
    }


    currentIndex++;


    if (currentIndex >= visibleImages.length) {

        currentIndex = 0;

    }


    updateLightbox();

}


// ==============================
// Image Click
// ==============================

function attachImageClick(card) {

    card.addEventListener("click", function () {

        const visibleImages = getVisibleImages();

        const index = visibleImages.indexOf(card);


        if (index !== -1) {

            openLightbox(index);

        }

    });

}


document.querySelectorAll(".image-card").forEach(function (card) {

    attachImageClick(card);

});


// ==============================
// Lightbox Buttons
// ==============================

closeButton.addEventListener("click", closeLightbox);

prevButton.addEventListener("click", showPrevious);

nextButton.addEventListener("click", showNext);


// ==============================
// Close on Background Click
// ==============================

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ==============================
// Add Image Modal
// ==============================

addImageButton.addEventListener("click", function () {

    addImageModal.classList.add("active");

    document.body.style.overflow = "hidden";

});


// ==============================
// Close Add Image Modal
// ==============================

modalClose.addEventListener("click", function () {

    addImageModal.classList.remove("active");

    document.body.style.overflow = "auto";

});


// Close Modal on Background Click

addImageModal.addEventListener("click", function (event) {

    if (event.target === addImageModal) {

        addImageModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

});


// ==============================
// Save New Image
// ==============================

saveImageButton.addEventListener("click", function () {

    const imageUrl = imageUrlInput.value.trim();

    const imageTitle = imageTitleInput.value.trim();

    const imageCategory = imageCategoryInput.value;


    // Check inputs

    if (imageUrl === "" || imageTitle === "") {

        alert("Please enter image URL and title.");

        return;

    }


    // Create new card

    const newCard = document.createElement("div");

    newCard.classList.add("image-card");

    newCard.dataset.category = imageCategory;


    newCard.innerHTML = `

        <img
            src="${imageUrl}"
            alt="${imageTitle}"
        >

        <div class="image-info">

            <h3>
                ${imageTitle}
            </h3>

            <p>
                ${imageCategory}
            </p>

        </div>

    `;


    // Add card to gallery

    gallery.appendChild(newCard);


    // Make new image clickable

    attachImageClick(newCard);


    // Close modal

    addImageModal.classList.remove("active");

    document.body.style.overflow = "auto";


    // Clear inputs

    imageUrlInput.value = "";

    imageTitleInput.value = "";

    imageCategoryInput.value = "nature";


    // Refresh gallery

    filterGallery();


    alert("Image added successfully!");

});


// ==============================
// Keyboard Controls
// ==============================

document.addEventListener("keydown", function (event) {

    // Lightbox controls

    if (lightbox.classList.contains("active")) {

        if (event.key === "ArrowLeft") {

            showPrevious();

        }

        else if (event.key === "ArrowRight") {

            showNext();

        }

        else if (event.key === "Escape") {

            closeLightbox();

        }

    }


    // Add Image Modal

    if (addImageModal.classList.contains("active")) {

        if (event.key === "Escape") {

            addImageModal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    }

});