import { toast } from "react-toastify";

export const unpackErrors = (data) => {
  let errors = [];
  // if the error is a string then it is an error
  if (typeof data === "string") {
    return data;
  }
  // if the error is an array then it is a list of errors
  for (var [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      errors.push(`${key}: ${value}`);
    }
    if (Array.isArray(value)) {
      value.forEach((element) => {
        if (key === "non_field_errors") {
          errors.push(element);
        } else {
          errors.push(`${key}: ${element}`);
        }
      });
    }
  }

  // return errors;
  // lets convert the errors into one string
  return errors.join("\n");
};

const notify = (type, message) => {
  const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    default:
      break;
  }
};

export const showErrors = (error) => {
  if (error.message === "Network Error") {
    // Alert.alert(
    //   "Network Error",
    //   "Please check your internet connection and try again."
    // );
    console.log("Network Error");
    notify(
      "error",
      "Network Error: Please check your internet connection and try again."
    );
    return;
  }

  try {
    if (error.response !== undefined) {
      if (error.response.status >= 400 && error.response.status < 500) {
        if (error.response && error.response.data) {
          let errorMsg = unpackErrors(error.response.data);
          // console.log("ERRORS MSG", errorMsg);
          // Alert.alert("Error", errorMsg);
          notify("error", errorMsg);
          return;
        }
      } else if (error.response.status === 500) {
        // Alert.alert(
        //   "Error",
        //   "Something went wrong on our end we are working to resolve it"
        // );
        notify(
          "error",
          "Something went wrong on our end we are working to resolve it"
        );
        return;
      } else {
      }
    }
  } catch (error) {
    //catching errors  or error  handler block
    // console.log(error);
    // Alert.alert("Error", "Something while handling errors");
    notify("error", "Something  went wrong while handling errors");
  }
};

export { notify };
