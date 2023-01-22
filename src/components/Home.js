import React, { useEffect } from 'react'
import { useState } from 'react'
import { Blocks } from 'react-loader-spinner'
import "../App.css";

const Home = () => {
    const userName = "hardik"
    const apiKey = "42b6760ac57219177a68c5437eaac467e7833fe6"
    // Initialising required variables
    const today = new Date();
    let startTimeString = today.toISOString().substring(0, 10);
    console.log(startTimeString)
    let todayDate = today.getDate();

    // const contestApiUrl = `https://cors-anywhere.herokuapp.com/https://clist.by/api/v2/contest/?username=${userName}&api_key=${apiKey}&start__gt=${startTimeString}&limit=100&order_by=start`;
    const contestApiUrl = `https://cors-anywhere.herokuapp.com/https://clist.by/api/v2/contest/?username=${userName}&api_key=${apiKey}&start__gt=${startTimeString}&limit=100&order_by=start`;

    // useEffect(() => {
    //     showAPIData(contestApiUrl)
    // }, [])


    // async function showAPIData(url) {

    //     let response = await fetch(url , {
    //         "method": "GET",
    //         "mode":"cors",
    //         "access-control-allow-origin" : "*",
    //         "headers": {
    //             "Content-Type": "text/html",
    //         },
    //     });
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     let data = await response.json();
    //     console.log(data);
    //     show(data.objects);
    // }

    useEffect(() => {
        f()
    }, [])


    // const [body , setbody] = useState([]);
    let array;
    let f = async () => {
        let response = await fetch(contestApiUrl, {
            "method": "GET",
            "mode": "cors",
            "access-control-allow-origin": "*",
            "headers": {
                "Content-Type": "text/html",
            }
        })
        let data = await response.json()
        array = data.objects;
        show(data.objects)
        // console.log(array)
    }


    function show(contests) {
        let table = document.getElementById("coming-contests-table-body");
        let header = document.getElementById("current-contest");

        let comingContests = getComingContestData(contests);
        let i = 0, upcomingContests = 0;

        // Loop to access starting 5 contests
        while (upcomingContests < 5) {

            // Store contest details
            let contestName = comingContests[i].event;

            let contestDate = new Date(comingContests[i].start);
            let timeUTC = contestDate.getTime();
            let dateIST = new Date(timeUTC);
            // date shifting for IST timezone (+5 hours and 30 minutes)
            dateIST.setHours(dateIST.getHours() + 5);
            dateIST.setMinutes(dateIST.getMinutes() + 30);
            let contestStartDate = dateIST.toDateString();
            let contestStartTime = dateIST.toTimeString().substring(0, 8);



            let contestDuration = (comingContests[i].duration / 3600).toPrecision(2);
            let contestLink = comingContests[i].href;

            // Update contests index
            i++;



            if (contestDate.getDate() == todayDate) {
                let statusString = "There's a";
                // If the contest is over or started.
                if (today.getTime() > dateIST.getTime()) {
                    statusString = "There was a";
                }
                header.innerHTML = (
                    `${statusString} ${contestName} contest today of duration \
                    ${contestDuration} hrs at ${contestStartTime}!`
                );
                continue;
            }

            let row = getContestRow(
                contestName,
                contestDuration,
                `${contestStartDate} ${contestStartTime}`,
                contestLink,
            );

            table.appendChild(row);

            // Increment upcoming contests.
            upcomingContests++;
        }
    }


    function getContestRow(contestName, contestDuration, contestStartDate, contestLink) {
        // Create a new row instance
        let row = document.createElement("tr");
        // Set Contest name
        let name = document.createElement("td");
        name.innerHTML = contestName;
        row.appendChild(name);

        // Set Contest duration
        let duration = document.createElement("td");
        duration.innerHTML = contestDuration;
        row.appendChild(duration);

        // Set Contest start time
        let startDate = document.createElement("td");
        startDate.innerHTML = contestStartDate;
        row.appendChild(startDate);

        // Set Contest link button
        let link = document.createElement("td");
        let linkBtn = document.createElement("a");
        linkBtn.innerHTML = "Link";
        linkBtn.setAttribute("class", "link-button btn btn-outline-warning");
        // linkBtn.setAttribute("href", contestLink);
        linkBtn.href = contestLink;
        linkBtn.target = '_blank';
        link.appendChild(linkBtn);
        console.log(link);
        row.appendChild(link);

        return row;
    }

    function getComingContestData(contests) {
        let result = new Array();

        // Only select contests from following platforms
        const codeForcesHREF = "http://codeforces.com/contests";
        const codeChefHREF = "https://www.codechef.com";
        const atCoderHREF = "https://atcoder.jp/contests";

        for (let i = 0; i < contests.length; i++) {
            let is_required = false;

            is_required = is_required || (
                contests[i].href.substring(0, codeForcesHREF.length) == codeForcesHREF ||
                contests[i].href.substring(0, codeChefHREF.length) == codeChefHREF ||
                contests[i].href.substring(0, atCoderHREF.length) == atCoderHREF
            )

            if (is_required) {
                result.push(contests[i]);
            }
        }

        return result;
    }


    return (
        <div>
            <div className='container-fluid' style={{ backgroundColor: "white" }}>
                <h3 id="current-contest" className="container-fluid" align="center" style={{ color: 'white' }}>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                    Please Wait ...
                </h3>
                <hr />
                <div id="coming-contests" align="center">
                    <table id="coming-contests-table" className="table table-borderless">
                        <thead>
                            <tr>
                                <th id="cont" style={{ textAlign: 'center' }}>Contest name</th>
                                <th style={{ textAlign: 'center' }}>Duration (hrs)</th>
                                <th id="start" style={{ textAlign: 'center' }}>Start time</th>
                                <th style={{ textAlign: 'center' }}>Link to Contest</th>
                            </tr>
                        </thead>
                        <tbody id="coming-contests-table-body" align="center">
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <Email body = {array} /> */}
        </div>
    )
}

export default Home
