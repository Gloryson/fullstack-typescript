

export function addItemToDB (text: string): void {
  fetch(`http://${window.location.hostname}:3001/db/add?text=${text}`)
    .then(response => response.json())
    .then(() => {})
    .catch((error) => console.error(error));
}

export function editItemInDB (id: string, text: string): void {
  fetch(`http://${window.location.hostname}:3001/db/edit?id=${id}&text=${text}`)
    .then(response => response.json())
    .then(() => {})
    .catch((error) => console.error(error));
}

export function deleteItemInDB (id: string): void {
  fetch(`http://${window.location.hostname}:3001/db/del?id=${id}`)
    .then(response => response.json())
    .then(() => {})
    .catch((error) => console.error(error));
}