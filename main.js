window.onload = async (event) => {
  //Gets DOM elements that will be utilized
  const userTable = document.getElementsByClassName('userTable')[0];
  const postTable = document.getElementsByClassName('postTable')[0];
  const errorMsg = document.getElementsByClassName('errorMsg')[0];

  const users = await getUsers();
  //Create empty object that will later hold user posts
  const posts = {};

  if (users.length > 0) {
    generateUserTable(users);
  }

  async function getUsers() {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.json())
      .catch(err => {
        displayErrorMessage('Failed to retrieve user data');
        return [];
      });
  }

  async function getUserPosts(userId) {
    //If we have already downloaded this users posts, return them
    if (posts[userId] !== undefined) {
      return posts[userId];
    }
    //if posts for this user have not been stored yet, retrieve from api then return that user's posts
    return fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then(response => {
          response.forEach(post => {
            if (posts[post.userId] === undefined) {
              posts[post.userId] = [];
            }
          posts[post.userId].push({id: post.id, title: post.title, body: post.body});
        });
        if (posts[userId] !== undefined) {
          return posts[userId];
        } else {
          throw new Error('User not found');
        }
      })
      .catch(err => {
        displayErrorMessage(`Failed to retrieve data for user '${userId}'`);
        return [];
      });
  }

  function generateUserTable(userData) {
    // Reset Table incase this is called more than once
    userTable.innerHTML = "";
    //Create Table Header
    const header = userTable.createTHead();
    const row = header.insertRow(0);
    row.insertCell().innerHTML = "ID";
    row.insertCell().innerHTML = "Name";
    row.insertCell().innerHTML = "Username";
    row.insertCell().innerHTML = "Email";
    row.insertCell().innerHTML = "Address";
    row.insertCell().innerHTML = "Company";

    const body = userTable.createTBody();

    userData.forEach(user => {
      const row = body.insertRow();

      row.insertCell().innerHTML = user.id;
      row.insertCell().innerHTML = user.name;
      row.insertCell().innerHTML = user.username;
      row.insertCell().innerHTML = user.email;
      const address = `${user.address.street} ${user.address.suite} ${user.address.city}, ${user.address.zipcode}`
      row.insertCell().innerHTML = address;
      row.insertCell().innerHTML = user.company.name;

      row.addEventListener('click', (e) => {
        displayUserPosts(user.id, user.username);
      });
    })
  }

  async function displayUserPosts(userId, username) {
    const posts = await getUserPosts(userId);
    postTable.innerHTML = '';
    const header = postTable.createTHead();
    const row = header.insertRow(0);
    row.insertCell().innerHTML = `<h3>${username}'s posts</h3>`;
    const body = postTable.createTBody();
    posts.forEach(post => {
      const row = body.insertRow();
      row.insertCell().innerHTML = `
        <b class="postTitle">${post.title}</b>
        <br>
        <span class="postBody">${post.body}</span>
      `
    })
  }

  function displayErrorMessage(message) {
    errorMsg.classList.add('show');
    errorMsg.textContent = message;
    setTimeout(() => {errorMsg.classList.remove('show')}, 5000);
  }
};