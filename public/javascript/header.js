// Requests the server to check if user is signed in
function checkSignedIn() {
  var xml = new XMLHttpRequest();
  xml.overrideMimeType("application/json");
  xml.open('GET', 'loggedIn', true);
  xml.onreadystatechange =  () => {
    if (xml.readyState == 4 && xml.status == 200) {
      if (xml.responseText == "true") {
        loggedIn();
      } else {
        notLoggedIn();
      }
    }
  };
  xml.send(null);
}

// function to add host, profile, and log out buttons
function loggedIn() {
  var nav = document.getElementById("account");
  var a1 = document.createElement("a");
  var a2 = document.createElement("a");
  var a3 = document.createElement("a");

  a1.setAttribute("href", "/host");
  a2.setAttribute("href", "/profile");
  a3.setAttribute("href", "/logout");
  a1.setAttribute("class", "toRight");
  a2.setAttribute("class", "toRight");
  a3.setAttribute("class", "toRight");

  a1.textContent = "Host";
  a2.textContent = "Profile";
  a3.textContent = "Log out";

  nav.appendChild(a1);
  nav.appendChild(a2);
  nav.appendChild(a3);
}

// function to add log in and sign up buttons
function notLoggedIn() {
  var nav = document.getElementById("account");
  var a1 = document.createElement("a");
  var a2 = document.createElement("a");

  a1.setAttribute("href", "/login");
  a2.setAttribute("href", "/signup");
  a1.setAttribute("class", "toRight");
  a2.setAttribute("class", "toRight");

  a1.textContent = "Log in";
  a2.textContent = "Sign up";

  nav.appendChild(a1);
  nav.appendChild(a2);
}

// calls function
checkSignedIn();
