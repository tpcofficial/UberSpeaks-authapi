/*
 *
 * Hello frontend world!
 * 
 * 
*/


let app = {}
app.client = {}

console.log(`%c

                                                          
/)                                                 /) 
_/_(/   _  _/_ _  __   __   _ _/__/_         _  ______//  
(__/ )_(_(_(__/_)_/_)_/ (__(/_(__(__(_/_ o  (__(_)(_)(/_  
               .-/                 .-/                    
              (_/                 (_/   https://thatspretty.cool
                
    Service status:  https://status.thatspretty.cool

`, "font-family:monospace");
console.log("Crafted by TPC Grp at https://thatspretty.cool\nIf you're seeing this you may know a thing or two about development, go ahead and contact us at hey@thatspretty.cool");

//Local config
app.config = {
    'session' : false
}

//AJAX client
app.client.request = function(headers, path, method, query, payload, callback) {
    var headers = typeof(headers) === 'object' && headers !== null ? headers : {};
    var path = typeof(path) === 'string' && path.length > 0 ? path : '/';
    var method = typeof(method) === 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase : 'GET';
    var query = typeof(query) === 'object' && query !== null ? query : {};
    var payload = typeof(payload) === 'object' && payload !== null ? payload : {};
    callback = typeof(callback) === 'function' ? callback : false; //allows use without callback function

    //althought they can specify query as keys and values, when we send it must be a path
    var req = path + '?';
    let c = 0;
    for (var queryKey in query) {
        if(query.hasOwnProperty(queryKey)) {
            c++;

            if (c > 1) {
                req += '&'
            }

            req += queryKey + '=' + query[queryKey];
        }
    }

    //form request

    if (app.config.session) {
        if (method === 'POST' || method === 'PUT') {
            payload.token = app.config.session;
        } else {
            query.token = app.config.session;
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, req, true);
    xhr.setRequestHeader("Content-Type","application/JSON");

    for (var headerKey in headers) {
        if (headers.hasOwnProperty(headerKey)) {
            xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
    }
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const status = xhr.status;
            const response = xhr.responseText;

            //callback if enabled
            if (callback) {
                try {
                    const parsed = JSON.parse(response);
                    callback(status, parsed);
                } catch (e) {
                    callback(status, false);
                }
            }
        }
    }

    const payloadStr = JSON.stringify(payload);
    xhr.send(payloadStr);
};