const form = document.getElementById('formLogin')

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}

  data.forEach((value, key) => obj[key] = value)

  fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Unexpected response');
      }
      return response.json(); // Parse response body as JSON
    })
    .then((data) => {
      console.log(data.token);
      alert("You have logged in successfully"); // Send success message
    })
    .catch(error => {
      console.error('error with login.js', error);
    });
  
  
  });