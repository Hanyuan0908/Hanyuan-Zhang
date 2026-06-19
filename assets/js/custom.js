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

// ---- Publications: live filter ----
// Filters by anything visible in each publication entry and hides empty years.
(function () {
	var input = document.getElementById('pub-filter-input');
	if (!input) return;

	var yearGroups = Array.prototype.slice.call(document.querySelectorAll('.pub-year-group'));
	var emptyState = document.getElementById('pub-filter-empty');

	function normalize(text) {
		return (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
	}

	function applyFilter() {
		var query = normalize(input.value);
		var anyVisible = false;

		yearGroups.forEach(function (group) {
			var items = Array.prototype.slice.call(group.querySelectorAll('.pub-item'));
			var visibleInGroup = 0;

			items.forEach(function (item) {
				var matches = !query || normalize(item.textContent).indexOf(query) !== -1;
				item.hidden = !matches;
				if (matches) visibleInGroup += 1;
			});

			group.hidden = (visibleInGroup === 0);
			if (visibleInGroup > 0) anyVisible = true;
		});

		if (emptyState) emptyState.hidden = anyVisible;
	}

	input.addEventListener('input', applyFilter);
	applyFilter();
})();
