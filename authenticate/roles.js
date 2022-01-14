const AccessControl = require("accesscontrol");

const requireAccess = new AccessControl();

 exports.roles = (() =>{
    requireAccess.grant("basic")
                 .readOwn("profile")
                 .updateOwn("profile")

    requireAccess.grant("admin")
                 .extend("basic")
                 .updateAny("profile")
                 .deleteAny("profile")
})();
