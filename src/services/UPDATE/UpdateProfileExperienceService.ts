import prismaClient from "../../prisma"
import { NODE_LEVELS_DATA } from "../../data/levels_node";
import { ReadProfileService } from "../READ/ReadProfileService";

function CheckUserLevelAndExperience(userProfile) {
    let USER_EXPERIENCE = userProfile.experience
    if (userProfile.level < 3) {
        USER_EXPERIENCE += 100
    } else if (userProfile.level >= 5 && userProfile.level <= 7) {
        USER_EXPERIENCE += 150
    } else {
        USER_EXPERIENCE += 175
    }
    console.log(`O usuário tinha ${userProfile.experience}. Agora ele possui ${USER_EXPERIENCE}xp!`)

    let USER_LEVEL = userProfile.level;
    function GetLevelObtainedWithActualXp() {
        let maxLevel = 0
        for (let index = 0; index < NODE_LEVELS_DATA.length; index++) {
            if (USER_EXPERIENCE >= NODE_LEVELS_DATA[index].exp) {
                maxLevel = index
                continue;
            }
        }
        console.log(maxLevel)
        return maxLevel
    }

    const LEVEL_OBTAINED_WITH_ACTUAL_XP = GetLevelObtainedWithActualXp()

    // Caso o usuário tenha subido de nível, atualizamos esse valor e reiniciamos a quantidade de experiência que ele tem
    if (LEVEL_OBTAINED_WITH_ACTUAL_XP > USER_LEVEL) {
        USER_LEVEL = LEVEL_OBTAINED_WITH_ACTUAL_XP
        USER_EXPERIENCE = USER_EXPERIENCE - NODE_LEVELS_DATA[LEVEL_OBTAINED_WITH_ACTUAL_XP].exp
        console.log(`O usuário subiu de nível! Ele agora é um ${NODE_LEVELS_DATA[USER_LEVEL].title} (Nível ${LEVEL_OBTAINED_WITH_ACTUAL_XP})!`)
    }

    return { USER_LEVEL, USER_EXPERIENCE }
}

class UpdateProfileExperienceService {
    async execute(profile_id) {
        try {
            const service = new ReadProfileService();
            const profile = await service.execute(profile_id) as any;
            const { USER_LEVEL, USER_EXPERIENCE } = CheckUserLevelAndExperience(profile as any);
            await prismaClient.profile.update({
                where: {
                    id: profile.id,
                },
                data: {
                    level: USER_LEVEL,
                    experience: USER_EXPERIENCE
                }
            })
            return { USER_LEVEL, USER_EXPERIENCE }
        } catch (error) {
            console.log(error);
        }
    }
}

export { UpdateProfileExperienceService, CheckUserLevelAndExperience }