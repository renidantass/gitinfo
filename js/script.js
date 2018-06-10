var navBurguer = document.getElementById('navBurguer');
var navMenu = document.getElementById('navMenu');
var input = document.getElementById('searchInput');
var blocks = document.getElementById('blocks');

function getRepos() {
	const secretCode = '?client_id=62959940d7f2649e37c0&client_secret=f835e57d95efa9d6f57ec7a0c3e2ca246e3962f6';
	var url = `https://api.github.com/users/${input.value}/repos${secretCode}`;
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			var response = JSON.parse(xhr.responseText);
			response.forEach((element) => {
				var icon = element.fork == false ? '<i class="fas fa-book has-text-black" aria-hidden="true"></i>' : '<i class="fas fa-code-branch has-text-black" aria-hidden="true"></i>';
				blocks.innerHTML += `<a href="${element.html_url}" class="panel-block has-text-black"><span class="panel-icon">` + icon + '</span>' + `<span class="has-text-dark">${element.owner.login}</span>` + '/' + element.name + `&nbsp;&nbsp;<i class="fa fa-code has-text-dark"></i>&nbsp; ${element.language}` + '</a>';
			});
		}
	}
	xhr.open('GET', url);
	xhr.send();
}

// handling the waypoint
window.onload = function() {
	var el = document.getElementById('githubIcon');
	var waypoint = new Waypoint({
		element: el,
		handler: function() {
			if (!el.classList.contains('bounceInLeft')) {
				el.classList.toggle('bounceInLeft');
				el.classList.toggle('show');
			}
		},
		offset: '40%'
	});

	var elements = [document.getElementById('bookIcon'), document.getElementById('codeIcon')];
	elements.forEach((el) => {
		var waypoint = new Waypoint({
			element: el,
			handler: function () {
				if (el.id == 'bookIcon') {
					if (!el.classList.contains('bounceInLeft')) {
						el.classList.toggle('bounceInLeft');
					}
				} else {
					if (!el.classList.contains('bounceInRight')) {
						el.classList.toggle('bounceInRight');
					}		
				}
				el.classList.toggle('show');
			},
			offset: '60%'
		});
	});
}

// detect any key press on input
input.addEventListener('keypress', (event) => {
	if (event.keyCode == 13) {
		input.classList.remove('is-danger');
		if (!input.classList.contains('is-dark')) {
			input.classList.add('is-dark');
			getRepos();
		}
	} else {
		input.classList.remove('is-dark');
		if (!input.classList.contains('is-danger')) {
			input.classList.add('is-danger');
		}
	}
});

// event listener to handle navBurger
navBurguer.addEventListener('click', () => {
	navMenu.classList.toggle('is-active');
	navBurguer.classList.toggle('is-active');
});