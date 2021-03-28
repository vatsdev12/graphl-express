const db = require('./db');

const Query = {
    company: (root, args) => db.companies.get(args.id),
    job: (roots, args) => db.jobs.get(args.id),
    jobs: () => db.jobs.list()
}

const Company = {
    jobs: (company) => db.jobs.list().filter((job) => job.companyId === company.id)
}

const Mutation = {
    createJob: (root, { input }, { user }) => {
        if (!user) {
            throw new Error("Aunthorized")
        }
        const id = db.jobs.create({...input,companyId:user.companyId})
        return db.jobs.get(id)
    }
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

module.exports = { Query, Mutation, Company, Job }