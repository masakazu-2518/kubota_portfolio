function setupModal(cardId, modalId, closeId) {
    const card = document.getElementById(cardId);
    const modal = document.getElementById(modalId);
    const close = document.getElementById(closeId);

    if (!card || !modal || !close) return;

    function closeModal() {
        modal.classList.remove("is-open");
        document.body.classList.remove("modal-open");
    }

    card.addEventListener("click", () => {
        resetModal(modal);
        modal.classList.add("is-open");
        document.body.classList.add("modal-open");
        requestAnimationFrame(() => {
            modal.scrollTop = 0;
        });
    });

    close.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    window.addEventListener("popstate", closeModal);
}
function resetModal(modal) {
    modal.querySelectorAll(".work-modal-tab").forEach(tab => {
        tab.classList.toggle("is-active", tab.dataset.target === "pc");
    });
    modal.querySelectorAll(".work-modal-view").forEach(view => {
        view.classList.toggle("is-active", view.dataset.view === "pc");
    });
}
document.querySelectorAll(".work-modal-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        const modal = tab.closest(".work-modal");
        const target = tab.dataset.target;
        modal.querySelectorAll(".work-modal-tab").forEach(item => {
            item.classList.toggle("is-active", item === tab);
        });
        modal.querySelectorAll(".work-modal-view").forEach(view => {
            view.classList.toggle("is-active", view.dataset.view === target);
        });
    });
});
setupModal("cafe-card", "cafe-modal", "cafe-close");
setupModal("beauty-card", "beauty-modal", "beauty-close");
setupModal("business-card", "business-modal", "business-close");
setupModal("lp-card", "lp-modal", "lp-close");
setupModal("python-card", "python-modal", "python-close");

const pythonSection = document.querySelector('.python-section');
const pythonSticky = document.querySelector('.python-sticky');
const pvLeft = document.querySelector('.pv.left');
const pvRight = document.querySelector('.pv.right');
const pbg = document.querySelector('.pbg');
const pythonCard = document.querySelector('.python-card');

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 767) return;
    if (!pythonSection || !pythonSticky || !pvLeft || !pvRight || !pbg || !pythonCard) return;

    const rect = pythonSection.getBoundingClientRect();
    const total = pythonSection.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / total));

    if (progress <= 0) {
        pythonSticky.classList.remove('is-active');
        pvLeft.style.left = '50%';
        pvRight.style.left = '50%';
        pbg.style.width = '0%';
        pythonCard.classList.remove('is-show');
        return;
    }

    pythonSticky.classList.add('is-active');

    const spread = Math.min(1, progress / 0.5) * 56;
    pvLeft.style.left = (50 - spread) + '%';
    pvRight.style.left = (50 + spread) + '%';
    pbg.style.width = (spread * 2) + '%';

    if (progress > 0.6) {
        pythonCard.classList.add('is-show');
    } else {
        pythonCard.classList.remove('is-show');
    }
});
document.querySelectorAll(".work-detail-jump").forEach((button) => {
    button.addEventListener("click", () => {
        const modalInner = button.closest(".work-modal-inner");
        const detail = modalInner.querySelector(".work-detail");

        detail.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});