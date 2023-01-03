const my_fetch_get = async (url) => {
  try {
    let answer = await fetch(url, {
      method: "GET",
    });
    answer = answer.json();
    return answer;
  } catch (error) {
    return {
        success: false,
        message: error.message,
      };
  }
};
const my_fetch_post = async (url, data) => {
  try {
    let answer = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    answer = answer.json();
    return answer;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const my_fetch = { my_fetch_get, my_fetch_post };
