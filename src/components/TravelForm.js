//Travel form component. this one is using google map api for address suggestion

//Importing modules needed for autocompletion
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";


const TravelForm = () => {
  //From variable
  const {
    ready: readyFrom,
    value: valueFrom,
    suggestions: { status: statusFrom, data: dataFrom },
    setValue: setValueFrom,
    clearSuggestions: clearSuggestionsFrom,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
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
    requestOptions: {
      /* Define search scope here */
    },
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
    <>
      <div ref={refFrom}>
        <label htmlFor="from" className="sr-only">
          Where are you starting from?
        </label>
        <input
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
          id="to"
          value={valueTo}
          onChange={handleInputTo}
          disabled={!readyTo}
          placeholder="Where are you heading to?"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {statusTo === "OK" && <ul>{renderSuggestionsTo()}</ul>}
      </div>
    </>
  );
};
export default TravelForm;
