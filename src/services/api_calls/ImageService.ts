import { ImgurClient } from 'imgur';

require('dotenv').config()
const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });

// hash da primeira imagem de teste para deletar: 7r5TlGBX1FQZXx1

class UploadImageService {
    async execute(images_base64: Array<string>, profile_id: number) {
        const date = new Date();
        const images = []
        const deleteHashs = []

        if (!images_base64) return { images, deleteHashs }

        for (let i = 0; i < images_base64.length; i++) {
            const base64 = images_base64[i];
            try {
                const response = await client.upload({
                    image: base64,
                    title: `report_${date.getDay()}-${date.getMonth()}_${profile_id}`,
                    type: "base64",
                });
                images.push(response.data.link)
                deleteHashs.push(response.data.deletehash)
                console.log("✅ Uploaded image with success!");
            } catch (error) {
                console.log(error)
                console.log("❌ There was not possible to upload the image.",);
            }
        }
        return { images, deleteHashs }
    }
}

class DeleteImageService {
    async execute(image_deleteHashs: Array<string>) {
        image_deleteHashs.forEach(async image_deleteHash => {
            try {
                const response = await client.deleteImage(image_deleteHash)
                console.log("✅ DELETED image with success!");
                return response.data;
            } catch (error) {
                console.log(error)
            }
        });
    }
}

export { DeleteImageService, UploadImageService }