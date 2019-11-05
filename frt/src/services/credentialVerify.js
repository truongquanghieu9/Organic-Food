const routeType = {
    guestAccess: uCode => allow(uCode, "002"),
    peopleAccess: uCode => allow(uCode, "001"),
    ownerAccess: uCode => allow(uCode, "000")
}

function allow(uCode, rCode) {
    return uCode === rCode;
}

function getAccess({code = "002"} = {}) {
    return function(access) {
        let rs = null;
        for(let i = 0; i < access.length; i++) {
            rs = routeType[access[i]](code);
            if(rs) break;
        }
        return rs;
    }
}

function getDirectPath({code = "002"} = {}) {
    if(code === "000" || code === "001") return "/dashboard";
    return "/login";
}

function isPermit({role = "002"} = {}){
    let uCode = role;
    return function(vCode) {
        return uCode === vCode;
    }
}

export {getAccess, getDirectPath, isPermit};
