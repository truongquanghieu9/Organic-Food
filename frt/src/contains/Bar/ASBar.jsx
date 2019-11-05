import React, {useState, useEffect} from "react";
import ASBar from "components/Bar/ASBar";

function ASBarContain({data, keys, setData, ...props}){
    const [origin, setOrigin] = useState([]);
    const [search, setSearch] = useState("");

    const hdChange = (e) => setSearch(e.target.value);

    useEffect(() => {
        if(origin.length === 0) setOrigin(data);
        if(search.length > 0) {
            let searchData = origin.length > 0 ? origin : data;
            let found = searchData.map(getKey)
                .filter(d => d.vals.some(v => v.includes(search.toLowerCase())))
                .map(rs => rs.obj);
            setData(found);
        } else {
            setData(origin.length > 0 ? origin : data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    function accessKey(keys, obj) {
        let v = obj;
        if(keys.length > 0) {
            if(v[keys[0]]) {
                v = v[keys[0]];
                keys.splice(0, 1);
                return accessKey(keys, v);
            } else {
                v = ""
            }
        }
        return v.toString().toLowerCase();
    }

    function getKey(obj) {
        let vals = keys.map(k => accessKey(k.split("."), obj));
        return {vals, obj}
    }

    return <ASBar
        {...props}
        search={search}
        hdChange={hdChange}
    />
}

export default ASBarContain;
