console.log('hello from the browser JavaScript')

const deletePopup = (id) => {
  if (confirm("Are you sure you want to delete this review?")) {
    fetch(`/review/delete/${id}`, {
      method: 'delete',
      credentials: 'include',
    })
    .then(() => {
      document.getElementById(`${id}`).remove()
    })
  }
}
