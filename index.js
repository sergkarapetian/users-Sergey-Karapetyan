const API_URL = "https://api.github.com/users";
const table = document.querySelector(".userCollec");
const body = document.querySelector(".body");
const section = document.querySelector(".section");

const rightDiv = document.querySelector(".rightDiv");

const likedMembersBtn = document.querySelector(".likedMembers");

const addedUsersDiv = document.querySelector(".addedUsersDiv");
const addedUsers = document.querySelector(".addedUsers");
const addedMembersBtn = document.querySelector(".addedMembers");

fetch(API_URL)
  .then((data) => data.json())
  .then((users) => {
    //users fetch
    users.map((user) => {
      const USER = {
        AVATAR: user.avatar_url,
        LOGIN: user.login,
        ID: user.id,
        NODE_ID: user.node_id,
        TYPE: user.type,
        STATUS: user.site_admin,
        PAGE_URL: user.html_url,
      };

      //see users
      const userCard = document.createElement("div");
      const avatarDiv = document.createElement("div");
      const avatar = document.createElement("img");
      const loginDiv = document.createElement("div");
      const login = document.createElement("a");
      const statusDiv = document.createElement("div");
      const status = document.createElement("a");
      const btnDiv = document.createElement("div");
      const btn = document.createElement("button");
      const likeDiv = document.createElement("div");
      const like = document.createElement("i");
      const addUserDiv = document.createElement("div");
      const addUser = document.createElement("i");
      const restInfoDiv = document.createElement("div");
      const restInfo = document.createElement("p");
      const text = document.createElement("a");

      const moreInfo = document.createElement("div");
      const removeUserDiv = document.createElement("div");
      const removeUser = document.createElement("i");

      userCard.classList.add("userCard");
      avatarDiv.classList.add("avatarDiv");
      avatar.classList.add("avatar");
      loginDiv.classList.add("loginDiv");
      login.classList.add("login");
      btnDiv.classList.add("btnDiv");
      btn.classList.add("btn");

      avatar.src = USER.AVATAR;
      login.innerText = USER.LOGIN;
      btn.innerText = "More";
      userCard.id = USER.ID;
      status.innerText = USER.STATUS ? "Admin" : "User";

      like.setAttribute("id", USER.ID);
      addUser.setAttribute("id", USER.ID);

      like.classList.add("fa-regular", "fa-heart");
      addUser.classList.add("fa-solid", "fa-user-plus", "not-added");

      avatarDiv.appendChild(avatar);
      loginDiv.appendChild(login);
      statusDiv.appendChild(status);
      likeDiv.appendChild(like);
      btnDiv.appendChild(btn);
      addUserDiv.appendChild(addUser);
      userCard.appendChild(avatarDiv);
      userCard.appendChild(loginDiv);
      userCard.appendChild(statusDiv);
      userCard.appendChild(likeDiv);
      userCard.appendChild(addUserDiv);
      table.appendChild(userCard);
      removeUserDiv.appendChild(removeUser);

      //user's info
      btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        if (btn.classList.contains("active")) {
          btn.innerText = "Less";
          text.innerText = `See ${USER.LOGIN}'s GitHub`;
          restInfo.innerText = `
          Node ID: ${USER.NODE_ID}
          Type: ${USER.TYPE}
          Admin: ${USER.STATUS === true ? "Yes" : "No"}
          `;

          restInfo.appendChild(text);
          text.addEventListener("click", () => {
            window.open(USER.PAGE_URL);
          });
        } else {
          btn.innerText = "More";
          restInfo.innerText = "";
        }

        userCard.classList.toggle("moreInfoCard");
        restInfoDiv.appendChild(restInfo);
        userCard.appendChild(restInfoDiv);
      });

      // like user, dislike user
      like.addEventListener("click", () => {
        like.classList.toggle("fa-solid");
        userCard.classList.toggle("liked");
      });

      //add user, remove user
      addUser.addEventListener("click", () => {
        addUser.classList.toggle("not-added");
        userCard.classList.toggle("added");
      });

      //added users
      addedMembersBtn.addEventListener("click", () => {
        addedUsersDiv.classList.add("block");
        body.classList.add("bluredBody");
        rightDiv.classList.add("block");

        addedUsers.classList.add("block");
        section.appendChild(addedUsersDiv);
        if (userCard.classList.contains("added")) {
          moreInfo.appendChild(userCard);
          moreInfo.appendChild(btnDiv);
          moreInfo.appendChild(removeUserDiv);
          addedUsers.appendChild(moreInfo);
        }
      });

      // right div
      rightDiv.addEventListener("click", () => {
        if (addedUsersDiv.classList.contains("block")) {
          addedUsersDiv.classList.remove("block");
        }

        body.classList.remove("bluredBody");
        rightDiv.classList.remove("block");
      });

      //remove added user
      removeUser.addEventListener("click", () => {
        userCard.classList.remove("added");
      });
    });
  });
