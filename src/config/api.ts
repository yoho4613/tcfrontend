export const getAllPosts = async (routePath: string) => {
  const res = await fetch(process.env.REACT_APP_API_URL + routePath)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res;
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return res;
};

export const getPostById = async (routePath: string, id: string) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}${routePath}/${id}`)
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

export const getPinataImageURL = (uri: string) =>
  `https://blue-quiet-peacock-882.mypinata.cloud/ipfs/${uri}?pinataGatewayToken=gXRzziS-ViTOnPjDA8hbFKkjOV6cPHT784_02Lw_fhlzQ-Wmr698Zwz1BFEEQPep`;
