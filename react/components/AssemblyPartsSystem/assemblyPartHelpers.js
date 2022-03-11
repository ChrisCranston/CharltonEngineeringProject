/**
 * formatKey
 *
 * Formats a JS object key to become human readable by capitalising each letter and
 * converting the underscores to spaces
 *
 * @param  {string} key   the key to format
 * @return {string}       the key formatted into a human readable format
 */
export const formatKey = (key) => {
  return key
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
  const humanReadableKey = formatKey(field);

  if (!value && isMandatory) {
    error = humanReadableKey + " is empty or contains text";
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

export const handleTextEntry = (data, value, field) => ({
  ...data,
  [field]: { ...data[field], value, inputError: false },
});

export const cancelText = (data, field) => ({
  ...data,
  [field]: {
    ...data[field],
    value: data[field].default,
    inputError: false,
  },
});

export const clearFields = (data) => {
  Object.keys(data).forEach((field) => {
    data[field].value = data[field].default;
    data[field].inputError = false;
  });

  return data;
};

export const resetInputErrors = (data) => {
  Object.keys(data).forEach((field) => {
    data[field].inputError = false;
  });

  return data;
};

export const getInputValues = (data) => {
  Object.keys(data).forEach((field) => {
    data = { ...data, [field]: data[field].value };
  });

  return data;
};

export const getAssemblyPartPageSize = () =>
  localStorage.getItem("assemblyPartPageSize");

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
