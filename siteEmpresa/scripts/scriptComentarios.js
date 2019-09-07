let i = 0
let users = []
const nomeComment = document.getElementById('insertNomeComment')
const turmaComment = document.getElementById('turmaComment')
const txtComentario = document.getElementById('txtcomentario')
turmaComment.selectedIndex = -1

function cadastro() {
    if (!nomeComment.value) {
        if(txtComentario.value) document.getElementById('erroComment').style = ''
        if(turmaComment.selectedIndex !== -1) document.getElementById('erroTurma').style = ''
        let p = document.getElementById('erroNome')
        p.style = "visibility: visible; margin-bottom: .1vw"
    } else if (turmaComment.selectedIndex == -1) {
        if (nomeComment.value) document.getElementById('erroNome').style = ''
        if(txtComentario.value) document.getElementById('erroComment').style = ''
        let p = document.getElementById('erroTurma')
        p.style = "visibility: visible; margin-top: .2vw; margin-bottom: 0"
    } else if (!txtComentario.value) {
        if (nomeComment.value) document.getElementById('erroNome').style = ''
        if(turmaComment.selectedIndex !== -1) document.getElementById('erroTurma').style = ''
        let p = document.getElementById('erroComment')
        p.style = "visibility: visible; margin-bottom: .1vw;"
    } else {
        let user = newUser()
        users.push(user)
        while (i < users.length) {
            const date = new Date()
            const comments = document.getElementById('comments')
            const div = document.createElement('div')
            div.classList.add('roll')
            div.setAttribute("data-comment", "left")
            let h1 = document.createElement('h1')
            let h2 = document.createElement('h2')
            let p = document.createElement('p')
            let pHora = document.createElement('p')
            let img = document.createElement('img')
            h1.innerHTML = users[i].nome
            h1.id = "nomeComment"
            h2.innerHTML = users[i].sala
            h2.id = "turmaComment"
            p.innerHTML = users[i].txt
            p.id = "msgComment"
            pHora.innerHTML = `${date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}`
            pHora.id = "horaComment"
            img.src = "img/lixeira.png"
            img.classList.add('lixeira')
            div.appendChild(h1)
            div.appendChild(h2)
            div.appendChild(p)
            div.appendChild(pHora)
            div.appendChild(img)
            comments.insertAdjacentElement('afterbegin', div)
            deleteComment()
            document.getElementById('erroNome').style = ''
            document.getElementById('erroTurma').style = ''
            document.getElementById('erroComment').style = 'display:none'
            document.querySelector('form#comentario').reset()
            turmaComment.selectedIndex = -1
            document.getElementById('comments').scrollTo(0,0)
            i++
        }
    }

    function newUser() {
        let name = nomeComment.value;
        let turma = turmaComment.options[turmaComment.selectedIndex].text
        let comentario = txtComentario.value;
        return {
            nome: (name).toUpperCase(),
            sala: turma,
            txt: comentario
        }
    }
    document.getElementById('contadorCaracter').innerHTML = "Caracteres restantes: 250"
}

deleteComment()
function deleteComment() {
    let delComments = document.querySelectorAll('.lixeira')
    delComments.forEach((e) => {
        let div = e.parentNode
        e.addEventListener('click', () => {
            const senha = prompt('Digite a senha para deletar este comentário.')
            if (+senha === 123) div.parentNode.removeChild(div)
            else if(!senha){}
            else alert('Senha incorreta!')
        })
    })
}

function contadorCaracter() {
    let contador = document.getElementById('contadorCaracter')
    let caracter = txtComentario.value.length
    contador.innerHTML = `Caracteres restantes: ${250 - caracter}`
}
txtComentario.addEventListener('keydown', () => contadorCaracter())
txtComentario.addEventListener('keyup', () => contadorCaracter())