import axios from "axios";

const shortCut = async (url) => {
  const apiToken = "042e1b73089de09d18ece5919d11b91424f83cef";
  const apiUrl = `https://za.gl/api?api=${apiToken}&url=${encodeURIComponent(url)}`;
  
  try {
    const response = await axios.get(apiUrl);
    if (response.data.status === "success") {
      return response.data.shortenedUrl;
    } else {
      console.error('Error shortening URL:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error shortening URL:', error.response ? error.response.data : error.message);
    return null;
  }
};

export default shortCut;
