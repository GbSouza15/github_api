const input = document.getElementById('camp-input') as HTMLInputElement

const btnSearch = document.getElementById('btn-search') as HTMLButtonElement

const list = document.querySelector('.repos-list') as HTMLUListElement

const avatar = document.getElementById('avatar') as HTMLImageElement

function createElements(response: any) {

    response.map((repo: any) => {
        if (repo.language == null) {
            let li = document.createElement('li')

            li.innerHTML = `
                <div class="repo-name"><a href="https://github.com/${repo.full_name}" target="_blank">${repo.name}</a></div>
                 <div><span>Linguagem não identificada</span></div>
            `
            list.appendChild(li)
        } else {
            let li = document.createElement('li')
            li.innerHTML = `
                    <div class="repo-name"><a href="https://github.com/${repo.full_name}" target="_blank">${repo.name}</a></div>
                    <div class="type-language">${repo.language}</div>
                `
            list.appendChild(li)
        }
    })

    avatar.style.backgroundImage = `url(${response[0].owner.avatar_url})`
}

btnSearch.addEventListener('click', (e) => {
    list.innerHTML = ''

    avatar.style.backgroundImage = `none`

    e.preventDefault()

    let user: string = input.value

    let url: string = `https://api.github.com/users/${user}/repos`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            createElements(data)
        })
})