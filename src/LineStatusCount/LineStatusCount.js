import React, { useEffect, useState } from 'react';
import '../styles.css';

export default function LineStatusCount(props){
    const [active, setActive] = useState(0);
    const [cancelled, setCancelled] = useState(0);
    const [blacklisted, setBlacklisted] = useState(0);
    const [suspended, setSuspended] = useState(0);
    useEffect(() => {
        props.data.forEach((on) => {
            if (on.ptnStatus === 'A') {
                setActive((prev) => prev + 1);
            } else if (on.ptnStatus === 'C') {
                setCancelled((prev) => prev + 1);
            } else if (on.ptnStatus === 'B') {
                setBlacklisted((prev) => prev + 1);
            } else if (on.ptnStatus === 'S') {
                setSuspended((prev) => prev + 1);
            }
        });
    }, []);
    return(<div className="list">
    <div className="activecircle"></div>
    <span className="context">Active Lines: {active}</span>
    <div className="cancelcircle"></div>
    <span className="context">
        Cancelled Lines: {cancelled}
    </span>
    <div className="suspendcircle"></div>
    <span className="context">
        Suspended Lines: {suspended}
    </span>
    <div className="blacklistcircle"></div>
    <span className="context">
        Blacklisted Lines: {blacklisted}
    </span>
</div>)
}