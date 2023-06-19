//const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form');
const searchInput = document.getElementById('search');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = searchInput.value;
  getGitHubUser(username);
});

function getGitHubUser(username) {
  const APIURL = `https://api.github.com/users/${username}`;

  fetch(APIURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el usuario de GitHub');
      }
      return response.json();
    })
    .then(data => {
      displayUserData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayUserData(userData) {
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('result-container');

  const usernameElement = document.createElement('h2');
  const linkElement = document.createElement('a');
  linkElement.href = userData.html_url;
  linkElement.target = '_blank';
  linkElement.textContent = userData.login;
  usernameElement.appendChild(linkElement);
  resultContainer.appendChild(usernameElement);

  const avatarElement = document.createElement('img');
  avatarElement.src = userData.avatar_url;
  resultContainer.appendChild(avatarElement);

  const followersElement = document.createElement('p');
  followersElement.textContent = `Followers: ${userData.followers}`;
  resultContainer.appendChild(followersElement);

  const reposElement = document.createElement('p');
  reposElement.textContent = `Repos: ${userData.public_repos}`;
  resultContainer.appendChild(reposElement);

  document.body.appendChild(resultContainer);
}
