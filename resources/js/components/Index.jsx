import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload=this.handleUpload.bind(this);
    }


    async handleUpload() {
        const formdata = new FormData();
        formdata.append("image", this.state.image);
        console.log(formdata)
        const data = await axios({
            url: "/api/upload",
            method: "POST",
            data: formdata,
            header: {
                "Content-Type": "multipart/form-data"
            }
        });

    }

    render() {
        return (
            <div
                class="modal fade"
                id="modalPush"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div
                    class="modal-dialog modal-notify modal-info"
                    role="document"
                >
                    <div class="modal-content text-center">
                        <div class="modal-header d-flex justify-content-center">
                            <h3 class="heading">Upload Poster</h3>
                        </div>

                        <div class="modal-body">
                            <i class="fas fa-bell fa-4x animated rotateIn mb-4"></i>
                            <form>
                                <input onChange={(e) => this.setState({image:e.target.files[0]})} type="file" name="image" id="image" />
                            </form>
                        </div>

                        <div class="modal-footer flex-center">
                            <a onClick={this.handleUpload} class="btn btn-info">
                                Upload
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        const data = JSON.parse(this.props.userdata);
        this.state = { userdata: data };
    }

    componentDidMount() {
        // console.log(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <Modal />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div
                                    className="card-header row"
                                    style={{ margin: "0" }}
                                >
                                    <div className="col-md-10">Posts</div>
                                    <div
                                        className="col-md-2"
                                        style={{ textAlign: "right" }}
                                    >
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            data-toggle="modal"
                                            data-target="#modalPush"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="row">
                                        
                                            <div className="col-md-6">
                                                Uploaded Posts :{" "}
                                                {
                                                    this.state.userdata
                                                        .currentPosts
                                                }{" "}
                                            </div>
                                            <div className="col-md-6">
                                                Remaining Posts:
                                                {this.state.userdata
                                                    .allowedPosts -
                                                    this.state.userdata
                                                        .currentPosts}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Index;

if (document.getElementById("index")) {
    const element = document.getElementById("index");
    const atts = element.attributes;
    const props = {};
    $.each(atts, (i, attr) => {
        props[atts[i].nodeName] = atts[i].nodeValue;
    });

    ReactDOM.render(<Index {...props} />, document.getElementById("index"));
}
