// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// INTERNAL IMPORT FOR NFT OPENZEPPELIN CONTRACTS
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TheCapsule is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.0025 ether;

    address payable owner;

    mapping(uint256 => CapsuleItem) private idCapsuleItem;

    struct CapsuleItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        string name;
        string kyc;
        uint256 price;
        bool sold;
    }

    // EVENTS
    event idCapsuleCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    // MAPPING
    mapping(uint256 => string) private _tokenURIs;

    // CONSTRUCTOR
    constructor() ERC721("The Capsule Token", "CAPS") {
        owner = payable(msg.sender);
    }

    // FUNCTION TO UPDATE PRICE
    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    // FUNCTION TO GET THE LISTING PRICE
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // FUNCTION TO MINT A NEW CAPSULE
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();

        uint256 newCapsuleId = _tokenIds.current();

        _mint(msg.sender, newCapsuleId);
        _setTokenURI(newCapsuleId, tokenURI);

        createCapsuleItem(newCapsuleId, price);

        return newCapsuleId;
    }

    // CREATE CAPSULE ITEMS
    function createCapsuleItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idCapsuleItem[tokenId] = CapsuleItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            "name",
            "kyc",
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);
        emit idCapsuleCreated(tokenId, msg.sender, address(this), price, false);
    }

    // FUNCTION TO RESELL CAPSULE
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idCapsuleItem[tokenId].owner == msg.sender,
            "You are not the owner of this capsule"
        );

        idCapsuleItem[tokenId].sold = false;
        idCapsuleItem[tokenId].price = price;
        idCapsuleItem[tokenId].seller = payable(msg.sender);
        idCapsuleItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // FUNCTION CREATECAPSULESALE
    function createCapsuleSale(uint256 tokenId) public payable {
        uint256 price = idCapsuleItem[tokenId].price;

        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        idCapsuleItem[tokenId].owner = payable(msg.sender);
        idCapsuleItem[tokenId].sold = true;
        idCapsuleItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idCapsuleItem[tokenId].seller).transfer(msg.value);
    }

    // GETTING UNSOLD NFT DATA
    function fetchCapsuleItem() public view returns (CapsuleItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unSoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        CapsuleItem[] memory items = new CapsuleItem[](unSoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idCapsuleItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;

                CapsuleItem storage currentItem = idCapsuleItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // PURCHASE ITEM
    function fetchMyNFT() public view returns (CapsuleItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idCapsuleItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        CapsuleItem[] memory items = new CapsuleItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idCapsuleItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                CapsuleItem storage currentItem = idCapsuleItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // SINGLE USER ITEMS
    function fetchItemsListed() public view returns (CapsuleItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idCapsuleItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        CapsuleItem[] memory items = new CapsuleItem[](itemCount);

        for (uint256 i = 0; i < totalCount; i++) {
            if (idCapsuleItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                CapsuleItem storage currentItem = idCapsuleItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // function mintCapsule(
    //     address owner,
    //     string memory uri
    // ) public returns (uint256) {
    //     _tokenIds.increment();
    //     uint256 newCapsuleId = _tokenIds.current();
    //     _mint(owner, newCapsuleId);
    //     _setTokenURI(newCapsuleId, uri);
    //     emit idCapsuleCreated(capsuleId, seller, owner, price, uri, false);
    //     return newCapsuleId;
    // }

    // // FUNCTION TO GET THE URI OF A CAPSULE
    // function tokenURI(
    //     uint256 tokenId
    // ) public view override returns (string memory) {
    //     return _tokenURIs[tokenId];
    // }
}

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// contract Lock {
//     uint public unlockTime;
//     address payable public owner;

//     event Withdrawal(uint amount, uint when);

//     constructor(uint _unlockTime) payable {
//         require(
//             block.timestamp < _unlockTime,
//             "Unlock time should be in the future"
//         );

//         unlockTime = _unlockTime;
//         owner = payable(msg.sender);
//     }

//     function withdraw() public {
//         // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
//         // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

//         require(block.timestamp >= unlockTime, "You can't withdraw yet");
//         require(msg.sender == owner, "You aren't the owner");

//         emit Withdrawal(address(this).balance, block.timestamp);

//         owner.transfer(address(this).balance);
//     }
// }
