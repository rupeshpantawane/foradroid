const axios = require('axios')
var qs = require('qs');
const jwt_decode = require('jwt-decode');
 
const generateToken = async (data) => {
    data = qs.stringify({
        grant_type: 'authorization_code',
        code: data.code,
        redirect_uri: data.redirect_uri,
        state: data.state
    });
    
    const username = 'm098Mtx3whDI9Fp7jNnnUwtw'
    const password = 'G27Tk2O3DMW7D3RjHIyWh6v8Rgj1p8zslQkTYKYAfOnTjSuj'
    var token = username + ":" + password;
    var basicToken = btoa(token);

    const config = {
        method: 'post',
        url: 'http://authen.tmc.or.th/api/oauth/token',
        headers: {
            'Authorization': `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };



    return await axios(config)
        .then(async (res) => {
            var decoded = jwt_decode(res.data.access_token);
            return { status: 'success', decoded }
        }).catch(error => {
            return { status: 'failed', message: error.message }
        })
}

module.exports = {
    generateToken
};