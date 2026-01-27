
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Verifying PromptTemplates...')

    const sport = await prisma.promptTemplate.findUnique({ where: { name: 'sport' } })
    if (sport) {
        console.log('✅ Found "sport" template.')
    } else {
        console.error('❌ "sport" template NOT found.')
    }

    const count = await prisma.promptTemplate.count()
    console.log(`Total templates in DB: ${count}`)

    const all = await prisma.promptTemplate.findMany({ select: { name: true } })
    console.log('Templates:', all.map(t => t.name).join(', '))
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
