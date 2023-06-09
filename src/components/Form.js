//Travel form component. this one is using google map api for address suggestion

//Importing modules needed for autocompletion
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { useState } from "react";

const Form = (props) => {
  //Podcast variable
  const [podcast, setPodcast] = useState("");
  const [language, setLanguage] = useState("");
  const handlePodcast = (e) => {
    // Update the keyword of the input element
    setPodcast(e.target.value);
  };

  const handleLanguage = (e) => {
    // Update the keyword of the select element
    setLanguage(e.target.value);
  };
  //From variable
  const {
    ready: readyFrom,
    value: valueFrom,
    suggestions: { status: statusFrom, data: dataFrom },
    setValue: setValueFrom,
    clearSuggestions: clearSuggestionsFrom,
  } = usePlacesAutocomplete({
    debounce: 300,
  });
  //destination variable
  const {
    ready: readyTo,
    value: valueTo,
    suggestions: { status: statusTo, data: dataTo },
    setValue: setValueTo,
    clearSuggestions: clearSuggestionsTo,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const refFrom = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestionsFrom();
  });

  const refTo = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestionsTo();
  });

  const handleInputFrom = (e) => {
    // Update the keyword of the input element
    setValueFrom(e.target.value);
  };
  const handleInputTo = (e) => {
    // Update the keyword of the input element
    setValueTo(e.target.value);
  };

  const handleSelectFrom =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValueFrom(description, false);
      clearSuggestionsFrom();
    };

  const handleSelectTo =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValueTo(description, false);
      clearSuggestionsTo();
    };

  const renderSuggestionsFrom = () =>
    dataFrom.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelectFrom(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  const renderSuggestionsTo = () =>
    dataTo.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelectTo(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <section className="form">
      <p>
        {" "}
        <span>Step 1:</span> Enter your travel, a podcast topic and language!
      </p>
      <form
        className="formFlex"
        onSubmit={(event) => {
          // Using props to pass data to the parent element
          props.setFrom(event, valueFrom);
          props.setTo(event, valueTo);
          props.setPodcast(event, podcast);
          props.setLanguage(event, language);
          props.onSubmitTest(event);
        }}
        action=""
      >
        <div ref={refFrom}>
          <label htmlFor="from" className="sr-only">
            Where are you starting from?
          </label>
          <input
            required
            id="from"
            value={valueFrom}
            onChange={handleInputFrom}
            disabled={!readyFrom}
            placeholder="Where are you starting from?"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {statusFrom === "OK" && <ul>{renderSuggestionsFrom()}</ul>}
        </div>
        <div ref={refTo}>
          <label htmlFor="to" className="sr-only">
            Where are you heading to?
          </label>
          <input
            required
            id="to"
            value={valueTo}
            onChange={handleInputTo}
            disabled={!readyTo}
            placeholder="Where are you heading to?"
          />
          {/* We can use the "status" to decide whether we should display the dropdown or not */}
          {statusTo === "OK" && <ul>{renderSuggestionsTo()}</ul>}
        </div>
        <label htmlFor="podcast"></label>
        <input
          required
          id="podcast"
          type="text"
          onChange={handlePodcast}
          placeholder="Search for type of podcast (i.e 'cooking' or 'raptors)'"
        />
        <select onChange={handleLanguage} name="language" id="language">
          <option value="English">English</option>
          <option value="French">Français</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
export default Form;
