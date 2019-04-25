import AWS from 'aws-sdk'


const s3 = new AWS.S3({
  accessKeyId: 'AKIA4PKW7FHBG7455WIJ',
  secretAccessKey: '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'
})

export const getS3Object = ({ key }) =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: 'zomato-trial-week',
      Key: key
    }

    s3.getObject(params, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data)
      }
    })
  })

// returns the uploaded object's public url
// upload is a very powerful s3 function can use streams and retries if a request fail
export const uploadS3Object = ({ key, body, ACL }) =>
  new Promise((resolve, reject) => {
    const type = body.split(';')[0].split('/')[1]
    const base64Data = Buffer.from(
      body.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    )

    const params = {
      Bucket: 'zomato-trial-week',
      Key: `${key}.${type}`,
      Body: base64Data,
      ACL: ACL,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    }

    s3.upload(params, (err, data) => {
      if (err) reject(err)
      else {
        resolve(data.Location)
      }
    })
  })
