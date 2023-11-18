import axios from "axios";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

const apiClient = axios.create({
  baseURL: `${apiServerUrl}`,
});

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error;

    const { response } = axiosError;

    let message = "http request failed";

    if (response && response.statusText) {
      message = response.statusText;
    }

    if (axiosError.message) {
      message = axiosError.message;
    }

    if (response && response.data && response.data.message) {
      message = response.data.message;
    }

    return {
      data: null,
      error: {
        message,
      },
    };
  }
  return {
    data: null,
    error: {
      message: error.message,
    },
  };
};

export const createInqury = async (inquiry, accessToken) => {
  try {
    const response = await apiClient.post(`/inquiries`, inquiry, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getInquries = async (accessToken) => {
    try {
      const response = await apiClient.get(`/inquiries`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        response,
        error: null,
      };
    } catch (error) {
      return handleError(error);
    }
  };

  export const updateUserInfo = async (info, accessToken) => {
    try {
      const response = await apiClient.put(`/clients/:id`, info, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return {
        response,
        error: null,
      };
    } catch (error) {
      return handleError(error);
    }
  };  
