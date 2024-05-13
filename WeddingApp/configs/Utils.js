import mime from "mime"


export const processImagePicker = (image) => {
    let newImage = 'file:///' + image.uri.split('file:/').join('')
    return {
        uri: newImage,
        type: mime.getType(newImage),
        name: newImage.split('/').pop()
    }
}

export const formattedNumber = (number) => {
    // Làm tròn số xuống để loại bỏ phần thập phân
    const roundedNumber = Math.floor(number);
    return roundedNumber.toLocaleString('de-DE');
};