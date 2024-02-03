var facebookLoginButton = document.getElementById('facebook-login');
facebookLoginButton.addEventListener('click', processFacebookAuth);
var googleLoginButton = document.getElementById('google-login');
googleLoginButton.addEventListener('click', processGoogleAuth);

function getFacebookAppId() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/api/config/facebook_app_id/', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response.appId);
            } else if (xhr.readyState == 4) {
                reject('Error: ' + xhr.status);
            }
        }
        xhr.onerror = function() {
            reject('Network error');
        };
        xhr.send();
    });
}
function getGoogleClientId() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/api/config/google_client_id/', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response.clientId);
            } else if (xhr.readyState == 4) {
                reject('Error: ' + xhr.status);
            }
        }
        xhr.onerror = function() {
            reject('Network error');
        };
        xhr.send();
    });
}


function processFacebookAuth() {
    getFacebookAppId().then(function(appId) {
        var redirectUri = encodeURIComponent('http://localhost:3000/auth-callback?provider=facebook');
        var authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;
        window.location.href = authUrl;
    });
}

function processGoogleAuth() {
   getGoogleClientId().then(function(clientId) {
        var redirectUri = encodeURIComponent('http://localhost:3000/auth-callback?provider=google');
        var authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&response_type=code&client_id=${clientId}`;
        window.location.href = authUrl;
    });
}
