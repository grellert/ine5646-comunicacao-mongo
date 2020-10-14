
function onResponse(res){
    return res.text();
}

function onTextReady(text){
    console.log(text);
}

function onSubmitPost(){
    const formObj = document.getElementById("userform");
    const formData = new FormData(formObj);
    let data = {};

    for (const pair of formData) {
        data[pair[0]] = pair[1];
    }
    
    const jsonData = JSON.stringify(data);
    data_register = fetch('/registeruserfetch', {
                            method: "POST", 
                            headers: { 'Content-Type': 'application/json'},
                            body: jsonData})
                    .then(onResponse)
                    .then(onTextReady);
}

function onSubmitUrl(){
    const formObj = document.getElementById("userform");
    const formData = new FormData(formObj);
    let data = {};

    for (const pair of formData) {
        data[pair[0]] = pair[1];
    }
    
    const url = `/registeruserurl/${data.user}/${data.mail}`
    data_register = fetch(url)
                    .then(onResponse)
                    .then(onTextReady);
}

buttonPost = document.getElementById("fetch-post");
buttonGetUrl = document.getElementById("fetch-geturl");

buttonPost.addEventListener('click', onSubmitPost);
buttonGetUrl.addEventListener('click', onSubmitUrl);
