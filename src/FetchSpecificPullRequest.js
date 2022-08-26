import React from "react";
import Stack from 'react-bootstrap/Stack'


export default class FetchSpecificPullRequest extends React.Component {

    state = {
        loading: true,
        prInfo: null
    };

    async componentDidMount() {


        const pullRequestInfo = [];



        const url = `https://api.github.com/repos/cbhoffman/${this.props.repo}/pulls/${this.props.prNumber}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token ${process.env.REACT_APP_TOKEN}`
            }
        });
        const data = await response.json();

        const divStyle = {
            'textAlign': 'left'
        };

        const listStyle = {
            'listStyle': 'none'
        };


        //filtering out the open pull requests that have been approved and are ready for merging.
        if (data.mergeable_state == "clean") {

            pullRequestInfo.push(
                <div className="p-2 mb-2 bg-success text-white border bg-opacity-50" style={divStyle}>
                    <strong><p>{data.title}</p></strong>
                    <ul style={listStyle}>
                        <li><strong>Created at:</strong> {data.created_at}</li>
                        <li><strong>URL:</strong> <a href={data.html_url}>{data.html_url}</a></li>
                    </ul>
                </div>
            );
        } else if (data.draft == true) {
            pullRequestInfo.push(
                <div className="p-2 mb-2 bg-secondary text-white border bg-opacity-50" style={divStyle}>
                    <strong><p>{data.title}</p></strong>
                    <ul style={listStyle}>
                        <li><strong>Created at:</strong> {data.created_at}</li>
                        <li><strong>URL:</strong> <a href={data.html_url}>{data.html_url}</a></li>
                    </ul>
                </div>
            );
        } else if (data.mergeable_state == "dirty") {
            pullRequestInfo.push(
                <div className="p-2 mb-2 bg-danger text-white border bg-opacity-50" style={divStyle}>
                    <strong><p>{data.title}</p></strong>
                    <ul style={listStyle}>
                        <li><strong>Created at:</strong> {data.created_at}</li>
                        <li><strong>URL:</strong> <a href={data.html_url}>{data.html_url}</a></li>
                    </ul>
                </div>
            );
        } else {
            pullRequestInfo.push(
                <div className="p-2 mb-2 border" style={divStyle}>
                    <strong><p>{data.title}</p></strong>
                    <ul style={listStyle}>
                        <li><strong>Created at:</strong> {data.created_at}</li>
                        <li><strong>URL:</strong> <a href={data.html_url}>{data.html_url}</a></li>
                    </ul>
                </div>
            );
        }

        this.setState({
            prInfo: await pullRequestInfo,
            loading: false
        })
    }

    render() {

        return (
            this.state.prInfo
        )
    }

}