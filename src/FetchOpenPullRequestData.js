//Passing in an array of repos, start and end date

//Rendering each FetchPullRequestData component


import React from "react";
import Stack from 'react-bootstrap/Stack'
import FetchSpecificPullRequest from "./FetchSpecificPullRequest";

export default class FetchOpenPullRequestData extends React.Component {
    state = {
        loading: true,
        repo: null,
        prNumbers: null,
        prInfo: null
    };



    async componentDidMount() {

        const url = `https://api.github.com/repos/cbhoffman/${this.props.repo}/pulls?state=open&per_page=100`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token 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`
            }
        });
        const data = await response.json();
        const openPullRequests = [];


        data.forEach(async pr => {
            await openPullRequests.push(pr.number);
        });


        this.setState({
            repo: this.props.repo,
            prNumbers: await openPullRequests,
            loading: false
        })


    }

    render() {
        console.log(this.state.repo + " " + this.state.prNumbers)
        return (

            //For each pr number in array, display pr info
            !this.state.loading && this.state.prNumbers !== null ? (

                this.state.prNumbers.length === 0 ? null : (

                    <div>
                        <h2>{this.state.repo} ({this.state.prNumbers.length})</h2>
                        {
                            this.state.prNumbers.map(mapping => (
                                <FetchSpecificPullRequest repo={this.state.repo} prNumber={mapping} />
                            ))
                        }
                    </div>
                )




            ) : (<p>"Loading"</p>)
        )

    }

}