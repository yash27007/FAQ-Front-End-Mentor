"use strict";

window.addEventListener("load", function() {
  // Variables
  const faqContainer = document.querySelector(".container");
  const faqItems = [...document.querySelectorAll(".item")];

  // Functions
  const displayActiveIcon = function(activeIcon, inactiveIcon) {
    activeIcon.style.display = "block";
    inactiveIcon.style.display = "none";
  };

  const closeFaqItems = function() {
    faqItems.forEach(faqItem => {
      const headerHeight = faqItem.querySelector(".item__header").scrollHeight;
      faqItem.style.maxHeight = `${headerHeight}px`;
      faqItem.dataset.openFaqList = "false";
      displayActiveIcon(
        faqItem.querySelector(".icon-plus"),
        faqItem.querySelector(".icon-minus")
      );
    });
  };

  closeFaqItems();

  // Faq Item Click Event
  faqContainer.addEventListener("click", function(event) {
    if (event.target.closest(".item__header")) {
      const targetFaqItem = event.target.closest(".item__header").closest(".item");
      if (targetFaqItem.dataset.openFaqList === "false") {
        closeFaqItems();
        targetFaqItem.style.maxHeight = `${targetFaqItem.scrollHeight}px`;
        targetFaqItem.dataset.openFaqList = "true";
        displayActiveIcon(
          targetFaqItem.querySelector(".icon-minus"),
          targetFaqItem.querySelector(".icon-plus")
        );
      } else {
        closeFaqItems();
      }
    }
  });

  faqContainer.addEventListener("keydown", function(event) {
    if (event.target.closest(".item__header") && event.keyCode === 13) {
      const faqItem = event.target.closest(".item");
      if (faqItem.dataset.openFaqList === "false") {
        closeFaqItems();
        faqItem.style.maxHeight = `${faqItem.scrollHeight}px`;
        faqItem.dataset.openFaqList = "true";
        displayActiveIcon(
          faqItem.querySelector(".icon-minus"),
          faqItem.querySelector(".icon-plus")
        );
      } else {
        closeFaqItems();
      }
    }
  });

  // Resize Observer
  let initialFaqContainerWidth = faqContainer.offsetWidth;

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      const { width } = entry.contentRect;
      if (initialFaqContainerWidth !== width) {
        faqItems.forEach(faqItem => {
          if (faqItem.dataset.openFaqList === "false") {
            const faqItemHeader = faqItem.querySelector(".item__header");
            faqItem.style.maxHeight = `${faqItemHeader.offsetHeight}px`;
          } else {
            faqItem.style.maxHeight = `${faqItem.scrollHeight}px`;
          }
        });
      }
    }
  });

  resizeObserver.observe(faqContainer);
});
