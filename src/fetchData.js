import axios from 'axios';

export const fetchData = async () => {
  try {
    const postsResponse = await axios.get("https://647ded02af984710854a9d6d.mockapi.io/blogs");
    const usersResponse = await axios.get("https://647ded02af984710854a9d6d.mockapi.io/users/");

    return {
      posts: postsResponse.data,
      users: usersResponse.data
    };
  } catch (error) {
    // Обработка ошибок
    throw error;
  }
};