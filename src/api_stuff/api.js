const client_id = "6ce895d6838c43bc962283cbf89c9390";
const client_secret = "d8d1fcc0e4ec43f1b8224331fcd4028d";
const redirect_uri = "http://localhost:3000/";
const authorize = "https://accounts.spotify.com/authorize";
const token = "https://accounts.spotify.com/api/token";

function requestAuthorization() {
    let url = authorize;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&show_dialogue=true";
    url += "&scope=playlist-modify-public playlist-modify-private ";
    window.location.href = url;
}

function returnCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParam = new URLSearchParams(queryString);
        code = urlParam.get('code');
    }
    return code;
}

function onReturn() {
    if (window.location.search.length > 0) {
        handleRedirect();
    } else {
        access_token = localStorage.getItem("access_token");
    }
}

function handleRedirect() {
    let code = returnCode();
    if (code !== null) {
        fetchAccessToken(code);
    } else {
        return "error";
    }
    window.history.pushState("", "", redirect_uri);
}

async function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

async function callAuthorizationApi(body) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
        },
        body: body
    };

    try {
        const response = await fetch(token, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        handleAuthorizationResponse(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function handleAuthorizationResponse(data) {
    if (data.access_token !== undefined) {
        localStorage.setItem("access_token", data.access_token);
    }
    if (data.refresh_token !== undefined) {
        localStorage.setItem("refresh_token", data.refresh_token);
    }
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}
