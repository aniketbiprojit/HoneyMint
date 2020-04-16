import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">Index Component</div>

                            <div className="card-body">I'm an index component!
                {/* <p>hello</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Index;

if (document.getElementById('index')) {

    const element = document.getElementById('index')
    const atts = (element.attributes)
    const props = {}    
    $.each(atts,(i,attr)=>{
        props[atts[i].nodeName]=atts[i].nodeValue;
    })

    ReactDOM.render(<Index{...props} />, document.getElementById('index'));
}
