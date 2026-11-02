(() => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".site-nav");

    if (menuButton && navigation) {
        const closeMenu = () => {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
            navigation.classList.remove("is-open");
        };

        menuButton.addEventListener("click", () => {
            const isOpen = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", String(!isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
            navigation.classList.toggle("is-open", !isOpen);
        });

        navigation.addEventListener("click", (event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    const searchInput = document.querySelector("#show-search");
    const categoryFilter = document.querySelector("#show-filter");
    const sortSelect = document.querySelector("#show-sort");
    const showGrid = document.querySelector("#show-grid");
    let showCards = [...document.querySelectorAll("[data-content-card]")];
    const searchStatus = document.querySelector("#show-search-status");

    const makeElement = (tagName, className, text) => {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    const renderShow = (show) => {
        const card = makeElement("article", `show-card show-card--${show.theme}`);
        card.dataset.contentCard = "";
        card.dataset.order = show.number;
        card.dataset.category = show.category;
        card.dataset.search = show.search;

        const artwork = makeElement("div", `card-art card-art--${show.art}`);
        artwork.setAttribute("aria-hidden", "true");
        if (show.art === "debate") {
            artwork.append(
                makeElement("span", "", show.artWords[0]),
                makeElement("b", "", show.artWords[1]),
                makeElement("span", "", show.artWords[2])
            );
        } else if (show.art === "hotseat") {
            artwork.append(makeElement("span", "", show.artWords[0]), makeElement("b", "", show.artWords[1]));
        } else {
            artwork.append(makeElement("span", "", show.artWords[0]), makeElement("i", "", show.artWords[1]));
        }

        const copy = makeElement("div", "card-copy");
        copy.append(makeElement("p", "card-kicker", show.kicker));

        const title = makeElement("h3");
        title.setAttribute("aria-label", show.titleLines.join(" "));
        show.titleLines.forEach((line, index) => {
            if (index > 0) {
                title.append(document.createElement("br"));
            }
            title.append(document.createTextNode(line));
        });

        const description = makeElement("p", "", show.description);
        const link = makeElement("a", "", `Ask about this show ↗`);
        link.href = "enquiry.html?interest=show";
        link.setAttribute("aria-label", `Ask about ${show.titleLines.join(" ")}`);
        copy.append(title, description, link);
        card.append(artwork, copy);
        return card;
    };

    const loadShowCatalogue = async () => {
        if (!showGrid || !searchStatus) {
            return;
        }

        try {
            const response = await fetch("shows.json", { headers: { Accept: "application/json" } });
            if (!response.ok) {
                throw new Error(`Show catalogue request failed with HTTP ${response.status}.`);
            }

            const shows = await response.json();
            if (!Array.isArray(shows) || shows.some((show) =>
                !show ||
                !["dark", "pink", "yellow", "green"].includes(show.theme) ||
                !["debate", "aux", "hotseat", "journey"].includes(show.art) ||
                !Array.isArray(show.titleLines) ||
                !Array.isArray(show.artWords)
            )) {
                throw new Error("Show catalogue has an invalid format.");
            }

            showGrid.replaceChildren(...shows.map(renderShow));
            showCards = [...showGrid.querySelectorAll("[data-content-card]")];
            filterShows();
        } catch (error) {
            console.error("THE HUB show catalogue could not be loaded:", error);
            searchStatus.textContent = "The saved show list is being shown; live catalogue data could not be loaded.";
        }
    };

    const filterShows = () => {
        if (!searchInput || !categoryFilter || !searchStatus) {
            return;
        }

        const getTitle = (card) => {
            const heading = card.querySelector("h3");
            return heading?.getAttribute("aria-label") || heading?.textContent.trim() || "";
        };
        const query = searchInput.value.trim().toLocaleLowerCase();
        const category = categoryFilter.value;
        const sortMode = sortSelect?.value || "featured";
        let visibleCount = 0;

        showCards.forEach((card) => {
            const searchableText = `${card.textContent} ${card.getAttribute("data-search") || ""}`.toLocaleLowerCase();
            const matchesQuery = !query || searchableText.includes(query);
            const matchesCategory = category === "all" || card.getAttribute("data-category") === category;
            const isVisible = matchesQuery && matchesCategory;
            card.hidden = !isVisible;
            visibleCount += Number(isVisible);
        });

        showCards.sort((left, right) => {
            if (sortMode === "name") {
                return getTitle(left).localeCompare(getTitle(right));
            }
            if (sortMode === "category") {
                return left.dataset.category.localeCompare(right.dataset.category) ||
                    getTitle(left).localeCompare(getTitle(right));
            }
            return Number(left.dataset.order) - Number(right.dataset.order);
        });
        showGrid?.append(...showCards);

        searchStatus.textContent = visibleCount === 0
            ? "No shows match that search. Try another word or choose a different topic."
            : `${visibleCount} ${visibleCount === 1 ? "show" : "shows"} found.`;
    };

    searchInput?.addEventListener("input", filterShows);
    categoryFilter?.addEventListener("change", filterShows);
    sortSelect?.addEventListener("change", filterShows);
    loadShowCatalogue();

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const lightboxCaption = document.querySelector(".lightbox-caption");
    const lightboxClose = document.querySelector(".lightbox-close");
    let activeGalleryButton;

    if (lightbox instanceof HTMLDialogElement && lightboxImage instanceof HTMLImageElement && lightboxCaption) {
        document.querySelectorAll("[data-lightbox]").forEach((button) => {
            button.addEventListener("click", () => {
                activeGalleryButton = button;
                lightboxImage.src = button.getAttribute("data-image") || "";
                lightboxImage.alt = button.getAttribute("data-image-alt") || "";
                lightboxCaption.textContent = button.querySelector("span")?.textContent.trim() || "";
                lightbox.showModal();
            });
        });

        lightboxClose?.addEventListener("click", () => lightbox.close());
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                lightbox.close();
            }
        });
        lightbox.addEventListener("close", () => activeGalleryButton?.focus());
    }

    const today = new Date();
    const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
    document.querySelectorAll('input[type="date"]').forEach((dateInput) => {
        dateInput.min = localDate;
    });

    const enquiryInterest = document.querySelector("#enquiry-interest");
    if (enquiryInterest instanceof HTMLSelectElement) {
        const requestedInterest = new URLSearchParams(window.location.search).get("interest");
        if (requestedInterest && [...enquiryInterest.options].some((option) => option.value === requestedInterest)) {
            enquiryInterest.value = requestedInterest;
        }
    }

    const formEmail = "katakanna18@gmail.com";
    const buildEmailDraft = (form) => {
        const formData = new FormData(form);
        const lines = [...formData.entries()]
            .filter(([name]) => !["form-name", "bot-field", "privacy-consent"].includes(name))
            .map(([name, value]) => `${name}: ${String(value)}`);
        const formLabel = form.dataset.formKind === "enquiry" ? "THE HUB website enquiry" : "THE HUB website contact";
        const subject = `${formLabel}${formData.get("topic") ? ` — ${formData.get("topic")}` : ""}`;
        return `mailto:${formEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n\n"))}`;
    };

    document.querySelectorAll("form[data-ajax-form]").forEach((form) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
                return;
            }

            const status = form.querySelector(".form-status");
            const submitButton = form.querySelector('button[type="submit"]');
            if (!(status instanceof HTMLElement) || !(submitButton instanceof HTMLButtonElement)) {
                console.error("Form status or submit button is missing.");
                return;
            }

            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.textContent = "Sending…";
            status.dataset.state = "";
            status.textContent = "Sending your message securely…";

            try {
                const payload = new URLSearchParams();
                new FormData(form).forEach((value, key) => {
                    if (typeof value === "string") {
                        payload.append(key, value);
                    }
                });

                const response = await fetch(form.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: payload.toString()
                });

                if (!response.ok) {
                    throw new Error(`Form submission failed with HTTP ${response.status}.`);
                }

                form.reset();
                status.dataset.state = "success";
                status.textContent = form.dataset.formKind === "enquiry"
                    ? "Thanks — your enquiry was received. THE HUB will follow up to discuss availability, any costs, and next steps."
                    : "Thanks — your message was received. THE HUB will follow up using the email address you provided.";
                status.focus();
            } catch (error) {
                console.error("THE HUB form submission failed:", error);
                status.dataset.state = "error";
                status.textContent = "Online delivery is unavailable right now. Your message has not been sent. ";
                const draftLink = document.createElement("a");
                draftLink.href = buildEmailDraft(form);
                draftLink.textContent = `Open an email draft to ${formEmail} and send it from your email app.`;
                status.append(draftLink);
                status.focus();
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    });

    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });
})();
