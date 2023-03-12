const form = document.querySelector('form');
const modal = document.getElementById('myModal');
const closeBtn = document.querySelector('.close');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const response = await fetch('/send-email', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    // Show the modal box
    modal.style.display = 'block';

    // Close the modal box when the user clicks the close button
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close the modal box when the user clicks anywhere outside of it
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  } else {
    const error = await response.json();
    alert(error.error);
  }
});
