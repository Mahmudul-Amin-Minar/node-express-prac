import prisma from "../db";

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id
        }
    })
    res.json({data: update})
}
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            update: true
        }
    })
    const updates = products.reduce((allUpdate, product) => {
        return [...allUpdate, ...product.update]
    }, [])
    res.json({data: updates})
}

export const createUpdate = async (req, res) => {
    // const {productId, ...rest} = req.body;
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })
    if(!product){
        // does not belongs to you 
        return res.json({message: 'nope'});
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })
    res.json({data: update});
}
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id,
        },
        include: {
            update: true
        }
    })

    const updates = products.reduce((allUpdate, product) => {
        return [...allUpdate, ...product.update]
    }, [])
    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        // handle this 
        return res.json({message: 'nope'})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
}
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id,
        },
        include: {
            update: true
        }
    })

    const updates = products.reduce((allUpdate, product) => {
        return [...allUpdate, ...product.update]
    }, [])
    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        // handle this 
        return res.json({message: 'nope'})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({data: deleted})
}