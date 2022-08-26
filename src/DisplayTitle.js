import React from "react";
import moment from "moment";

function DisplayTitle(start, end){
  
    return (  
    <div className="summary">
        <p>
        Pull Request Activity from {moment(start).format("LL")} to{" "} {moment(end).format("LL")}.
        </p>
    </div>)
  }

  export default DisplayTitle;