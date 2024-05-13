const client_id = "6ce895d6838c43bc962283cbf89c9390";
const client_secret = "d8d1fcc0e4ec43f1b8224331fcd4028d";
const redirect_uri = "http://localhost:3000/";
const authorize = "https://accounts.spotify.com/authorize";
const token = "https://accounts.spotify.com/api/token";
const searchQuery = "https://api.spotify.com/v1/search";


export function requestAuthorization() {
    let url = authorize;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&show_dialogue=true";
    url += "&scope=playlist-modify-public playlist-modify-private ";
    window.location.href = url;
}

function handleAuthorizationResponse(data) {
    if (data.access_token !== undefined) {
        localStorage.setItem("access_token", data.access_token);
    }
    if (data.refresh_token !== undefined) {
        localStorage.setItem("refresh_token", data.refresh_token);
    }
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



function returnCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
        const urlParam = new URLSearchParams(queryString);
        code = urlParam.get('code');
        console.log(code);
    }
    return code;
}

async function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
    fetchUserInfo();
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



async function fetchUserInfo() {
    try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }
        const userData = await response.json();
        const userId = userData.id;
        localStorage.setItem("user_id", userId);
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
}

export function onReturn() {
    if (window.location.search.length > 0) {
        handleRedirect();
        
    }
}

async function refreshAccessToken() {
    try {
        const refresh_token = localStorage.getItem("refresh_token");
        let body = "grant_type=refresh_token";
        body += "&refresh_token=" + refresh_token;
        body += "&client_id=" + client_id;
        await callAuthorizationApi(body);
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}


export function fetchSearchQuery(data) {
    let url = searchQuery;
    url += "?q=" + encodeURIComponent(data);
    url += "&type=track";
    url += "&limit=" + 10;
    url += "&offset=" + 1;
    return fetch(url, {
        method: 'GET',
        headers:{
            'Authorization': "Bearer " + localStorage.getItem("access_token")
        }
    })
    .then(response => response.json())
    .then(res => {return handleSearchQuery(res)}) // Call handleSearchQuery to process the response
    .catch(error => {
        refreshAccessToken();
        return fetchSearchQuery(data); // Return the result of recursive call
    });
}

function handleSearchQuery(response){
    return response.tracks.items.map(item => ({
        title: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        uri: item.uri
      }));
}


export function createPlaylist(name, data) {
    const createPlaylistUrl = `https://api.spotify.com/v1/users/${localStorage.getItem("user_id")}/playlists`;
    fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not create playlist');
        }
        return response.json();
    })
    .then( async (data) => {
        console.log('Playlist created:', data);
        localStorage.setItem("playlist_id", data.id);
        await addToPlaylist(data);
    })
    .catch(error => {
        console.error('Error creating playlist:', error);
        refreshAccessToken().then(() => createPlaylist(name)); // Retry after refreshing access token
    });
}


export async function addToPlaylist(data) {
    const addTracksUrl = `https://api.spotify.com/v1/playlists/${localStorage.getItem("playlist_id")}/tracks`;
    try {
        const response = await fetch(addTracksUrl, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("access_token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uris: data }),
            "position": 0
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('Error adding track to playlist:', error);
        return refreshAccessToken().then(() => addToPlaylist(data));
    }
}
