import moment from 'moment-timezone';


export const localStorage = {
  getItem: (key) => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  },
  removeItem: (key) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};


export const formatDateWithTimezone = (date, format = 'MMM DD, YYYY') => {
  if (!date) return '—';
  const userTimezone = moment.tz.guess();

  return moment.tz(date, userTimezone).format(format);
};

export const formatRelativeTime = (date) => {
  if (!date) return '—';
  const userTimezone = moment.tz.guess();
  
  return moment.tz(date, userTimezone).fromNow();
};


export const handleChoice = (state, label = "name", value = "id") => {
  return state.map((obj) => ({
    label: obj[label],
    value: obj[value],
  }));
};

export const extractErrorMessages = (errorResponse) => {
  const errorMessages = [];

  // Loop through the error response and extract the error messages
  for (const field in errorResponse) {
    if (errorResponse.hasOwnProperty(field)) {
      if (Array.isArray(errorResponse[field])) {
        // If the error is an array, add each message to the array
        errorMessages.push(...errorResponse[field]);
      } else if (typeof errorResponse[field] === "object") {
        // If the error is an object, recurse to extract messages
        const subErrors = extractErrorMessages(errorResponse[field]);
        errorMessages.push(...subErrors);
      } else {
        errorMessages.push(errorResponse[field]);
      }
    }
  }

  return errorMessages;
};

export const formatDate = (date) => {
  let updatedDate = date;

  // Check if updatedDate is an array and take the first element
  if (Array.isArray(updatedDate)) {
    updatedDate = updatedDate[0];
  }

  // Validate if updatedDate is a valid Date object
  if (!(updatedDate instanceof Date && !isNaN(updatedDate))) {
    return undefined;
  }

  const year = updatedDate.getFullYear();
  const month = String(updatedDate.getMonth() + 1).padStart(2, "0");
  const day = String(updatedDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatDateToYMD = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const generateNamePrefix = (name) => {
  const nameParts = name?.split(" ");
  let namePrefix;

  if (nameParts?.length >= 2) {
    namePrefix = nameParts[0].charAt(0) + nameParts[1].charAt(0);
  } else if (nameParts?.length === 1) {
    namePrefix = nameParts[0].slice(0, 2);
  }
  return namePrefix;
};

export const formatSecondsToReadable = (seconds, onlyDays = false) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (onlyDays) {
    const days = Math.floor(seconds / (86400000))
    // const hours = Math.floor((seconds % 86400) / 3600)
    // const minutes = Math.floor((seconds % 3600) / 60);
    // const remainingSeconds = seconds % 60;
    // return `${days} days, ${hours} hours, ${minutes} minutes, ${String(remainingSeconds)?.split(".")[0]} seconds`;
    return days;

  }
  return `${hours} hours, ${minutes} minutes, ${String(remainingSeconds)?.split(".")[0]} seconds`;
}

export function pathJoin(parts, sep) {
  var separator = sep || '/';
  var replace = new RegExp(separator + '{1,}', 'g');
  return parts.join(separator).replace(replace, separator);
}



function appendKeyValue(params, key, value) {
  const [keyPart1, keyPart2 = ''] = key.split('&');
  const [valuePart1, valuePart2 = ''] = typeof value === 'string' ? value.split('&') : [value, ''];

  params.append(keyPart1, valuePart1);
  if (keyPart2 && valuePart2) {
    params.append(keyPart2, valuePart2);
  }
}

export const appendFiltersToParams = (filters) => {
  const params = new URLSearchParams();

  filters.forEach(filter => {
    if (filter.key && filter.value) {
      appendKeyValue(params, filter.key, filter.value);
    }
  });

  return params;
}


export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}