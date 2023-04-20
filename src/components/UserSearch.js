//Import components
import Form from "./Form";
import TravelResult from "./TravelResult";
import PodcastResult from "./PodcastResult";

//Import state
import { useEffect, useState } from "react";

//Import axios
import axios from "axios";

const UserSearch = () => {
  //TRAVEL
  //message useState serves as a loading state (message will be seen for .5 seconds), and error handling -> general multipurpose.
  const [message, setMessage] = useState("");

  //Defining from state  (coming from from component)
  const [from, setFrom] = useState("");

  //Defining from to (coming from form component)
  const [to, setTo] = useState("");

  //PODCAST
  //Defining podcast search  (coming form form component)
  const [podcastSearch, setPodcastSearch] = useState("");
  // The podcastList useState will be used to hold the API data.
  const [podcastList, setPodcastList] = useState([]);
  //Adding userChoice
  const [userChoice, setUserChoice] = useState("");

  const handleUserChoice = (e, travelChoice) => {
    e.preventDefault();
    setUserChoice(travelChoice);
    console.log(userChoice);
  };

  const [walkTime, setWalkTime] = useState("");
  // walkTime useState will hold the estimated travel by walk that we retrieve from the MapQuest API.
  const [bikeTime, setBikeTime] = useState("");
  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.
  const [driveTime, setDriveTime] = useState("");
  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.

  //**Setting new parameters in order to reformat the walkTime that we received from the API call above:
const [walkHours, walkMinutes, walkSeconds] = walkTime.split(":").map(Number);
//Estimated walk time data was received in hours, minutes, and seconds and separated by colons.
//We used split to get rid of the colons.
const totalWalkMinutes = Math.round(
  walkHours * 60 + walkMinutes + walkSeconds / 60
);
///Math round was used to remove the decimals.
//The math was done in order to get everything converted to minutes.

//Setting new parameters in order to reformat the bikeTime that we received from the API call above.
const [bikeHours, bikeMinutes, bikeSeconds] = bikeTime.split(":").map(Number);
const totalBikeMinutes = Math.round(
  bikeHours * 60 + bikeMinutes + bikeSeconds / 60
);

const [driveHours, driveMinutes, driveSeconds] = driveTime.split(":").map(Number);
const totalDriveMinutes = Math.round(
  driveHours * 60 + driveMinutes + driveSeconds / 60
);

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
  };
  // Use Effect to do my api call when there is a change on the from and to and on the podcast topic
  useEffect(() => {
    if (from.trim() === "" || to.trim() === "" || podcastSearch.trim() === "") {
      setPodcastList([]);
      setWalkTime("0");
      setBikeTime("0");
    } else {
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
        let minLength;
    let maxLength;
    if (userChoice === "walk") {
      minLength = totalWalkMinutes - 10;
      maxLength = totalWalkMinutes + 10;
    } else if (userChoice === "bike") {
      minLength = totalBikeMinutes - 10;
      maxLength = totalBikeMinutes + 10;
    }else if (userChoice === "drive") {
      minLength = totalDriveMinutes - 10;
      maxLength = totalDriveMinutes + 10;
    } else {
      minLength = 0;
      maxLength = 6000;
    }
    setPodcastList([]);

         if (maxLength <=6000) {
        const { Client } = require("podcast-api");

        // If apiKey is null, then we will connect to a mock server
        // that returns fake data for testing purposes.
        const client = Client({ apiKey: "84ea935001f44836a966c059250896de" });
        client
          .search({
            q: podcastSearch,
            type: "podcast",
            offset: 0,
            len_min: minLength,
            len_max: maxLength,
            only_in: "title,description",
            language: "English",
            page_size: 10,
          })
          .then((response) => {
            setMessage("");
            if (response.data.results.length === 0) {
              setMessage(
                "Sorry, we couldn't find any podcasts like that, try a different search!"
              );
  
              //Refer to lines 156 to 163.
              //General error handling:
            } else {
              //If no errors, we have the API display the filtered list -> Update the state of the podcast list with the API.
              setPodcastList(
                response.data.results.map((list) => {
                  setMessage(
                    "Here are some podcasts you can listen to on your trip!"
                  );
                  return list;
                })
              );
            }
          })
          .catch((error) => {
            setMessage(
              "Sorry, something went wrong with our podcast API. Try again shortly!"
            );
          });
        } else {
          setMessage("Sorry, we couldn't find any podcasts that match the length of your trip, try a different search!");
        }
    }
  }, [from, to, podcastSearch,userChoice]);


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
          userChoice={handleUserChoice}
        />
        <PodcastResult podcastList={podcastList}/>
        <div className="message">
          {" "}
          <p>{message}</p>{" "}
        </div>
      </div>
    </section>
  );
};

export default UserSearch;
