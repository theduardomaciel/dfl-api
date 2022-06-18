import { response, Response } from "express";
import prismaClient from "../../prisma";

class ReadReportService {
    async execute(response: Response, report_id, filters?) {
        if (report_id) {
            try {
                const report = await prismaClient.report.findUnique({
                    where: {
                        id: report_id,
                    },
                    include: {
                        profile: true
                    }
                })
                return report;
            } catch (error) {
                console.log(error)
                response.status(400)
                return { errorCode: "database.error" }
            }
        } else {
            const { location, username, exclusionsId, profileToExcludeId, searchCount, includeInfo } = filters;
            try {
                if (location || username) {
                    const reports = await prismaClient.report.findMany({
                        where: {
                            OR: [
                                {
                                    address: location && {
                                        contains: location,
                                        mode: "insensitive"
                                    },
                                },
                                {
                                    profile: {
                                        username: username && {
                                            contains: username,
                                            mode: "insensitive"
                                        },
                                    },
                                }
                            ],
                            AND: [
                                {
                                    id: { notIn: exclusionsId },
                                },
                                {
                                    profile_id: { not: profileToExcludeId }

                                }
                            ]
                        },
                        take: searchCount && parseInt(searchCount),
                        include: includeInfo && {
                            comments: {
                                include: {
                                    profile: true
                                }
                            },
                            profile: true
                        }
                    })
                    console.log(reports, searchCount ? `Obtivemos os ${searchCount} primeiros relatórios com os filtros determinados.` : `Obtivemos os relatórios com os filtros determinados.`)
                    return reports;
                } else {
                    const reports = await prismaClient.report.findMany({
                        take: searchCount && parseInt(searchCount),
                    })
                    console.log(`Obtivemos todos os relatórios com sucesso.`)
                    return reports;
                }
            } catch (error) {
                console.log(error)
                response.status(400)
                return error
            }
        }
    }
}

export { ReadReportService }

/* const reports = await prismaClient.$queryRaw`
                CREATE EXTENSION unaccent;
    
                CREATE OR REPLACE FUNCTION public.immutable_unaccent(regdictionary, text)
                    RETURNS text LANGUAGE c IMMUTABLE PARALLEL SAFE STRICT AS
                '$libdir/unaccent', 'unaccent_dict';
    
                CREATE OR REPLACE FUNCTION public.f_unaccent(text)
                    RETURNS text LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT AS
                $func$
                SELECT public.immutable_unaccent(regdictionary 'public.unaccent', $1)
                $func$;
                SELECT *
                FROM   reports
                WHERE  lower(f_unaccent(address)) = lower(f_unaccent(${location}));` */