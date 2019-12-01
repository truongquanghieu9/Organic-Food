import React from "react";
import {CbImg} from "components/Uploader/CbImg";
import {Col} from "react-bootstrap";

import Browse from "./Browse";

const ListImage = ({images, upImage}) => {
    return images.map((file, i) =>
        <Col md={5} key={i}>
            {
                upImage.length > 0
                ? <CbImg name={file.uploadedAt} link={file.link}/>
                : <CbImg name={file.name} link={file.preview.url}/> 
            }
        </Col>
    )
};

export default ListImage;

// const ListImage = ({images}) => {
//     return images.map(file =>
//         <Col md={2} key={file.id}>
//             <CbImg name={file.name} link={file.preview.url}/>
//         </Col>
//     )
// };