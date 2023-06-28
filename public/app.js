document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    const title = prompt('Введите новое название:')

    edit(id, title).then(() => {
      event.target.closest('li').children[0].textContent = title
    }).catch(err => {
      console.error(err);
    })
  }
})


async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}
async function edit(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT', body: JSON.stringify({ title }), headers: {
      "Content-type": "application/json"
    }
  })
}