/* KO/EN 전환: data-lang="ko|en" 요소를 언어에 맞게 보여 줍니다.
   우선순위: ?lang=en|ko → localStorage → 기본 ko */
(function () {
  var KEY = 'appbee-lang', root = document.documentElement;
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'ko' || q === 'en') { try { localStorage.setItem(KEY, q); } catch (e) {} return q; }
    try { var s = localStorage.getItem(KEY); if (s === 'ko' || s === 'en') return s; } catch (e) {}
    return 'ko';
  }
  function apply(lang) {
    root.lang = lang;
    var t = root.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    var imgs = document.querySelectorAll('img[data-alt-en]');
    for (var j = 0; j < imgs.length; j++) {
      var im = imgs[j];
      if (!im.hasAttribute('data-alt-ko')) im.setAttribute('data-alt-ko', im.alt);
      im.alt = im.getAttribute('data-alt-' + lang);
    }
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-set-lang') === lang ? 'true' : 'false');
    }
  }
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.lang);
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-set-lang]');
      if (!b) return;
      var lang = b.getAttribute('data-set-lang');
      try { localStorage.setItem(KEY, lang); } catch (err) {}
      apply(lang);
    });
  });
})();
