import React, {Component} from "react";
import {apiFdCall} from "services/api";
import {CbImg} from "components/Uploader/CbImg";
import withUploader from "hocs/withUploader";
import withNoti from "hocs/withNoti";
import {connect} from "react-redux";
import ColUploadBox from "components/Uploader/ColUploadBox";
import CardInput from "components/Uploader/CardInput.jsx";
import {
  Row,
  Col,
  Tab
} from "react-bootstrap";

const Browse = () => <button className="btn btn-success btn-fill"><i className="fas fa-plus"></i> Browse more file</button>

class ColSubmit extends Component {

    constructor(props){
        super(props);
        this.state = {
            imageFiles: [],
        }
    }

    removeImage = () => this.setState({imageFiles: []});

    getImage = (files) => {
        const {imageFiles} = this.state;
        this.setState({imageFiles: [...imageFiles, ...files]});
    }

    submit = async() => {
        let {notify, apiCreate, user, colId, load} = this.props;
        const {imageFiles} = this.state;
        try{
            let fd = new FormData();
            let hasImg = imageFiles.length > 0;
            if(hasImg){
                if(hasImg){
                    imageFiles.forEach((file, i) => {
                        fd.append('images' , file);
                    })
                }
                fd.append("collection_id", colId);
                await apiFdCall("post", apiCreate(user._id), fd);
                notify("success", "Add new contribution successfully!");
                this.setState({
                    imageFiles: []
                });
                await load();
            } else {
                return notify("error", "Cannot submit without any uploaded contribution.");
            }
        } catch(err){
            return notify("error", "Cannot submit contribution now. Please try again.");
        }
    }

    toggleChange = () => {
        this.setState({
            checked: !this.state.checked,
        });
    }

    render() {
        const {uploadImage} = this.props;
        const {imageFiles} = this.state;
        const NoImg = withUploader(ColUploadBox);
        const BrowseBtn = withUploader(Browse);
        const listImg = imageFiles.map(file => (
            <Col md={2} key={file.id}>
                <CbImg name={file.name} link={file.preview.url}/>
            </Col>
        ));

        const tabsIcons = (
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="info">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="info">
                                {
                                    listImg.length > 0
                                    ? <div>
                                        {listImg}
                                        <Col md={12}>
                                            <div className="uploadBtn">
                                                <BrowseBtn {...uploadImage} getFile={this.getImage}/>
                                                <button className="btn btn-default" onClick={this.removeImage}><i className="fas fa-trash"></i></button>
                                            </div>
                                        </Col>
                                    </div>
                                    : <NoImg
                                        {...uploadImage}
                                        rm={this.removeImage}
                                        getFile={this.getImage}
                                        file="image"
                                        icon="fas fa-file-image"
                                    />
                                }
                                {
                                    <button bsStyle="info" pullRight fill onClick={this.submit}> Submit Contribution</button>
                                }
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );

        return (
            <div>
                <legend className="title">Submit Contribution</legend>
                <CardInput
                    title="Upload Images & Words"
                    category="Switch tabs for changing between file types"
                    ctFullWidth
                    content={tabsIcons}
                />
                <div className="clearfix" />
            </div>
        )
    }
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(withNoti(ColSubmit));
