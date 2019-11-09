import React, {Component} from "react";
import Files from "react-files";
import {Row} from "react-bootstrap";

export default function withUploader(RenderComponent){
    class Uploader extends Component {

        getUpFile = (files) => {
            console.log(files);
            const {getFile} = this.props;
            getFile(files);
        }

        showErr = (error, file) => console.log('error code ' + error.code + ': ' + error.message);

        render() {
            const {file, icon} = this.props;
            return (
                <Row>
                    <div className="col-md-12">
                        <Files
                            onChange={this.getUpFile}
                            onError={this.showError}
                            multiple
                            accepts={['image/*']}
                            clickable
                        >
                            <RenderComponent file={file} icon={icon}/>
                        </Files>
                    </div>
                </Row>
            )
        }
    }

    return Uploader;
}
