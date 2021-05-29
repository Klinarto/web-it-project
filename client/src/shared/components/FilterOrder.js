
import React from "react";

export default function FilterOrder(props) {
    
    return(
    <div className="filter">
        <div className="Filter Status">Filter<select value={props.status} onChange={props.changeFilter}>
            <option value="">all</option>
            <option value="">all active </option>
            <option value="cancelled">cancelled</option>
            <option value="declined">declined</option>
            <option value="pending">pending</option>
            <option value="received">received</option>
            <option value="ready">ready</option>
            <option value="fulfilled">fulfilled</option>
            </select></div>
    </div>);

}

