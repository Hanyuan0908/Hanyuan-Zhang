// ---- Research: clickable project tiles ----
// Clicking a tile reveals its matching detail panel (one at a time) and
// highlights the active tile. Clicking the active tile again hides it.
(function () {
	var tiles = Array.prototype.slice.call(document.querySelectorAll('.project-tile'));
	var details = Array.prototype.slice.call(document.querySelectorAll('.project-detail'));
	if (!tiles.length) return;

	function show(id) {
		details.forEach(function (d) { d.hidden = (d.id !== id); });
		tiles.forEach(function (t) {
			t.classList.toggle('active', t.getAttribute('data-target') === id);
		});
	}

	function hideAll() {
		details.forEach(function (d) { d.hidden = true; });
		tiles.forEach(function (t) { t.classList.remove('active'); });
	}

	tiles.forEach(function (t) {
		t.addEventListener('click', function () {
			var id = t.getAttribute('data-target');
			if (t.classList.contains('active')) {
				hideAll();                       // clicking the open one closes it
				return;
			}
			show(id);
			var panel = document.getElementById(id);
			if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		});
	});

	// Open the first project by default so the section isn't empty.
	show(tiles[0].getAttribute('data-target'));
})();
