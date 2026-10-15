/* Site switches — flip and redeploy to change behaviour. */
window.ANCHOR_MAINTENANCE = false; // set to false to reopen the full site

(function () {
  if (!window.ANCHOR_MAINTENANCE) return;
  var path = location.pathname || '';
  if (/\/maintenance(\.html)?$/i.test(path)) return;
  // Bypass: open any page with ?preview=1 while maintenance is on
  if (/(?:^|[?&])preview=1(?:&|$)/.test(location.search || '')) return;
  location.replace('/maintenance');
})();
