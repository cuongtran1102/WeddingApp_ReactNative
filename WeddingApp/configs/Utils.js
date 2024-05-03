import mime from "mime"


export const processImagePicker = (image) => {
    let newImage = 'file:///' + image.uri.split('file:/').join('')
    return {
        uri: newImage,
        type: mime.getType(newImage),
        name: newImage.split('/').pop()
    }
}