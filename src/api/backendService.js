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

export const createInqury = async (inquiry) => {
  try {
    const response = await apiClient.post(`/inquiries`, inquiry, {
      headers: {
        "content-type": "application/json",
        //Authorization: `Bearer ${accessToken}`,
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

export const getInquiryById = async (inquiryId, accessToken) => {
  try {
    const response = await apiClient.get(`inquiries/${inquiryId}`, {
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


export const getPendingOffers = async (accessToken) => {
  try {
    const response = await apiClient.get(`offers/pending`, {
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

export const postSelectedOffer = async (offerId, customerInfo, accessToken) => {
  try {
    const response = await apiClient.post(
      `offers/${offerId}/select`,
      {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        address: customerInfo.address,
        email: customerInfo.email,
        companyName: customerInfo.companyName,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const acceptOffer = async (offerId, accessToken, formData) => {
  try {
    const response = await apiClient.post(
      `offers/${offerId}/accept`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getAllInquries = async (accessToken) => {
  try {
    const response = await apiClient.get(`inquiries`, {
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
    const response = await apiClient.get(`client/inquiries`, {
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

export const getAllOffers = async (accessToken) => {
  try {
    const response = await apiClient.get(`offers`, {
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
    const response = await apiClient.post(`client/user-info/`, info, {
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

export const getUserInfo = async (accessToken) => {
  try {
    const response = await apiClient.get(`client/user-info`, {
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

export const createOffers = async (inquiryId) => {
  try {
    const response = await apiClient.post(
      `inquiries/${inquiryId}/offers`,
      {
        headers: {
          "content-type": "application/json",
          //Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const getAllOrders = async (accessToken) => {
  try {
    const response = await apiClient.get(`orders`, {
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
}

export const patchOrder = async (orderId, orderStatus, comment, courierName, accessToken) => {
  try {
    const response = await apiClient.patch(
      `orders/${orderId}`,
      {
        orderStatus: orderStatus,
        comment: comment,
        courierName: courierName,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
}

export const rejectOffer = async (offerId, accessToken, reason) => {
  try {
    const response = await apiClient.post(
      `offers/${offerId}/reject`,
      
        reason
      ,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
}

export const getUserOrders = async (accessToken) => {
  try {
    const response = await apiClient.get(`client/orders`, {
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

export const getOrderById = async (orderId) => {
  try {
    const response = await apiClient.get(`orders/${orderId}`, {
      headers: {
        "content-type": "application/json",
      },
    });
    return {
      response,
      error: null,
    };
  } catch (error) {
    return handleError(error);
  }
}
