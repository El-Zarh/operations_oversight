const { roles } = require("../authenticate/roles");

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try{
            const userPermit = roles.can(req.user.role)[action](resource);

            if(!userPermit.granted) {
                return res.status(401).json({
                    error: 'You do not have permission to view resource'
                });
            }
            next();

        }catch(error){
            next(error);
        }
    }
}

const allowLoggedInUser = async(req, res, next) => {
    try{
        const user = res.locals.loggedInUser;

        if(!user)
        return res.status(401).json({
            error: 'You need to be logged in to view page resource'
        });

        req.user = user;
        next();

    }catch(error){
        next(error);
    }
}

 module.exports = { allowLoggedInUser, grantAccess };