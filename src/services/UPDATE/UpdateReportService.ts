import prismaClient from "../../prisma"

type Props = {
    profile_id?: number,
    ratingToAdd?: number,
    tags?: JSON,
    resolved?: boolean,
    approved?: boolean
}

async function UpdateProfileRating(profile_id, report_id, ratingToAdd) {
    try {
        console.log(profile_id)
        const profile = await prismaClient.profile.findMany()
        console.log(profile)
        return;

        const originalProfileNotes = []
        let profileNotes = originalProfileNotes;

        let continueUpdating = true

        // Verificamos se o perfil já votou nesse relatório (independentemente de qual a nota)
        for (let index = 1; index <= profileNotes.length; index++) {
            // Verificamos nota por nota se o usuário já votou (nota = index)
            const index_reports = profileNotes["note" + index];
            const updatedNoteArray = index_reports.filter(async reportId => {
                // Caso encontremos um relatório com a mesmo id do atual, o usuário já votou nesse relatório (com a nota = index)
                if (reportId === report_id) {
                    // Se essa nota (index) for igual a nota que será adicionada no relatório, paramos a atualização, já que o usuário já votou. 
                    // Não podemos adicionar essa nota novamente.
                    if (index === ratingToAdd) {
                        continueUpdating = false
                        return true
                    } else {
                        // Como encontramos um relatório em que o usuário já votou, removemos ele
                        await prismaClient.report.update({
                            where: {
                                id: report_id
                            },
                            data: {
                                note1: {
                                    decrement: index === 1 ? 1 : 0,
                                },
                                note2: {
                                    decrement: index === 2 ? 1 : 0,
                                },
                                note3: {
                                    decrement: index === 3 ? 1 : 0,
                                },
                                note4: {
                                    decrement: index === 4 ? 1 : 0,
                                },
                                note5: {
                                    decrement: index === 5 ? 1 : 0,
                                },
                            },
                        });
                        console.log("Como o usuário já havia votado anteriormente no relatório, estamos removendo essa avaliação.")
                        return false
                    }
                } else {
                    return true
                }
            })
            profileNotes["note" + index] = updatedNoteArray
        }

        if (!continueUpdating) return;

        // Como já removemos qualquer avaliação anterior, adicionamos a nova ao perfil do usuário
        profileNotes["note" + ratingToAdd].push(report_id);

        // E por fim, enviamos as atualizações para o banco de dados
        await prismaClient.profile.update({
            where: {
                id: profile_id,
            },
            data: {
                ratings: profileNotes
            }
        })
        console.log("As avaliações do perfil do usuário foram atualizadas.")

        // Agora, podemos atualizar o relatório com a nota necessária
        await prismaClient.report.update({
            where: {
                id: report_id
            },
            data: {
                note1: {
                    increment: ratingToAdd === 1 ? 1 : 0,
                },
                note2: {
                    increment: ratingToAdd === 2 ? 1 : 0,
                },
                note3: {
                    increment: ratingToAdd === 3 ? 1 : 0,
                },
                note4: {
                    increment: ratingToAdd === 4 ? 1 : 0,
                },
                note5: {
                    increment: ratingToAdd === 5 ? 1 : 0,
                },
            }
        });

        console.log(`✅ Avaliação do relatório atualizada com sucesso!`);
    } catch (error) {
        console.log(`❌ Avaliação do relatório não pôde ser realizada com sucesso.`);
    }
}

class UpdateReportService {
    async execute(report_id, params: Props) {

        const { profile_id, ratingToAdd, tags, resolved, approved } = params;

        console.log(report_id, profile_id)

        try {
            if (ratingToAdd) {
                UpdateProfileRating(profile_id, report_id, ratingToAdd)
            }

            if (tags) {
                await prismaClient.report.update({
                    where: {
                        id: report_id,
                    },
                    data: {
                        tags: JSON.stringify(tags)
                    }
                })
            }

            if (resolved) {
                await prismaClient.report.update({
                    where: {
                        id: report_id,
                    },
                    data: {
                        resolved: resolved
                    }
                })
            }

            if (approved) {
                await prismaClient.report.update({
                    where: {
                        id: report_id,
                    },
                    data: {
                        approved: approved
                    }
                })
            }

            const updatedReport = await prismaClient.report.findUnique({
                where: {
                    id: report_id
                }
            })

            return updatedReport;
        } catch (error) {
            console.log(error);
        }
    }
}

export { UpdateReportService }