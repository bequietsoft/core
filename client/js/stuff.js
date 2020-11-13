function post(url, data) {
    console.time('normal_post')
    console.log('< ' + data)
    let request = new XMLHttpRequest()
    request.open("POST", url)
    request.send(data)
    request.onload = () => { 
        console.log('> ' + data) 
        console.timeEnd('normal_post')
    }
}

function normal_post(data) {
    post('/test', data)//document.getElementById('input').value)
}

let ppost = function(url, data) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest()
        request.open("POST", url)
        request.send(data)
        request.onload = () => { resolve(data) }
        request.onerror = () => { reject(error) }
    })
}

function promise_post(data) {
    console.time('promise_post')
    //let data = document.getElementById('input').value
    console.log('< ' + data)
    ppost('/test', data)
    .then((response) => { console.log('> ' + response) })
    .catch((error) => { console.log('> ' + error) })
    .then(() => { console.timeEnd('promise_post') })
}

function test() {
    normal_post('normal')
    promise_post('promise') 
}