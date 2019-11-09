import React from "react";
import {CbImg} from "components/Uploader/CbImg";
import {Col} from "react-bootstrap";

const ListImage = ({images}) => {
    return images.map(file =>
        <Col md={2} key={file.id}>
            <CbImg name={file.name} link={file.preview.url}/>
        </Col>
    )
};

export default ListImage;
