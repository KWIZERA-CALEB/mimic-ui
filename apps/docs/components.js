const components = await fetch('/components-data.json').then((response) => response.json());
const categories = ['All', ...new Set(components.map((component) => component.category))];
const grid = document.querySelector('#component-grid');
const dialog = document.querySelector('#component-dialog');
const search = document.querySelector('#component-search');
const frameworkFilter = document.querySelector('#framework-filter');
const languageFilter = document.querySelector('#language-filter');
const detailFramework = document.querySelector('#detail-framework');
const detailLanguage = document.querySelector('#detail-language');
let activeCategory = 'All';
let selected = components[0];

const categoryFilters = document.querySelector('#category-filters');
for (const category of categories) {
	const button = document.createElement('button');
	button.type = 'button';
	button.className = category === 'All' ? 'category-chip selected' : 'category-chip';
	button.textContent = category;
	button.addEventListener('click', () => {
		activeCategory = category;
		categoryFilters
			.querySelectorAll('button')
			.forEach((item) => item.classList.remove('selected'));
		button.classList.add('selected');
		render();
	});
	categoryFilters.append(button);
}

function render() {
	const query = search.value.trim().toLowerCase();
	const visible = components.filter((component) => {
		const matches = `${component.title} ${component.description} ${component.category}`
			.toLowerCase()
			.includes(query);
		return matches && (activeCategory === 'All' || component.category === activeCategory);
	});
	grid.innerHTML = visible
		.map(
			(component) => `
		<article class="catalog-card">
			<button type="button" class="catalog-card-open" data-component="${component.name}" aria-label="Preview ${component.title}">
				<div class="catalog-card-head"><span>${component.category}</span><span>↗</span></div>
				<div class="catalog-card-preview">${component.preview}</div>
				<div class="catalog-card-info"><h2>${component.title}</h2><p>${component.description}</p><span class="catalog-card-code">${component.exports}</span></div>
			</button>
			<button type="button" class="catalog-add" data-add="${component.name}" aria-label="Copy add command for ${component.title}">+ Add</button>
		</article>`,
		)
		.join('');
	document.querySelector('#component-count').textContent = String(visible.length);
	document.querySelector('#empty-state').hidden = visible.length > 0;
	grid.querySelectorAll('[data-component]').forEach((button) =>
		button.addEventListener('click', () => openDetail(button.dataset.component)),
	);
	grid.querySelectorAll('[data-add]').forEach((button) =>
		button.addEventListener('click', () => copyText(`mimic add ${button.dataset.add}`, button)),
	);
}

function codeFor(component) {
	const framework = detailFramework.value;
	if (framework === 'angular') return component.snippets.angular;
	if (framework === 'vue') return component.snippets.vue;
	if (framework === 'react-native') return component.snippets['react-native'];
	return component.snippets.react;
}

function openDetail(name) {
	selected = components.find((component) => component.name === name) || components[0];
	detailFramework.value = frameworkFilter.value;
	detailLanguage.value = languageFilter.value;
	updateDetail();
	dialog.showModal();
}

function updateDetail() {
	document.querySelector('#detail-category').textContent = `${selected.category} / CLASSIC`;
	document.querySelector('#detail-title').textContent = selected.title;
	document.querySelector('#detail-description').textContent = selected.description;
	document.querySelector('#detail-preview').innerHTML = selected.preview;
	document.querySelector('#detail-code').textContent = codeFor(selected);
	document.querySelector('#detail-command').textContent = `mimic add ${selected.name}`;
}

async function copyText(value, button) {
	try {
		await navigator.clipboard.writeText(value);
		const previous = button.textContent;
		button.textContent = 'Copied';
		setTimeout(() => {
			button.textContent = previous;
		}, 1300);
	} catch {
		button.textContent = value;
	}
}

search.addEventListener('input', render);
frameworkFilter.addEventListener('change', render);
languageFilter.addEventListener('change', render);
detailFramework.addEventListener('change', updateDetail);
detailLanguage.addEventListener('change', updateDetail);
document.querySelector('#detail-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
	if (event.target === dialog) dialog.close();
});
document
	.querySelector('#copy-command')
	.addEventListener('click', (event) =>
		copyText(`mimic add ${selected.name}`, event.currentTarget),
	);
document
	.querySelector('#copy-usage')
	.addEventListener('click', (event) => copyText(codeFor(selected), event.currentTarget));
document.addEventListener('keydown', (event) => {
	if (event.key === '/' && document.activeElement !== search && !dialog.open) {
		event.preventDefault();
		search.focus();
	}
});
render();
