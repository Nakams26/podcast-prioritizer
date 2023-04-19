//Import components
import Form from "./Form";
import TravelResult from "./TravelResult";
import PodcastResult from "./PodcastResult";

//Import state
import { useState } from "react";

//Import axios
import axios from "axios";

const UserSearch = () => {
  //message useState serves as a loading state (message will be seen for .5 seconds), and error handling -> general multipurpose.
  const [message, setMessage] = useState("");

  //Defining from state  (coming from from component)
  const [from, setFrom] = useState("");
  //Defining from to (coming from form component)
  const [to, setTo] = useState("");
  //Defining podcast search  (coming form form component)
  const [podcastSearch, setPodcastSearch] = useState("");

  const [walkTime, setWalkTime] = useState("");
  // walkTime useState will hold the estimated travel by walk that we retrieve from the MapQuest API.
  const [bikeTime, setBikeTime] = useState("");
  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.
  const [driveTime, setDriveTime] = useState("");
  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.

  //Handling from update

  const handleFrom = (event, fromLocation) => {
    setFrom(fromLocation);
console.log(fromLocation)
  };
  //Handling to update
  const handleTo = (event, toLocation) => {
    setTo(toLocation);

  };
  
  //Handling to update
  const handlePodcastSearch = (event, podcastSearch) => {
    setPodcastSearch(podcastSearch);
  };

  const travelApiCall = (e) => {

    e.preventDefault()
    if (from.trim() === "" || to.trim() === "") {
      setMessage("Please enter a valid travel search");
    } else {
      setMessage("Please wait, calculating route...");

      axios({
        url: "https://www.mapquestapi.com/directions/v2/route",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          from: from,
          to: to,
          routeType: "pedestrian",
        },
      })
        //API call to display the walkTime data.
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            console.log(resp.data);
            //Status code is an actual number therefore we must set the === to a number.
            setWalkTime(resp.data.route.formattedTime);
            setMessage("")
          } else {
            setWalkTime("0");
            //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
            setMessage("Sorry, no route was found.");
          }
        })
        //Error handling for API call.
        .catch((error) => {
          setMessage(
            "Sorry, something went wrong with our mapping. Try again shortly!"
          );
        });
      axios({
        url: "https://www.mapquestapi.com/directions/v2/route",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          from: from,
          to: to,
          routeType: "bicycle",
        },
      })
        //API call to display the walkTime data.
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            console.log(resp.data);
            //Status code is an actual number therefore we must set the === to a number.
            setBikeTime(resp.data.route.formattedTime);
          } else {
            setBikeTime("0");
            //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
            setMessage("Sorry, no route was found.");
          }
        })
        //Error handling for API call.
        .catch((error) => {
          setMessage(
            "Sorry, something went wrong with our mapping. Try again shortly!"
          );
        });
      axios({
        url: "https://www.mapquestapi.com/directions/v2/route",
        method: "GET",
        dataResponse: "json",
        params: {
          key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
          from: from,
          to: to,
          routeType: "fastest",
        },
      })
        //API call to display the walkTime data.
        .then((resp) => {
          if (resp.data.info.statuscode === 0) {
            console.log(resp.data);
            //Status code is an actual number therefore we must set the === to a number.
            setDriveTime(resp.data.route.formattedTime);
          } else {
            setDriveTime("0");
            //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
            setMessage("Sorry, no route was found.");
          }
        })
        //Error handling for API call.
        .catch((error) => {
          setMessage(
            "Sorry, something went wrong with our mapping. Try again shortly!"
          );
        });
    }
  };

  return (
    <section className="form">
      <div className="wrapper">
        <Form
          onSubmitTravel={travelApiCall}
          setFrom={handleFrom}
          setTo={handleTo}
          setPodcast={handlePodcastSearch}
        />
        <TravelResult />
        <PodcastResult />
      </div>
    </section>
  );
};

export default UserSearch;
