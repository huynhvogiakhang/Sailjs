module.exports = {
    json: function (status, res, message, data) {
        var response = {
            response: {
                message: message
            }
        };
        if (typeof data !== 'undefined') {
            response.response.data = data;
        }
       
        return res.status(status).json(response);
    }
    
};  