"use strict";
const input = document.getElementById('camp-input');
const btnSearch = document.getElementById('btn-search');
const list = document.querySelector('.repos-list');
const avatar = document.getElementById('avatar');
function createElements(response) {
    response.map((repo) => {
        if (repo.language == null) {
            let li = document.createElement('li');
            li.innerHTML = `
                <div class="repo-name"><a href="https://github.com/${repo.full_name}" target="_blank">${repo.name}</a></div>
                 <div><span>Linguagem não identificada</span></div>
            `;
            list.appendChild(li);
        }
        else {
            let li = document.createElement('li');
            li.innerHTML = `
                    <div class="repo-name"><a href="https://github.com/${repo.full_name}" target="_blank">${repo.name}</a></div>
                    <div class="type-language">${repo.language}</div>
                `;
            list.appendChild(li);
        }
    });
    avatar.style.backgroundImage = `url(${response[0].owner.avatar_url})`;
}
btnSearch.addEventListener('click', (e) => {
    list.innerHTML = '';
    avatar.style.backgroundImage = `none`;
    e.preventDefault();
    let user = input.value;
    let url = `https://api.github.com/users/${user}/repos`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
        createElements(data);
    });
});
console.log('oi');
