export default {
    jwt : {
        secret: process.env.App_SECRET || 'default',
        expiresIn: '1d'
    }
};