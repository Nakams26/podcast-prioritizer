//Import components
import Form from "./Form";
import TravelResult from "./TravelResult";
import PodcastResult from "./PodcastResult";

//Import state
import { useEffect, useState } from "react";

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
  };
  //Handling to location update
  const handleTo = (event, toLocation) => {
    setTo(toLocation);
  };

  //Handling podcast update
  const handlePodcastSearch = (event, podcastSearch) => {
    setPodcastSearch(podcastSearch);
  };

  // Function to prevent reload
  const submit = (e) => {
    e.preventDefault();
    if (from.trim() === "" || to.trim() === "") {
      setMessage("Please enter a valid travel search");
    }
  };
  // Use Effect to do my api call when there is a change on the from and to and on the podcast topic
  useEffect(() => {
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
          setMessage("");
        } else if (resp.data.info.statuscode === 402) {
          setWalkTime("0");
          //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
          setMessage("Sorry, no route was found.");
        } else {
          setMessage("");
        }
      })
      //Error handling for API call.
      .catch((error) => {
        console.log(error);
        setMessage(
          "Sorry, something went wrong with our mapping. Try again shortly!"
        );
      });
    setMessage("Please wait, calculating route...");
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
        } else if (resp.data.info.statuscode === 402) {
          setBikeTime("0");
          //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
          setMessage("Sorry, no route was found.");
        } else {
          setMessage("");
        }
      })
      //Error handling for API call.
      .catch((error) => {
        setMessage(
          "Sorry, something went wrong with our mapping. Try again shortly!"
        );
      });
    setMessage("Please wait, calculating route...");
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
        } else if (resp.data.info.statuscode === 402) {
          setDriveTime("0");
          //We had to setWalkTime to a string number instead of just number -> wouldn't work otherwise -> we suspect that its because of the split function that we ran earlier -> maybe one day we'll know exactly why.
          setMessage("Sorry, no route was found.");
        } else {
          setMessage("");
        }
      })
      //Error handling for API call.
      .catch((error) => {
        setMessage(
          "Sorry, something went wrong with our mapping. Try again shortly!"
        );
      });
  }, [from, to, podcastSearch]);

  return (
    <section className="form">
      <div className="wrapper">
        <Form
          onSubmitTest={submit}
          setFrom={handleFrom}
          setTo={handleTo}
          setPodcast={handlePodcastSearch}
        />
        <TravelResult
          message={message}
          walk={walkTime}
          bike={bikeTime}
          drive={driveTime}
        />
        <PodcastResult />
        <div className="message">
          {" "}
          <p>{message}</p>{" "}
        </div>
      </div>
    </section>
  );
};

export default UserSearch;
