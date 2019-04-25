import ImageModel from '../models/image'

export const addImage = (email, tag, imageKey) => new Promise((resolve, reject) => {
  const image = new ImageModel({ email, tag, imageUrl: imageKey })
  image.save()
    .then(() => resolve())
    .catch((err) => {
      console.log(err)
    })
})

export const getImage = (email) => new Promise((resolve, reject) => {
  ImageModel.find({ email })
    .then((data) => resolve(data))
    .catch((err) => reject(err))
})
