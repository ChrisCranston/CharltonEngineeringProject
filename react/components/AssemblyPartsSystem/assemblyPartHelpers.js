/**
 * formatString
 *
 * Formats a string to become human readable by capitalising each letter and
 * converting the underscores to spaces
 *
 * @param  {string} string the string to format
 * @return {string}        the string formatted into a human readable format
 */
export const formatString = (string) => {
  return string
    .replace(/_/g, " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ");
};

/**
 * validateField
 *
 * validates string or number input field on the client side to
 * ensure data is correct before being sent to the server.
 *
 * Returns an error message to inform the user of their invalid input
 * or false if the field is valid.
 *
 * @param  {string}  field        the input field name to format into a human readable format for error messages
 * @param  {string}  type         the input type (string or number)
 * @param  {string}  value        the input value
 * @param  {boolean} isMandatory  whether the field is mandatory or not
 * @return {string}  OR {boolean} the error message or false if no validation errors
 */
export const validateField = (field, type, value, isMandatory) => {
  var error = false;
  const humanReadableKey = formatString(field);

  if (!value && isMandatory) {
    error = humanReadableKey + " cannot be empty";
  } else if (type === "number" && value <= 0) {
    error = humanReadableKey + " must be greater than zero";
  }

  return error;
};

/**
 * validateFields
 *
 * validates a set of input fields and returns the input errors (if any) for each field or false if not.
 *
 * @param  {object} data object of input values featuring input type, input value, and whether the input is mandatory
 * @return {object}      updated object of input values with any input errors applied
 */
export const validateFields = (data) => {
  Object.keys(data).forEach((field) => {
    const inputError = validateField(
      field,
      data[field].type,
      data[field].value,
      data[field].mandatory
    );

    data[field].inputError = inputError;
  });

  return data;
};

/**
 * handleTextEntry
 *
 * sets the input object's value and resets any inputErrors when the user enters text into the input
 *
 * @param  {object} data  object of input values featuring input type, input value and input error
 * @param  {string} value the new value the user has entered
 * @param  {string} field the key of the current input value
 * @return {object}       updated object of input values with inputted text added
 */
export const handleTextEntry = (data, value, field) => ({
  ...data,
  [field]: { ...data[field], value, inputError: false },
});

/**
 * cancelText
 *
 * resets the current input field to its default value when the user clears the input field
 *
 * @param  {object} data  object of input values featuring input type, input value and input error
 * @param  {string} field the key of the current input value
 * @return {object}       updated object of input values with value reset to default
 */
export const cancelText = (data, field) => ({
  ...data,
  [field]: {
    ...data[field],
    value: data[field].default,
    inputError: false,
  },
});

/**
 * clearFields
 *
 * resets all input fields to their default values.
 *
 * @param  {object} data  object of input values featuring input type, input value and input error
 * @return {object}       updated object of input values with all values reset to default
 */
export const clearFields = (data) => {
  Object.keys(data).forEach((field) => {
    data[field].value = data[field].default;
    data[field].inputError = false;
  });

  return data;
};

/**
 * resetInputErrors
 *
 * clears all input errors.
 *
 * @param  {object} data  object of input values featuring input type, input value and input error
 * @return {object}       updated object of input values with all input errors cleared
 */
export const resetInputErrors = (data) => {
  Object.keys(data).forEach((field) => {
    data[field].inputError = false;
  });

  return data;
};

/**
 * resetInputErrors
 *
 * retrieves all input values
 *
 * @param  {object} data  object of input values featuring input type, input value and input error
 * @return {object}       object of input values only
 */
export const getInputValues = (data) => {
  Object.keys(data).forEach((field) => {
    data = { ...data, [field]: data[field].value };
  });

  return data;
};

/**
 * getAssemblyPartPageSize
 *
 * retrieves the assembly part page size from localStorage
 *
 * @return {string} the assembly part page size
 */
export const getAssemblyPartPageSize = () =>
  localStorage.getItem("assemblyPartPageSize");

/**
 * setAssemblyPartPageSize
 *
 * sets the assembly part page size in localStorage
 *
 * @param {string} pageSize the new assembly part page size
 */
export const setAssemblyPartPageSize = (pageSize) =>
  localStorage.setItem("assemblyPartPageSize", pageSize);

/**
 * parseJSON
 *
 * parses JSON into a JavaScript Object.
 *
 * For instances of 204 "No Content" responses, there will be no body parsed.
 * Therefore, a substitute is added in that instance to allow the client application
 * to recognise that a 204 has been called and proceed to handle it.
 *
 * @param  {JSON}   json  the JSON to convert
 * @return {object}       the JSON parsed into a JavScript Object
 */
const parseJSON = (json) =>
  json.status === 204 ? { status: 204, results: [] } : json.json();

/**
 * fetch
 *
 * performs a HTTP fetch and parses the JSON into a Javascript Object.
 *
 * @param  {string} url   the url to perform the fetch
 * @param  {object} init  optional object to apply custom settings to the request
 * @return {object}       the returned JSON parsed into a JavScript Object
 */
export const fetchResource = (url, init = {}) =>
  fetch(url, init).then((resObj) => parseJSON(resObj));
