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

        const originalProfileNotes = profile.ratings;
        let profileNotes = originalProfileNotes;

        const count = Object.keys(originalProfileNotes).length;

        console.log(`Antigas avaliações: `, profileNotes)
        async function verifyPreviousVote() {
            // Verificamos se o perfil já votou nesse relatório (independentemente de qual a nota)
            for (let index = 1; index <= count; index++) {
                // Verificamos nota por nota se o usuário já votou (nota = index)
                const index_reports = profileNotes["note" + index];
                index_reports.forEach(async reportId => {
                    // Caso encontremos um relatório com a mesmo id do atual, o usuário já votou nesse relatório (com a nota = index)
                    if (reportId === report_id) {
                        // Se essa nota (index) for igual a nota que será adicionada no relatório, paramos a atualização, já que o usuário já votou. 
                        // Não podemos adicionar essa nota novamente.
                        if (index === rating) {
                            return false
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
                        }
                    }
                });
                profileNotes["note" + index] = index_reports
                return true
            }
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