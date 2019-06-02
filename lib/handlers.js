/*
 * Request handlers
 * 
 * This is how requests are processed, must be enabled via the router config in index.js
 */

//Dependencies
const _data = require('./dataHandler'),
    etc = require('./etclib'),
    log = require('./logging'),
    config = require('../config'),
    fs = require('fs');

 ﻿/*
 *  Handlers:
 * sample   - Is the server up? Send back JSON content to test
 * up       - JSON response test
 * demosite - Test of non-JSON content
 * ohnoes   - 404 content in JSON
 * favicon  - Give that sweet browser it's icon
 */


let handlers = {};
/* Website */

handlers.index = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Home',
            'head.description' : 'UberSpeaks home page',
            'body.description' : 'Very cool',
            'body.title' : 'UberSpeaks',
            'body.class' : 'index'
        };

        etc.template('index', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
};


handlers.web = function(data, callback) {
    if (['get'].indexOf(data.method) > -1) {
        handlers.user[data.method](data, callback);
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
}


handlers.assets = function(data, callback) {
    if (data.method === 'get') {
        const assetName = data.trimPath.replace('p/','').trim();
        if (assetName.length > 0) {
            etc.getStaticAss(assetName, function(err, data) {
                if (!err && data) {
                    var type = assetName.indexOf('.css') > -1 ? 'text/css' : 'plain';
                    var type = assetName.indexOf('.js') > -1 ? 'text/javascript' : 'plain';
                    var type = assetName.indexOf('.html') > -1 ? 'text/html' : 'plain';
                    var type = assetName.indexOf('.png') > -1 ? 'image/png' : 'plain';
                    var type = assetName.indexOf('.ico') > -1 ? 'image/vnd.microsoft.icon' : 'plain';
                    var type = assetName.indexOf('.jpg') > -1 ? 'image/jpeg' : 'plain';
                    var type = assetName.indexOf('.jpeg') > -1 ? 'image/jpeg' : 'plain';

                    if (type !== 'plain') {
                        console.log('epic')
                    }
                    callback(200, data, type);
                } else {
                    callback(404, { status: 404, error: "NOTFOUND", desc: "The requested content does not exist." });
                }
            });
        }
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
}

handlers.web.userCreate = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Create user',
            'head.description' : 'UberSpeaks account creation',
            'body.title' : 'Site is down',
            'body.class' : 'createUser'
        };

        etc.template('createUser', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
};

handlers.web.dash = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Dashboard',
            'head.description' : 'Dashboard',
            'body.title' : 'Site is down',
            'body.class' : 'dash'
        };

        etc.template('dash', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
};

handlers.web.userDelete = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Create user',
            'head.description' : 'UberSpeaks account creation',
            'body.title' : 'Site is down',
            'body.class' : 'userDeleted'
        };

        etc.template('userDeleted', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
};

handlers.web.userUpdate = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Update user',
            'head.description' : 'Update user account',
            'body.title' : 'Site is down',
            'body.class' : 'userUpdate'
        };

        etc.template('userUpdate', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
};

handlers.web.userLogin = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Sign in',
            'head.description' : 'UberSpeaks account login',
            'body.title' : 'Site is down',
            'body.class' : 'index'
        };

        etc.template('loginUser', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }};

handlers.web.sessionDelete = function(data, callback) {
    if (data.method == 'get') {
        const templateData = {
            'head.title' : 'Signed out',
            'head.description' : 'You have signed out',
            'body.title' : 'Site is down',
            'body.class' : 'index'
        };

        etc.template('signOut', templateData, function(err,str){
            if (!err && str) {
                etc.addStandardTemplates(str, templateData, function(err,str) {
                    if (!err && str) {
                        callback(200,str,'text/HTML');
                    } else {
                        try{
                            callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                            console.log('oof oof oof oof')
                        } catch (e) {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    }
                });
            } else {
                try{
                    callback(500, fs.readFileSync('site/500.html'), 'text/HTML');
                    console.log('oof oof')
                } catch (e) {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            }
        })
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['get'] });
    }
};

/* User functions*/
handlers.user = function (data, callback) {
    if (['post','put','get','delete'].indexOf(data.method) > -1) {
        handlers.user[data.method](data, callback);
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['post', 'put', 'get', 'delete'] });
    }
};


/*
 * Users
 *   post (Create)
 * Requires: fName, lName, mobile, email, pass, tos
 * (payload)
 */
handlers.user.post = function (data, callback) {
    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const fName = typeof data.payload.fName === 'string' && data.payload.fName.trim().length > 0 && (!format.test(data.payload.fName))? data.payload.fName.trim() : false; //get first name, if invalid or doesn't exist default to false
    const lName = typeof data.payload.lName === 'string' && data.payload.lName.trim().length > 0 && (!format.test(data.payload.lName))? data.payload.lName.trim() : false;// same with last name ^^
    const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 2 && data.payload.email.includes('@') ? data.payload.email : false;
    const mobile = typeof data.payload.mobile === 'string' && data.payload.mobile.trim().length >= 11 && data.payload.mobile.trim().length <= 21 ? data.payload.mobile.trim() : false;// same with last name ^^
    const pass = typeof data.payload.pass === 'string' && data.payload.pass.length > 8 && format.test(data.payload.pass) === true ? data.payload.pass : false;
    const tos = typeof data.payload.tos === 'boolean' && data.payload.tos === true ? true : false;// same with last name ^^

    if (email && pass && tos) {
        _data.read('users', email, function (err, data) {
            if (err) {
                const salt = etc.genSalt();//Get some salt on that, this will be added to the hash when authenticating
                const hashedPass = etc.hash(pass+salt);//Hash the users password

                if (hashedPass) {
                    const user = {//Create user object
                        fName,
                        lName,
                        mobile,
                        email,
                        'pass': hashedPass,
                        salt,
                        tos
                    };

                    //Create and store that user
                    _data.create('users', email, user, function (err) {
                        if (!err) {
                            callback(204);
                        } else {
                            log.error('Unknown error has occured.\n' + String(err));
                            callback(500, { status: 500, error: "Failed hashing.", desc: "An unknown error has occured." });
                        }
                    });
                } else {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            } else {
                callback(400, { status: 400, error: "USER-EXISTS", desc: "The user in the query already exists." });
            }
        });
    } else {
        callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
    }
};

/*
 * Users
 *   get (allow user to access own data)
 * Requires: email
 * (query)
 */
handlers.user.get = function (data, callback) {
    //does the user exist
    const email = typeof data.queryStringObj.email === 'string' && data.queryStringObj.email.trim().length > 2 && data.queryStringObj.email.includes('@') ? data.queryStringObj.email : false;//get the users email
    const token = typeof data.queryStringObj.token === 'string' && data.queryStringObj.token.trim().length === config.tokenLength ? data.queryStringObj.token : false;//get the users token

    if (token && email) {
        try {
            etc.grants(String(token), email, function (valid) {
                if (valid) {
                    if (email) {
                        _data.read('users', email, function (err, data) {
                            if (!err && data) {
                                //Remove salt and hash from response
                                delete data.pass;
                                delete data.salt;

                                callback(200, data);
                            } else {
                                callback(404, { status: 404, error: "USER-NOEXIST", desc: "The user in the query does not exist." });
                            }
                        });
                    } else {
                        callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data." });
                    }
                } else {
                    callback(401, { status: 401, error: "AUTH-BADTOKEN", desc: "Missing, malformed or invalid token." });
                }
            });
        } catch (e) {
            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
        }
    } else {
        callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
    }
};

/*
 * Users
 *   put (update user)
 * Requires: email
 * Optional: fName, lName, pass, tos (must update one value)
 * (payload)
 */
handlers.user.put = function (data, callback) {
    const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 2 && data.payload.email.includes('@') ? data.payload.email : false;//get the users email
    
    //Check what we are updating
    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const fName = typeof data.payload.fName === 'string' && data.payload.fName.trim().length > 0 && (!format.test(data.payload.fName))? data.payload.fName.trim() : false; //get first name, if invalid or doesn't exist default to false
    const lName = typeof data.payload.lName === 'string' && data.payload.lName.trim().length > 0 && (!format.test(data.payload.lName))? data.payload.lName.trim() : false;// same with last name ^^
    const pass = typeof data.payload.pass === 'string' && data.payload.pass.length > 8 && format.test(data.payload.pass) === true ? data.payload.pass : false;
    const mobile = typeof data.payload.mobile === 'string' && data.payload.mobile.trim().length >= 11 && data.payload.mobile.trim().length <= 21 ? data.payload.mobile.trim() : false;
    const token = typeof data.payload.token === 'string' && data.payload.token.trim().length > 0 ? data.payload.token.trim() : false; //get first name, if invalid or doesn't exist default to false

    if (token) {
        try {
            etc.grants(String(token), email, function (valid) {
                if (email && valid) {
                    _data.read('users', email, function (err, udata) {
                        if (!err && udata) {
                            if (fName) {
                                udata.fName = fName;
                            }
                            if (lName) {
                                udata.lName = lName;
                            }
                            if (pass) {
                                const userSalt = udata.salt;
                                udata.pass = etc.hash(pass + userSalt);
                            }
                            if (mobile) {
                                udata.mobile = mobile;
                            }

                            _data.update('users', email, udata, function (err) {
                                if (!err) {
                                    callback(204);
                                } else {
                                    log.error(err);
                                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                                }
                            });

                        } else {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    });
                } else {
                    callback(401, { status: 401, error: "USER-NO-EXIST", desc: "The user in the query does not exist." });
                }
            });
        } catch (e) {
            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
        }
    } else {
        callback(401, { status: 401, error: "AUTH-BADTOKEN", desc: "Missing, malformed or invalid token." });
    }
};


/*
 * Users
 *   delete (remove a user)
 * Requires: email
 * (query)
 */
handlers.user.delete = function (data, callback) {
    //does the user exist
    const email = typeof data.queryStringObj.email === 'string' && data.queryStringObj.email.trim().length > 2 && data.queryStringObj.email.includes('@') ? data.queryStringObj.email : false;//get the users email

    const token = typeof data.queryStringObj.token === 'string' && data.queryStringObj.token.trim().length === config.tokenLength ? data.queryStringObj.token : false;//get the users token

    if (token && email) {
        try {
            etc.grants(String(token), email, function (valid) {
                if (email && valid) {
                    _data.read('users', email, function (err, data) {
                        if (!err && data) {
                            _data.delete('users', email, function (err) {
                                if (!err) {
                                    callback(204);
                                } else {
                                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                                }
                            });
                        } else {
                            callback(401, { status: 401, error: "USER-NOEXIST", desc: "The user in the query does not exist." });
                        }
                    });
                } else {
                    callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
                }
            });
        } catch (e) {
            callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
        }
    } else {
        callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
    }
};


/*Access token functions*/
handlers.accesstoken = function (data, callback) {
    if (['post','put','get','delete'].indexOf(data.method) > -1) {
        handlers.accesstoken[data.method](data, callback);
    } else {
        callback(405, { status: 405, error: "NOT-ALLOWED", desc: "The method is not allowed.", methods: ['post','put','get','delete'] });
    }
};


/*
 * Access tokens
 *   post (create token)
 * Requires: email, password
 * (payload)
 */
handlers.accesstoken.post = function (data, callback) {
    const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 2 ? data.payload.email : false;//get the users email
    const pass = typeof data.payload.pass === 'string' === true ? data.payload.pass : false;

    if (email && pass) {
        _data.read('users', email, function (err, udata) {
            if (!err && udata) {
                const sentPassHash = etc.hash(pass + udata.salt);

                if (udata.pass === sentPassHash && email === udata.email) {
                    const token = etc.newToken();//Users token
                    const expires = (Math.floor(Date.now() / 1000) + (config.timeZoneHours * 60 * 60)) + (60 * config.tokenTime);//Time until token expiry
                    const tObj = { email, token, expires };//object with token data
                    //Store token information
                    _data.create('actk', token, tObj, function () {
                        if (!err) {
                            callback(200, tObj);
                        } else {
                            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                        }
                    });
                } else {
                    callback(403, { status: 403, error: "NOT-AUTHENTICATED2", desc: "Failed login attempt" });
                }
            } else {
                callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
            }
        });
    } else {
        callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
    }
};

/*
 * Access tokens
 *   get (check token)
 * Requires: token
 * (query)
 */
handlers.accesstoken.get = function (data, callback) {
    //does the user exist
    const token = typeof data.queryStringObj.token === 'string' ? data.queryStringObj.token : false;//get the users token

    if (token) {
        try {
            if (token) {
                _data.read('actk', token, function (err, data) {
                    if (!err && data) {
                        delete data.email;

                        callback(200, data);
                    } else {
                        callback(401, { status: 401, error: "USER-NOEXIST", desc: "The user in the query does not exist." });
                    }
                });
            } else {
                callback(401, { status: 401, error: "AUTH-BADTOKEN", desc: "Missing, malformed or invalid token." });
            }
        } catch (e) {
            console.log(e+"oh fuck you broke it you dumb little shit")
            callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
        }
    } else {
        callback(401, { status: 401, error: "AUTH-BADTOKEN", desc: "Missing, malformed or invalid token." });
    }
};

/*
 * Access tokens
 *   put (extend)
 * Requires: id
 * (payload)
 */
handlers.accesstoken.put = function (data, callback) {
    const token = typeof data.payload.token === 'string' ? data.payload.token : false;//get the token

    _data.read('actk', token, function (err, data) {
        if (!err) {
            data.expires = (Math.floor(Date.now() / 1000) + (config.timeZoneHours * 60 * 60)) + (60 * config.tokenTime);//Time until token expiry
            _data.update('actk', token, data, function (err) {
                if (!err && data) {
                    if (data.expires > (Date.now()/1000)) {
                        delete data.email;
                        callback(200, data);
                    } else {
                        callback(422, { status: 422, error: "AUTH-EXPIREDTOKEN", desc: "Tried to renew expired token" });
                    }
                } else {
                    callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                }
            });
        } else {
            callback(401, { status: 401, error: "AUTH-BADTOKEN", desc: "Missing, malformed or invalid token." });
        }
    });
};

/*
 * Access tokens
 *   delete (logout)
 * Requires: id
 * (query)
 */
handlers.accesstoken.delete = function (data, callback) {
    const token = typeof data.queryStringObj.token === 'string' ? data.queryStringObj.token : false;//get the token

    if (token) {
        _data.read('actk', token, function (err, data) {
            if (!err && data) {
                _data.delete('actk', token, function (err) {
                    if (!err) {
                        callback(204);
                    } else {
                        callback(500, { status: 500, error: "", desc: "An unknown error has occured." });
                    }
                });
            } else {
                callback(401, { status: 401, error: "AUTH-BADTOKEN", desc: "Missing, malformed or invalid token." });
            }
        });
    } else {
        callback(400, { status: 400, error: "NO-DATA", desc: "Missing required data or incorrect data" });
    }
};


/*Note for future development: Start using 3 callbacks

1st - The code to respond with
2nd - Payload/content
3rd - Type (if none specified then default to JSON. By doing this we allow other payloads like HTML or other bin. content) 
*/

//Check if the server is available
handlers.ping = function (data, callback) {
    callback(204);//literally nothing
};
//Handler not found
handlers.ohnoes = function (data, callback) {
    callback(404, { status: 404, error: "NOTFOUND", desc: "The requested content does not exist." }, "application/JSON");
};

//Favicon handler
handlers.favicon = function (data, callback) {
    try {
        callback(200, fs.readFileSync(config.favicon), "image/vnd.microsoft.icon");
    } catch (err) {
        callback(404);
    }
};

module.exports = handlers;
