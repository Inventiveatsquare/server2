const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
  ac.grant("client")
    .readOwn("profile")
    .updateOwn("profile")

  ac.grant("merchant")
    .extend("client")
    .readAny("profile")

  ac.grant("admin")
    .extend("client")
    .extend("merchant")
    .updateAny("profile")
    .deleteAny("profile")

  return ac;
})();
