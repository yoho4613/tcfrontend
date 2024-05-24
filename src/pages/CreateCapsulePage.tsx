import { uuidV4 } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { TheCapsuleContext } from "../context/TheCapsuleContext.tsx";
import web3modal from "web3modal";
const CreateCapsulePage = () => {
  const [name, setName] = useState("");
  const [kycName, setKycName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const { mintCapsule, fetchCapsule } = useContext(TheCapsuleContext);
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  const fetchIPFS = async () => {
    const formData = new FormData();
    if (!selectedFile) return;
    formData.append("file", selectedFile);
    if (!kycName) {
      return alert("put kyc name");
    }
    const metadata = JSON.stringify({
      name: name,
    });
    formData.append("pinataMetadata", metadata);

    // formData.append("pinataMetadata", '{\n  "name": "Pinnie.json"\n}');

    formData.append("pinataContent", `{\n  "kyc": ${kycName} \n}`);

    const options = JSON.stringify({
      cidVersion: 0,
    });

    formData.append("pinataOptions", options);
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
      body: formData,
    });
    const resData = await res.json();
    console.log(resData);
    const hash = resData.IpfsHash;

    const mint = await mintCapsule(hash, 0.05);
    console.log(mint);
    return mint;
  };

  useEffect(() => {
    fetchCapsule().then((res) => {
      setCapsules(res.reverse());
    });
  }, []);

  console.log(capsules);
  return (
    <div>
      <div>
        <form className="text-center" action="">
          <div className="mb-4">
            <label htmlFor="name">name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kycName">kycName</label>
            <input
              id="kycName"
              name="kycName"
              type="text"
              value={kycName}
              placeholder="kycName"
              onChange={(e) => setKycName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kyc">kyc</label>
            <input
              id="kyc"
              name="kyc"
              type="file"
              onChange={(e) =>
                e.target.files ? setSelectedFile(e.target.files[0]) : null
              }
            />
          </div>
          <button
            className="cursor-pointer bg-blue-200 p-2"
            onClick={(e) => {
              e.preventDefault();
              fetchIPFS();
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex justify-around">
        {capsules?.map((capsule, i) => (
          <div key={i} className="flex flex-col">
            <p>{capsule.name}</p>

            <p>kyc</p>
            <img
              className="w-24 h-24"
              src={`https://blue-quiet-peacock-882.mypinata.cloud/ipfs/${
                capsule.revealed ? capsule.tokenURI : capsule.capsuleImage
              }?pinataGatewayToken=gXRzziS-ViTOnPjDA8hbFKkjOV6cPHT784_02Lw_fhlzQ-Wmr698Zwz1BFEEQPep`}
              alt=""
              onClick={() =>
                setCapsules((prev) =>
                  prev.map((item) =>
                    item.tokenId === capsule.tokenId
                      ? { ...item, revealed: !item.revealed }
                      : item
                  )
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateCapsulePage;
