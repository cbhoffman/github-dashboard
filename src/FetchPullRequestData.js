import React from "react";

export default class FetchPullRequestData extends React.Component {
    state = {
        loading: true,
        repo: null,
        created: null,
        closed: null,
        average: null,
        closedNoMerge: null,
    };

    getAverageOpenTime(pullRequests) {
        function getDifference(created, closed) {
            const createDate = new Date(created);
            const closedDate = new Date(closed);
            const diffTime = Math.abs(closedDate - createDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            return diffDays;
        }

        function calculateAverage(array) {
            var total = 0;
            var count = 0;

            array.forEach(function (item, index) {
                total += item;
                count++;
            });

            var result = total / count;


            return result.toFixed(2);
        }

        var newArr = [];

        pullRequests.forEach(pr => {
            var daysOpen = getDifference(pr.created_at, pr.closed_at);
            newArr.push(daysOpen);
        });

        return calculateAverage(newArr);
    }

    getClosedPRsNoMerge(pullRequests) {
        var noMergeCount = 0;

        pullRequests.forEach(pr => {
            if (pr.pull_request.merged_at === null) {
                noMergeCount++;
            }
        });

        return noMergeCount;
    }

    async componentDidMount() {
        const url = `https://api.github.com/search/issues?q=repo:cbhoffman/${this.props.repo}+is:pr+created:${this.props.start}..${this.props.end}&per_page=100`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `token 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`
            }
        });
        const createdData = await response.json();

        const url2 = `https://api.github.com/search/issues?q=repo:cbhoffman/${this.props.repo}+is:pr+closed:${this.props.start}..${this.props.end}&per_page=100`;
        const response2 = await fetch(url2, {
            method: "GET",
            headers: {
                Authorization: `token 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`
            }
        });
        const closedData = await response2.json();

        const numberOfClosed = closedData.total_count;
        const numberOfCreated = createdData.total_count;
        const averageOpenTime = numberOfClosed === 0 ? 0 : this.getAverageOpenTime(closedData.items);
        const closedNoMerge = numberOfClosed === 0 ? 0 : this.getClosedPRsNoMerge(closedData.items);

        this.setState({
            repo: this.props.repo,
            created: numberOfCreated === 0 ? 0 : numberOfCreated,
            closed: numberOfClosed === 0 ? 0 : numberOfClosed,
            average: averageOpenTime === 0 ? 0 : averageOpenTime,
            closedNoMerge: closedNoMerge === 0 ? 0 : closedNoMerge,
            loading: false
        })
    }

    render() {
        const divStyle = {
            'list-style': 'none'
        };

        return (
            <div>
                {this.state.loading || !this.state.repo ? <div>loading...</div> :
                    // || !this.state.created || !this.state.closed 
                    <div>
                        <h3 className="mb-4">{this.state.repo}</h3>
                        <ul style={divStyle}>
                            <li>Number of created Pull Requests : {this.state.created}</li>
                            <li>Number of closed Pull Requests : {this.state.closed}</li>
                            <li>Average PR wait time (in open state) : {this.state.average} {this.state.average == 1 ? 'day' : 'days'}</li>
                            <li>PRs closed without merge : {this.state.closedNoMerge}</li>
                        </ul>
                    </div>
                }
            </div>
        )
    }
}