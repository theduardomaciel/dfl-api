import prismaClient from "../../prisma"

import { User, Profile } from "../../@types/application";
import { CheckUserLevelAndExperience } from "../UPDATE/UpdateProfileExperienceService";
import { DeleteImageService, UploadImageService } from "../api_calls/ImageService";
import { Response, response } from "express";

type Props = {
    profile_id: number,
    address: string,
    coordinates: Array<number>,
    imagesBase64: Array<string>,
    tags: string,
    suggestion: string,
    hasTrashBins: boolean,
}

class CreateReportService {
    async execute(response: Response, params) {
        const { profile_id, address, coordinates, imagesBase64, tags, suggestion, hasTrashBins }: Props = params;

        try {
            // Fazemos o upload da(s) imagem(ns) para o Imgur
            const service = new UploadImageService();
            try {
                const { images, deleteHashs } = await service.execute(imagesBase64, profile_id)

                if (images.length === 0) {
                    response.status(400)
                    return { errorMessage: "No image base64 was provided to upload. It's obligatory to send a report." };
                }

                // Em seguida, criamos o relatório
                await prismaClient.report.create({
                    data: {
                        profile: {
                            connect: { id: profile_id },
                        },
                        address: address,
                        coordinates: coordinates,
                        images_urls: images,
                        images_deleteHashs: deleteHashs,
                        tags: JSON.stringify(tags),

                        note1: 0,
                        note2: 0,
                        note3: 0,
                        note4: 0,
                        note5: 0,

                        suggestion: suggestion,
                        hasTrashBins: hasTrashBins,
                    },
                });
            } catch (error) {
                console.log(error)
                response.status(400)
                return { errorCode: "database.error" }
            }

            // Em seguida encontramos o perfil do usuário que está criando o relatório
            const profile = await prismaClient.profile.findUnique({
                where: {
                    id: profile_id,
                },
            })

            // Adicionamos XP ao perfil do usuário, e subimos seu nível caso haja experiência suficiente
            const { USER_LEVEL, USER_EXPERIENCE, EXPERIENCE_GAINED } = CheckUserLevelAndExperience(profile)
            console.log("NEW LEVEL:", USER_LEVEL, "NEW EXPERIENCE: ", USER_EXPERIENCE)
            const updatedProfile = await prismaClient.profile.update({
                where: {
                    id: profile_id
                },
                data: {
                    level: USER_LEVEL,
                    experience: USER_EXPERIENCE
                },
                include: {
                    reports: {
                        include: {
                            profile: true
                        }
                    }
                }
            })

            return {
                profile: updatedProfile,
                experienceGained: EXPERIENCE_GAINED
            }
        } catch (error) {
            console.log(error)
            response.status(500)
            return error
        }
    }
}

export { CreateReportService }