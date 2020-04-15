import * as React from 'react';


export class Dashboard extends React.Component<any, any> {
    fileRef: any;
    constructor(props: any) {
        super(props);
        this.state = {
            json: ""
        };
        this.fileRef = React.createRef();
    }

    handleStateChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    onClickSubmit = (e: any) => {
        e.preventDefault();
        const { json } = this.state;
        if (this.fileRef.current.files.length > 0 && json) {
            const file = this.fileRef.current.files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("data", json);
            let requestOptions = {
                method: "post",
                body: formData
            }
            return fetch("http://localhost:8084/fileupload", requestOptions).then((response: any) => {
                this.convertStreamToFile(response, "result.pdf");
            });
        };
    };

    render() {
        const state = this.state;
        return (
            <div className="container dashboard-container">
                <form>
                    <input type="file" ref={this.fileRef} />
                    <br />
                    <textarea className="m-t-2" value={state.json} name="json" onChange={this.handleStateChange} style={{width: "300px", height:"300px", color: "black"}}></textarea>
                    <br />
                    <button className="m-t-2" onClick={this.onClickSubmit}>Submit</button>
                </form>
            </div>
        );
    }

    convertStreamToFile = (data: any, fileName: any) => {
        data.blob().then((blob: any) => {
            let url = window.URL.createObjectURL(blob); {
                let objFra: any = document.getElementById("print_iframe");
                if (!objFra) {
                    objFra = document.createElement('iframe');
                    objFra.id = "print_iframe";
                }
                objFra.title = fileName;
                objFra.style.visibility = "hidden";
                objFra.src = url;
                document.body.appendChild(objFra);
                objFra.contentWindow.focus();
                objFra.contentWindow.print();
                window.URL.revokeObjectURL(url);
            }
        });
    }
};