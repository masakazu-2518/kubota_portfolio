const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
});

document.querySelectorAll(".menu-item a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});
document.querySelector(".menu-stage .back-top").addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    document.body.classList.remove("no-scroll");
});
// like
const likeDriver = document.querySelector(".like-driver");
const likeCards = document.querySelectorAll(".like-card");
const likeSoshite = document.querySelector(".like-soshite");

const depthFill = document.querySelector(".depth-fill");
const depthDot = document.querySelector(".depth-dot");
const depthNum = document.querySelector(".depth-num");
const depthZones = document.querySelectorAll(".depth-zone");

function getLikeProgress() {
    const start = likeDriver.offsetTop;
    const end = start + likeDriver.offsetHeight - window.innerHeight;
    const progress = (window.scrollY - start) / (end - start);

    return Math.min(Math.max(progress, 0), 1);
}

function updateLike() {
    const progress = getLikeProgress();

    const meterProgress = Math.min(progress / 0.90, 1);
    const depth = Math.round(meterProgress * 11000);
    const percent = meterProgress * 100;

    depthFill.style.height = percent + "%";
    depthDot.style.bottom = percent + "%";
    depthNum.textContent = depth.toLocaleString("ja-JP");

    const scrollHint = document.querySelector(".scroll-hint");
    if (depth < 1200) {
        scrollHint.style.opacity = "1";
    } else {
        scrollHint.style.opacity = "0";
    }

    depthZones[0].classList.toggle("is-lit", depth >= 4000);
    depthZones[1].classList.toggle("is-lit", depth >= 1000);
    depthZones[2].classList.toggle("is-lit", depth >= 200);

    likeCards.forEach((card) => {
        card.classList.remove("is-show", "is-out");
    });

    if (progress >= 0.10 && progress < 0.82) {
        likeCards[0].classList.add("is-show");
    }

    if (progress >= 0.28 && progress < 0.82) {
        likeCards[1].classList.add("is-show");
    }

    if (progress >= 0.46 && progress < 0.82) {
        likeCards[2].classList.add("is-show");
    }

    if (progress >= 0.82 && progress < 0.90) {
        likeCards.forEach((card) => {
            card.classList.add("is-out");
        });
    }

    likeSoshite.classList.toggle("is-show", progress >= 0.88 && progress < 0.96);


    document.querySelector(".depth-meter").style.opacity = progress >= 0.96 ? "0" : "1";

}

if (
    likeDriver &&
    likeCards.length === 3 &&
    likeSoshite &&
    depthFill &&
    depthDot &&
    depthNum &&
    depthZones.length === 3
) {
    window.addEventListener("scroll", updateLike);
    window.addEventListener("resize", updateLike);
    updateLike();
}

const finalSection = document.querySelector(".final-section");
const finalOverlay = document.querySelector(".final-overlay");
const airBubble = document.querySelector(".air-bubble");
const finalIllustCopy = document.querySelector(".final-illust-copy");

function updateFinal() {
    if (!finalSection || !finalOverlay || !airBubble) return;

    const start = finalSection.offsetTop;
    const end = start + finalSection.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);

    finalOverlay.classList.toggle("is-show", progress >= 0.25);
    finalIllustCopy.classList.toggle("is-show", progress >= 0.25);
    airBubble.classList.toggle("is-show", progress >= 0.45);
}

window.addEventListener("scroll", updateFinal);
window.addEventListener("resize", updateFinal);
updateFinal();
