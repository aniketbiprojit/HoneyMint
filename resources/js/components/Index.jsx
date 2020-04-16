import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.forceUpdate();
    }

    componentDidMount() {
        const elem_hidden = document.getElementById("hide");
        elem_hidden.style.visibility = "hidden";
        elem_hidden.style.display = "none";
    }
    async handleUpload() {
        const formdata = new FormData();
        formdata.append("image", this.state.image);
        formdata.append("userId", this.props.data.id);
        const data = await axios({
            url: "/api/upload",
            method: "POST",
            data: formdata,
            header: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (data.status === 200) {
            document.getElementById("uploadDone").style.display = "none";
            document.getElementById("uploadDone").style.visibility = "hidden";
            const elem_hidden = document.getElementById("hide");
            elem_hidden.style.visibility = "visible";
            elem_hidden.style.display = "block";
        }
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
                        <div id="uploadDone">
                            <div id="shown-open" class="modal-body">
                                <i class="fas fa-bell fa-4x animated rotateIn mb-4"></i>
                                <form>
                                    <input
                                        onChange={e =>
                                            this.setState({
                                                image: e.target.files[0]
                                            })
                                        }
                                        type="file"
                                        name="image"
                                        id="image"
                                    />
                                </form>
                            </div>

                            <div class="modal-footer flex-center">
                                <a
                                    onClick={this.handleUpload}
                                    class="btn btn-info"
                                >
                                    Upload
                                </a>
                            </div>
                        </div>
                        <div id="hide" class="modal-body">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function Image(props){
    return <img src={props.path}/>
}

class Poster extends React.Component {
    constructor() {
        super();
        this.state = { load: false, imgs: [] };
    }
    async componentDidMount() {
        let data = JSON.parse(this.props.posters);
        data = await axios.post("/api/posters", { id: data.id });
        this.setState({ imgs: data.data, load: true });
        // this.forceUpdate();
    }

    render() {
        return (
            <div>
                
                {this.state.load
                    ? this.state.imgs.forEach(elem => {
                        <li>
                            <Image path='http://localhost:8000/images/1/1587042774.png'/>
                        </li>
                      })
                    : 0}
            </div>
        );
    }
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        const data = JSON.parse(this.props.userdata);
        this.state = { userdata: data, posters: [] };
    }

    render() {
        return (
            <React.Fragment>
                <Modal data={this.state.userdata} />
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
                                            {this.state.userdata.currentPosts}{" "}
                                        </div>
                                        <div className="col-md-6">
                                            Remaining Posts:
                                            {this.state.userdata.allowedPosts -
                                                this.state.userdata
                                                    .currentPosts}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Poster posters={this.props.userdata} />
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
