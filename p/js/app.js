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
    var method = typeof(method) === 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
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
                req += '&';
            }

            req += queryKey + '=' + query[queryKey];
        }
    }

    //form request

    if (app.config.session) {
        if (method === 'POST' || method === 'PUT') {
            payload.token = app.config.session.token;
        } else {
            query.token = app.config.session.token;
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
    console.log(payloadStr, JSON.stringify(headers), JSON.stringify(query), path, req, JSON.stringify(payload))
};




/* modified work from pirple from their ajax handler demo site */


// Bind the logout button
app.bindLogoutButton = function(){
    document.getElementById("logoutButton").addEventListener("click", function(e){
  
      // Stop it from redirecting anywhere
      e.preventDefault();
  
      // Log the user out
      app.logUserOut();
  
    });
};
  
  // Log the user out then redirect them
  app.logUserOut = function(redirectUser){
    // Set redirectUser to default to true
    redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;
  
    // Get the current token id
    var token = typeof(app.config.session.token) == 'string' ? app.config.session.token : false;
  
    // Send the current token to the tokens endpoint to delete it
    var queryStringObject = {token};
    app.client.request(undefined,'api/auth','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
      // Set the app.config token as false
      app.setSessionToken(false);
  
      // Send the user to the logged out page
      if(redirectUser){
        window.location = '/user/session/purge';
      }
  
    });
  };
  
  // Bind the forms
  app.bindForms = function(){
    if(document.querySelector("form")){
  
      var allForms = document.querySelectorAll("form");
      for(var i = 0; i < allForms.length; i++){
          allForms[i].addEventListener("submit", function(e){
  
          // Stop it from submitting
          e.preventDefault();
          var formId = this.id;
          var path = this.action;
          var method = this.method.toUpperCase();
  
          // Hide the error message (if it's currently shown due to a previous error)

          document.querySelector("#"+formId+" .formError").style.display = 'none';

          console.log('no need to clear error')
          
  
          // Hide the success message (if it's currently shown due to a previous error)
          if (document.querySelector("#"+formId+" .formSuccess")) {
              document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
          }
          
          // Turn the inputs into a payload
          var payload = {};
          var elements = this.elements;
          for(var i = 0; i < elements.length; i++){
            if(elements[i].type !== 'submit'){
              // Determine class of element and set value accordingly
              var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
              var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
              var elementIsChecked = elements[i].checked;
              // Override the method of the form if the input's name is _method
              var nameOfElement = elements[i].name;
              if(nameOfElement == '_method'){
                method = valueOfElement;
              } else {
                // Create an payload field named "method" if the elements name is actually httpmethod
                if(nameOfElement == 'httpmethod'){
                  nameOfElement = 'method';
                }
                // Create an payload field named "id" if the elements name is actually uid
                if(nameOfElement == 'uid'){
                  nameOfElement = 'id';
                }
                // If the element has the class "multiselect" add its value(s) as array elements
                if(classOfElement.indexOf('multiselect') > -1){
                  if(elementIsChecked){
                    payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                    payload[nameOfElement].push(valueOfElement);
                  }
                } else {
                  payload[nameOfElement] = valueOfElement;
                }
  
              }
            }
          }
  
  
          // If the method is DELETE, the payload should be a queryStringObject instead
          var queryStringObject = method == 'DELETE' ? payload : {};
  
          // Call the API
          app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
            // Display an error on the form if needed
            if(statusCode === 200 || statusCode === 204){
              // If successful, send to form response processor
              app.formResponseProcessor(formId,payload,responsePayload);
              
            } else {
              if(statusCode == 403){
                // log the user out
                app.logUserOut();
  
              } else {
  
                // Try to get the error from the api, or set a default error message
                var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';
  
                // Set the formError field with the error text
                document.querySelector("#"+formId+" .formError").innerHTML = error;
  
                // Show (unhide) the form error field on the form
                document.querySelector("#"+formId+" .formError").style.display = 'block';
              }
            }
          });
        });
      }
    }
  };
  
  // Form response processor
  app.formResponseProcessor = function(formId,requestPayload,responsePayload){
    var functionToCall = false;
    // If account creation was successful, try to immediately log the user in
    if(formId == 'accountCreate'){
      // Take the email and password, and use it to log the user in
      var newPayload = {
        'email' : requestPayload.email,
        'pass' : requestPayload.pass
      };
  
      app.client.request(undefined,'api/auth','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
        // Display an error on the form if needed
        if(newStatusCode !== 200){
  
          // Set the formError field with the error text
          document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';
  
          // Show (unhide) the form error field on the form
          document.querySelector("#"+formId+" .formError").style.display = 'block';
  
        } else {
          // If successful, set the token and redirect the user
          app.setSessionToken(newResponsePayload);
          window.location = '/dashboard';
        }
      });
    }
    // If login was successful, set the token in localstorage and redirect the user
    if(formId == 'sessionCreate'){
      app.setSessionToken(responsePayload);
      window.location = '/dashboard';
    }
  
    // If forms saved successfully and they have success messages, show them
    var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
    if(formsWithSuccessMessages.indexOf(formId) > -1){
      document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
    }
  
    // If the user just deleted their account, redirect them to the account-delete page
    if(formId == 'accountEdit3'){
      app.logUserOut(false);
      window.location = '/user/delete';
    }
    
    /*
    // If the user just created a new check successfully, redirect back to the dashboard
    if(formId == 'checksCreate'){
      window.location = '/dashboard';
    }
  
    // If the user just deleted a check, redirect them to the dashboard
    if(formId == 'checksEdit2'){
      window.location = '/dashboard';
    }*/
  
  };
  
  // Get the session token from localstorage and set it in the app.config object
  app.getSessionToken = function(){
    var tokenString = localStorage.getItem('token');
    if(typeof(tokenString) == 'string'){
      try{
        var token = JSON.parse(tokenString);
        app.config.session = token;
        if(typeof(token) == 'object'){
          app.setLoggedInClass(true);
        } else {
          app.setLoggedInClass(false);
        }
      } catch(e) {
        app.config.session = false;
        app.setLoggedInClass(false);
      }
    }
  };
  
  // Set (or remove) the loggedIn class from the body
  app.setLoggedInClass = function(add){
    var target = document.querySelector("body");
    if(add){
      target.classList.add('loggedIn');
    } else {
      target.classList.remove('loggedIn');
    }
  };
  

  // Set the session token in the app.config object as well as localstorage
  app.setSessionToken = function(token){
    app.config.session = token;
    var tokenString = JSON.stringify(token);
    localStorage.setItem('token',tokenString);
    if(typeof(token) == 'object'){
      app.setLoggedInClass(true);
    } else {
      app.setLoggedInClass(false);
    }
  };
  
  // Renew the token
  app.renewToken = function(callback){
    const currentToken = typeof(app.config.session) == 'object' ? app.config.session : false;
    if (currentToken) {
      // Update the token with a new expiration
      var payload = {
        'token' : currentToken.token
      };
      app.client.request(undefined,'api/auth','PUT',undefined,payload,function(statusCode,responsePayload){
        // Display an error on the form if needed
        if(statusCode == 200){
          // Get the new token details
          var queryStringObject = {'token' : currentToken.token};
          app.client.request(undefined,'api/auth','GET',queryStringObject,undefined,function(statusCode,responsePayload){
            // Display an error on the form if needed
            if(statusCode == 200){
              app.setSessionToken(responsePayload);
              callback(false);
            } else {
              app.setSessionToken(false);
              callback(true);
            }
          });
        } else {
          app.setSessionToken(false);
          callback(true);
        }
      });
    } else {
      app.setSessionToken(false);
      callback(true);
    }
  };
  
  // Load data on the page
  app.loadDataOnPage = function(){
    // Get the current page from the body class
    var bodyClasses = document.querySelector("body").classList;
    var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;
  
    // Logic for account settings page
    if(primaryClass == 'userUpdate'){
      app.loadAccountEditPage();
    }
  };
  
  // Load the account edit page specifically
  app.loadAccountEditPage = function(){
    // Get the email number from the current token, or log the user out if none is there
    var email = typeof(app.config.session.email) == 'string' ? app.config.session.email : false;
    if(email){
      // Fetch the user data
      var query = {email,'token':app.config.session.token};
      app.client.request(undefined,'api/user','GET',query,undefined,function(statusCode,responsePayload){
        if(statusCode == 200){
          // Put the data into the forms as values where needed
          document.querySelector("#accountEdit1 .firstname").value = responsePayload.fName;
          document.querySelector("#accountEdit1 .lastname").value = responsePayload.lName;
          document.querySelector("#accountEdit1 .email").value = responsePayload.email;
          document.querySelector("#accountEdit1 .mobile").value = responsePayload.mobile;
          document.querySelector("#accountEdit2 .email").value = responsePayload.email;
          document.querySelector("#accountEdit3 .token").value = app.config.session.token;
          document.querySelector("#accountEdit3 .email").value = responsePayload.email;
  
          // Put the hidden email field into both forms
          /*var hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailNumberInput");
          for(var i = 0; i < hiddenEmailInputs.length; i++){
              hiddenEmailInputs[i].value = responsePayload.email;
          }*/
  
        } else {
          // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
          app.logUserOut();
        }
      });
    } else {
      app.logUserOut();
    }
  };


// Loop to renew token often
app.tokenRenewalLoop = function(){
    setInterval(function(){
      app.renewToken(function(err){
        if(!err){
          console.log("Automatically renewed session at: "+Date.now());
        }
      });
    },1000 * 60 * 60);
  };
  
  // Init (bootstrapping)
  app.init = function(){
  
    // Bind all form submissions
    app.bindForms();
  
    // Bind logout logout button
    app.bindLogoutButton();
  
    // Get the token from localstorage
    app.getSessionToken();
  
    // Renew token
    app.tokenRenewalLoop();
  
    // Load data on page
    app.loadDataOnPage();
  
  };
  
  // Call the init processes after the window loads
  window.onload = function(){
    app.init();
  };