'use strict'

module.exports = function(request) {
  return new Promise ((resolve, reject) => {
    if (request.method === 'POST' || request.method === 'PUT') {
      request.body = ''

      request.on('data', function(data){
        request.body += data.toString()
      })

      request.on('end', function(){
        try {
          request.body = JSON.parse(request.body)
          resolve(request)
        } catch (err) {
          reject(err)
        }
      })
    }
    // immediately resolve for a GET or DELETE request
    resolve(request)
  })
}
