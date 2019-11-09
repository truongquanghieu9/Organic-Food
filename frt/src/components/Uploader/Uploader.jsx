import React, {useRef} from "react";
import Files from "react-files";

function Uploader({accept, get, clearOldFiles, removeFileIds, ...props}) {
    const files = useRef();

    function hdChange(fs) {
        if(fs.length > 0) {
            get(fs);
            files.current.removeFiles();
        }
    }

    function showErr(error, file) {
        console.log('error code ' + error.code + ': ' + error.message);
    }

    return (
        <Files
            ref={files}
            onChange={hdChange}
            onError={showErr}
            multiple
            // accepts={['image/*']}
            accepts={accept}
            clickable
        >
            {props.children}
        </Files>
    )
}

export default Uploader;
