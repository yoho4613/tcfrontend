const hre = require("hardhat");
async function main() {
  const TheCapsule = await hre.ethers.getContractFactory("TheCapsule");
  const theCapsule = await TheCapsule.deploy();

  await theCapsule.waitForDeployment();

  console.log("TheCapsule deployed to:", await theCapsule.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
