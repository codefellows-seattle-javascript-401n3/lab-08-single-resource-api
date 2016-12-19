'use strict'

module.exports = function(request) {
  return new Promise ((resolve, reject) => {
    if (request.method === 'POST' || request.method === 'PUT') {
      request.body = ''

      request.on('data', data => {
        request.body += data.toString()
      })

      request.on('end', () => {
        try {
          request.body = JSON.parse(request.body)
          return resolve(request)
        } catch (err) {
          return reject(err)
        }
      })

      request.on('error', err => {
        return reject(err)
      })

      return

    }
    // immediately resolve for a GET or DELETE request
    resolve()
  })
}
