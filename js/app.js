(() => {
  "use strict";
  const t = {};
  let e = !0,
    s = (t = 500) => {
      document.documentElement.classList.contains("lock") ? o(t) : i(t);
    },
    o = (t = 500) => {
      let s = document.querySelector("body");
      if (e) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let t = 0; t < o.length; t++) {
            o[t].style.paddingRight = "0px";
          }
          (s.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    },
    i = (t = 500) => {
      let s = document.querySelector("body");
      if (e) {
        let o = document.querySelectorAll("[data-lp]");
        for (let t = 0; t < o.length; t++) {
          o[t].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (s.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    };
  function n(t) {
    setTimeout(() => {
      window.FLS && console.log(t);
    }, 0);
  }
  function r(t) {
    return t.filter(function (t, e, s) {
      return s.indexOf(t) === e;
    });
  }
  t.popup = new (class {
    constructor(t) {
      let e = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...e,
          ...t,
          classes: { ...e.classes, ...t?.classes },
          hashSettings: { ...e.hashSettings, ...t?.hashSettings },
          on: { ...e.on, ...t?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("??????????????????"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (t) {
          const e = t.target.closest(`[${this.options.attributeOpenButton}]`);
          if (e)
            return (
              t.preventDefault(),
              (this._dataValue = e.getAttribute(
                this.options.attributeOpenButton
              )
                ? e.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = e),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `???? ????, ???? ???????????????? ?????????????? ?? ${e.classList}`
                  )
            );
          return t.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!t.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (t.preventDefault(), void this.close())
            : void 0;
        }.bind(this)
      ),
        document.addEventListener(
          "keydown",
          function (t) {
            if (
              this.options.closeEsc &&
              27 == t.which &&
              "Escape" === t.code &&
              this.isOpen
            )
              return t.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == t.which &&
              this.isOpen &&
              this._focusCatch(t);
          }.bind(this)
        ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this)
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this)
          ));
    }
    open(t) {
      if (
        (t &&
          "string" == typeof t &&
          "" !== t.trim() &&
          ((this.targetOpen.selector = t), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const t = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute
            )}?rel=0&showinfo=0&autoplay=1`,
            e = document.createElement("iframe");
          e.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          e.setAttribute("allow", `${s}; encrypted-media`),
            e.setAttribute("src", t),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(e);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : s(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } })
          ),
          this.popupLogging("???????????? ??????????");
      } else
        this.popupLogging(
          "???? ????, ???????????? ???????????? ??????. ?????????????????? ???????????????????????? ??????????. "
        );
    }
    close(t) {
      t &&
        "string" == typeof t &&
        "" !== t.trim() &&
        (this.previousOpen.selector = t),
        this.isOpen &&
          e &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            s(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("???????????? ??????????"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let t = document.querySelector(
        `.${window.location.hash.replace("#", "")}`
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${t}"]`) &&
        t &&
        this.open(t);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(t) {
      const e = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(e),
        o = s.indexOf(document.activeElement);
      t.shiftKey && 0 === o && (s[s.length - 1].focus(), t.preventDefault()),
        t.shiftKey || o !== s.length - 1 || (s[0].focus(), t.preventDefault());
    }
    _focusTrap() {
      const t = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : t[0].focus();
    }
    popupLogging(t) {
      this.options.logging && n(`[??????????????]: ${t}`);
    }
  })({});
  let a = (t, e = !1, s = 500, i = 0) => {
    const r = "string" == typeof t ? document.querySelector(t) : t;
    if (r) {
      let a = "",
        l = 0;
      e &&
        ((a = "header.header"), (l = document.querySelector(a).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: s,
        header: a,
        offset: i,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(r, "", c);
      else {
        let t = r.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: l ? t - l : t, behavior: "smooth" });
      }
      n(`[gotoBlock]: ????????...???????? ?? ${t}`);
    } else n(`[gotoBlock]: ???? ????..???????????? ?????????? ?????? ???? ????????????????: ${t}`);
  };
  let l = {
    getErrors(t) {
      let e = 0,
        s = t.querySelectorAll("*[data-required]");
      return (
        s.length &&
          s.forEach((t) => {
            (null === t.offsetParent && "SELECT" !== t.tagName) ||
              t.disabled ||
              (e += this.validateInput(t));
          }),
        e
      );
    },
    validateInput(t) {
      let e = 0;
      return (
        "email" === t.dataset.required
          ? ((t.value = t.value.replace(" ", "")),
            this.emailTest(t) ? (this.addError(t), e++) : this.removeError(t))
          : ("checkbox" !== t.type || t.checked) && t.value
          ? this.removeError(t)
          : (this.addError(t), e++),
        e
      );
    },
    addError(t) {
      t.classList.add("_form-error"),
        t.parentElement.classList.add("_form-error");
      let e = t.parentElement.querySelector(".form__error");
      e && t.parentElement.removeChild(e),
        t.dataset.error &&
          t.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${t.dataset.error}</div>`
          );
    },
    removeError(t) {
      t.classList.remove("_form-error"),
        t.parentElement.classList.remove("_form-error"),
        t.parentElement.querySelector(".form__error") &&
          t.parentElement.removeChild(
            t.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let s = e.querySelectorAll("input,textarea");
          for (let t = 0; t < s.length; t++) {
            const e = s[t];
            e.parentElement.classList.remove("_form-focus"),
              e.classList.remove("_form-focus"),
              l.removeError(e);
          }
          let o = e.querySelectorAll(".checkbox__input");
          if (o.length > 0)
            for (let t = 0; t < o.length; t++) {
              o[t].checked = !1;
            }
          if (t.select) {
            let s = e.querySelectorAll(".select");
            if (s.length)
              for (let e = 0; e < s.length; e++) {
                const o = s[e].querySelector("select");
                t.select.selectBuild(o);
              }
          }
        }, 0);
    },
    emailTest: (t) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t.value),
  };
  t.watcher = new (class {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `??????????????????, ?????????? ???? ?????????????????? (${t.length})...`
        ),
          r(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let s = e.split("|"),
              o = { root: s[0], margin: s[1], threshold: s[2] },
              i = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  s = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  i = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === o.root &&
                  String(s) === o.margin &&
                  String(i) === o.threshold
                )
                  return t;
              }),
              n = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(i, n);
          });
      } else
        this.scrollWatcherLogging("????????, ?????? ???????????????? ?????? ????????????????. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `??????... ?????????????????????????? ?????????????? ${t.root} ?????? ???? ????????????????`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "???? ????, ?????????????????? data-watch-margin ?????????? ???????????????? ?? PX ?????? %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???????? ${e.classList}, ?????????????? ?????????? _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `?? ???? ???????? ${e.classList}, ?????????? ?????????? _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`?? ???????????????? ?????????????? ???? ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging && n(`[??????????????????????]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const s = t.target;
      this.scrollWatcherIntersecting(t, s),
        s.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(s, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  })({});
  let c = !1;
  setTimeout(() => {
    if (c) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    }),
    (function () {
      let t = document.querySelector(".icon-menu");
      t &&
        t.addEventListener("click", function (t) {
          e && (s(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function (e) {
      t.popup && t.popup.open("some");
      const s = document.forms;
      if (s.length)
        for (const t of s)
          t.addEventListener("submit", function (t) {
            o(t.target, t);
          }),
            t.addEventListener("reset", function (t) {
              const e = t.target;
              l.formClean(e);
            });
      async function o(t, s) {
        if (0 === (e ? l.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            s.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              o = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              n = new FormData(t);
            t.classList.add("_sending");
            const r = await fetch(e, { method: o, body: n });
            if (r.ok) {
              await r.json();
              t.classList.remove("_sending"), i(t);
            } else alert("????????????"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
        } else {
          s.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && a(e, !0, 1e3);
        }
      }
      function i(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          setTimeout(() => {
            if (t.popup) {
              const s = e.dataset.popupMessage;
              s && t.popup.open(s);
            }
          }, 0),
          l.formClean(e),
          n(`[??????????]: ${"?????????? ????????????????????!"}`);
      }
    })(!0),
    (function () {
      function t(t) {
        if ("click" === t.type) {
          const e = t.target;
          if (e.closest("[data-goto]")) {
            const s = e.closest("[data-goto]"),
              o = s.dataset.goto ? s.dataset.goto : "",
              i = !!s.hasAttribute("data-goto-header"),
              n = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
            a(o, i, n), t.preventDefault();
          }
        } else if ("watcherCallback" === t.type && t.detail) {
          const e = t.detail.entry,
            s = e.target;
          if ("navigator" === s.dataset.watch) {
            const t = s.id,
              o =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${t}"]`));
            e.isIntersecting
              ? o && o.classList.add("_navigator-active")
              : o && o.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", t),
        document.addEventListener("watcherCallback", t);
    })(),
    (function () {
      c = !0;
      const t = document.querySelector("header.header"),
        e = t.hasAttribute("data-scroll-show"),
        s = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
        o = t.dataset.scroll ? t.dataset.scroll : 1;
      let i,
        n = 0;
      document.addEventListener("windowScroll", function (r) {
        const a = window.scrollY;
        clearTimeout(i),
          a >= o
            ? (!t.classList.contains("_header-scroll") &&
                t.classList.add("_header-scroll"),
              e &&
                (a > n
                  ? t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")
                  : !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show"),
                (i = setTimeout(() => {
                  !t.classList.contains("_header-show") &&
                    t.classList.add("_header-show");
                }, s))))
            : (t.classList.contains("_header-scroll") &&
                t.classList.remove("_header-scroll"),
              e &&
                t.classList.contains("_header-show") &&
                t.classList.remove("_header-show")),
          (n = a <= 0 ? 0 : a);
      });
    })();
})();
