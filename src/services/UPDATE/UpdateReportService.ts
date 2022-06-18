import prismaClient from "../../prisma"

type Props = {
    profile_id?: number,
    rating?: number,
    tags?: JSON,
    resolved?: boolean,
    approved?: boolean
}

async function UpdateProfileRating(profile_id, report_id, rating) {
    try {
        const profile = await prismaClient.profile.findUnique({
            where: {
                id: profile_id
            }
        })

        const profileNotes = profile.ratings;

        console.log(`Antigas avaliações: `, profileNotes)
        async function verifyPreviousVote() {
            const count = Object.keys(profileNotes);
            // Verificamos se o perfil já votou nesse relatório (independentemente de qual a nota)
            for (let index = 1; index <= count.length; index++) {
                const note = profileNotes[`note${index}`];
                if (note.includes(report_id)) {
                    if (index === rating) {
                        console.log(`O usuário já votou com a nota ${rating}. Cancelando função.`)
                        return false
                    } else {
                        const indexOfNote = note.indexOf(report_id)
                        console.log(`O usuário já votou com a nota ${index} que está no index ${indexOfNote}`)
                        profileNotes[`note${index}`].splice(indexOfNote, 1)
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
                    }
                }
            }
            return true;
        }
        const continueUpdating = await verifyPreviousVote()

        if (!continueUpdating) return;

        // Como já removemos qualquer avaliação anterior, adicionamos a nova ao perfil do usuário
        profileNotes["note" + rating].push(report_id);
        console.log(`Novas avaliações: `, profileNotes)

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
                    increment: rating === 1 ? 1 : 0,
                },
                note2: {
                    increment: rating === 2 ? 1 : 0,
                },
                note3: {
                    increment: rating === 3 ? 1 : 0,
                },
                note4: {
                    increment: rating === 4 ? 1 : 0,
                },
                note5: {
                    increment: rating === 5 ? 1 : 0,
                },
            }
        });

        console.log(`✅ Avaliação do relatório atualizada com sucesso!`);
    } catch (error) {
        console.log(error, `❌ Avaliação do relatório não pôde ser realizada com sucesso.`);
    }
}

class UpdateReportService {
    async execute(report_id, params: Props) {
        const { profile_id, rating, tags, resolved, approved } = params;

        try {
            if (rating) {
                await UpdateProfileRating(profile_id, report_id, rating)
            }

            if (tags !== undefined) {
                await prismaClient.report.update({
                    where: {
                        id: report_id,
                    },
                    data: {
                        tags: JSON.stringify(tags)
                    }
                })
            }

            if (resolved !== undefined) {
                await prismaClient.report.update({
                    where: {
                        id: report_id,
                    },
                    data: {
                        resolved: resolved
                    }
                })
            }

            if (approved !== undefined) {
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