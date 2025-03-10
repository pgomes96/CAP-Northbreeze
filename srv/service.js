module.exports = srv => {
    srv.after('READ', 'Products', items => {
        return items.map(item => {
            if (item.UnitsInStock > 100) {
                item.ProductName += ' SALE NOW ON!'
            }
            return item
        })
    })
}

const { Products } = cds.entities('northbreeze')

module.exports = srv => {
    srv.on('READ', 'Products', async (req, next) => {
        const items = await next()
        return items.filter(item => item.UnitsInStock > 100)
    })

    srv.on('TotalStockCount', async (req) => {
        const items = await cds.tx(req).run(SELECT.from(Products))
        return items.reduce((a, item) => a + item.UnitsInStock, 0)
    })
}