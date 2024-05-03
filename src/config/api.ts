const url = "http://localhost:8000/api/v1";

export const getAllPosts = async (routePath: string) => {
  const res = await fetch(url + routePath)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res;
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  console.log(res);
  return res;
};

export const getPostById = async (routePath: string, id: string) => {
  const res = await fetch(`${url}${routePath}/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res;
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  console.log(res);
  return res;
};
