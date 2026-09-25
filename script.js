/* ==========================================================================
   Личный дневник — общий скрипт
   1) Открытие/закрытие мобильного меню (гамбургер)
   2) Простая клиентская валидация формы входа на index.html
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Мобильное меню ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".nav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("nav--open");
    document.body.classList.remove("nav-lock");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    if (!nav) return;
    var isOpen = nav.classList.toggle("nav--open");
    document.body.classList.toggle("nav-lock", isOpen);
    if (burger) burger.setAttribute("aria-expanded", String(isOpen));
  }

  if (burger && nav) {
    burger.addEventListener("click", toggleNav);

    /* закрытие меню по клику на ссылку (переход на другую страницу) */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    /* закрытие меню по клику вне его области */
    document.addEventListener("click", function (event) {
      var isInsideNav = nav.contains(event.target);
      var isBurger = burger.contains(event.target);
      if (!isInsideNav && !isBurger) {
        closeNav();
      }
    });

    /* закрытие меню клавишей Escape */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ---------- Подсветка активного пункта меню по текущей странице ---------- */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[href]:not(.nav__cta)").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---------- Валидация формы входа ---------- */
  var authForm = document.querySelector(".auth-form");
  if (authForm) {
    authForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var isValid = true;

      var emailField = authForm.querySelector("#email");
      var passField = authForm.querySelector("#password");
      var emailWrap = emailField ? emailField.closest(".field") : null;
      var passWrap = passField ? passField.closest(".field") : null;

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailWrap) {
        if (!emailField.value || !emailPattern.test(emailField.value)) {
          emailWrap.classList.add("has-error");
          isValid = false;
        } else {
          emailWrap.classList.remove("has-error");
        }
      }

      if (passWrap) {
        if (!passField.value || passField.value.length < 6) {
          passWrap.classList.add("has-error");
          isValid = false;
        } else {
          passWrap.classList.remove("has-error");
        }
      }

      var msg = authForm.querySelector(".form-msg");
      if (msg) {
        if (isValid) {
          msg.textContent = "Вход выполнен успешно (демо-режим, без сервера).";
          msg.classList.add("show");
        } else {
          msg.textContent = "Проверьте правильность заполнения полей.";
          msg.classList.add("show");
        }
      }
    });
  }

  /* ---------- Фильтр по настроению в ленте записей ---------- */
  var chips = document.querySelectorAll(".chip[data-mood]");
  var cards = document.querySelectorAll(".entry-card[data-mood]");
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var mood = chip.getAttribute("data-mood");
        cards.forEach(function (card) {
          var match = mood === "all" || card.getAttribute("data-mood") === mood;
          card.style.display = match ? "" : "none";
        });
      });
    });
  }
})();
