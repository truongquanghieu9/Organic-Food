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

// function getDirectPath({code = "000"} = {}) {
//     if(code === "001" || code === "002") return "/";
//     return "/app/dashboard";
// }

function getDirectPath({code = "002"} = {}) {
    console.log(code);
    if(code === "000") return "/app/dashboard";
    if(code === "001") return "/";
    return "/";
}

function isPermit({role = "002"} = {}){
    let uCode = role;
    return function(vCode) {
        return uCode === vCode;
    }
}

export {getAccess, getDirectPath, isPermit};
