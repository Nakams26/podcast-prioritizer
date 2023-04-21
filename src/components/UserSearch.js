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
  const [messagePodcast, setMessagePodcast] = useState("");
  const [messageTravel, setMessageTravel] = useState("");
  const [message, setMessage] = useState("");

  //Defining from state  (coming from from component)
  const [from, setFrom] = useState("");

  //Defining from to (coming from form component)
  const [to, setTo] = useState("");

  //Handling from update
  const handleFrom = (event, fromLocation) => {
    setFrom(fromLocation);
  };
  //Handling to location update
  const handleTo = (event, toLocation) => {
    setTo(toLocation);
  };

  //PODCAST
  //Defining podcast search  (coming form form component)
  const [podcastSearch, setPodcastSearch] = useState("");

  // The podcastList useState will be used to hold the API data.
  const [podcastList, setPodcastList] = useState([]);
  //Handling podcast update
  const handlePodcastSearch = (event, podcastSearch) => {
    setPodcastSearch(podcastSearch);
  };

  //USER CHOICES
  //Adding userChoice (When user is clicking on biking, driving or walking)
  const [userChoice, setUserChoice] = useState("");

  //Handling userrChoice
  const handleUserChoice = (e, travelChoice) => {
    e.preventDefault();
    setUserChoice(travelChoice);
  };
  // walkTime useState will hold the estimated travel by walk that we retrieve from the MapQuest API.
  const [walkTime, setWalkTime] = useState("");

  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.
  const [bikeTime, setBikeTime] = useState("");

  // bikeTime useState will hold the estimated travel by bike that we retrieve from the MapQuest API.
  const [driveTime, setDriveTime] = useState("");

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

  //Setting new parameters in order to reformat the driveTime that we received from the API call above.
  const [driveHours, driveMinutes, driveSeconds] = driveTime
    .split(":")
    .map(Number);
  const totalDriveMinutes = Math.round(
    driveHours * 60 + driveMinutes + driveSeconds / 60
  );
  ///Math round was used to remove the decimals.
  //The math was done in order to get everything converted to minutes.

  // Function to prevent reload and manage empty input (filled with spaces)
  const submit = (e) => {
    e.preventDefault();
    setUserChoice("");
    if (from.trim() === "" || to.trim() === "" || podcastSearch.trim() === "") {
      setPodcastList([]);
      setWalkTime("0");
      setBikeTime("0");
      setDriveTime("0");
      setMessage("Please enter a valid search");
    }
  };

  //Function to call mapQuest API. Manage 3 api call in the same call with 2 different route Type parameters
  function getRoute(routeType) {
    axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "GajCx4GDQ4BbxuYSyMwSYdn9B65f9Vnx",
        from: from,
        to: to,
        routeType: routeType,
      },
    })
      .then((resp) => {
        if (resp.data.info.statuscode === 0) {
          switch (routeType) {
            case "pedestrian":
              setWalkTime(resp.data.route.formattedTime);
              setMessageTravel("");
              break;
            case "bicycle":
              setBikeTime(resp.data.route.formattedTime);
              setMessageTravel("");
              break;
            case "fastest":
              setDriveTime(resp.data.route.formattedTime);
              setMessageTravel("");
              break;
          }
        } else if (resp.data.info.statuscode === 402) {
          switch (routeType) {
            case "pedestrian":
              setWalkTime("0");
              setMessageTravel("Sorry, no route was found.");
              break;
            case "bicycle":
              setBikeTime("0");
              setMessageTravel("Sorry, no route was found.");
              break;
            case "fastest":
              setDriveTime("0");
              setMessageTravel("Sorry, no route was found.");
              break;
          }
        }
      })
      .catch((error) => {
        setMessageTravel(
          "Sorry, something went wrong with our mapping. Try again shortly!"
        );
      });
  }

  // Use Effect to do my api call when there is a change on the from, to, podcast topic and user choice
  useEffect(() => {
    if (from.trim() !== "" && to.trim() !== "" && podcastSearch.trim() !== "") {
      setMessageTravel("Please wait, calculating route...");
      // Calling my 3 apicall function here
      getRoute("pedestrian");
      getRoute("bicycle");
      getRoute("fastest");

      //API call for listen note Podcast. Depending on useChoice, I adapt the min and max length parameters
      let minLength;
      let maxLength;
      if (userChoice === "walk") {
        minLength = totalWalkMinutes - 10;
        maxLength = totalWalkMinutes + 10;
      } else if (userChoice === "bike") {
        minLength = totalBikeMinutes - 10;
        maxLength = totalBikeMinutes + 10;
      } else if (userChoice === "drive") {
        minLength = totalDriveMinutes - 10;
        maxLength = totalDriveMinutes + 10;
      } else {
        minLength = 0;
        maxLength = 6000;
      }
      setPodcastList([]);

      if (maxLength <= 6000) {
        setMessagePodcast("Please wait, podcasts are loading");
        const { Client } = require("podcast-api");
        const client = Client({ apiKey: "84ea935001f44836a966c059250896de" });
        client
          .search({
            q: podcastSearch,
            sort_by_date: 0,
            offset: 0,
            len_min: minLength,
            len_max: maxLength,
            type: "podcast",
            only_in: "title,description",
            language: "English",
            page_size: 6,
          })
          .then((response) => {
            setMessagePodcast("");
            if (response.data.results.length === 0) {
              setMessagePodcast(
                "Sorry, we couldn't find any podcasts like that, try a different search!"
              );
              //General error handling:
            } else {
              //If no errors, we have the API display the filtered list -> Update the state of the podcast list with the API.
              setPodcastList(response.data.results);
            }
          })
          .catch((error) => {
            setMessagePodcast(
              "Sorry, something went wrong with our podcast API. Try again shortly!"
            );
          });
      } else {
        setMessagePodcast(
          "Sorry, we couldn't find any podcasts that match the length of your trip, try a different search!"
        );
      }
    }
  }, [from, to, podcastSearch, userChoice]);

  return (
    <main>
        <div className="flexSection wrapper">
        <Form
          onSubmitTest={submit}
          setFrom={handleFrom}
          setTo={handleTo}
          setPodcast={handlePodcastSearch}
        />
        <TravelResult
          message={messageTravel}
          walk={walkTime}
          bike={bikeTime}
          drive={driveTime}
          userChoice={handleUserChoice}
        />
        </div>
        <PodcastResult
          message={messagePodcast}
          podcastList={podcastList}
          search={podcastSearch}
        />
        <p>{to.trim()==="" || from.trim() === "" || podcastSearch.trim() ==="" ? message :null}</p>

    </main>
  );
};

export default UserSearch;
