// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "hardhat/console.sol";

contract Blog is Ownable, EIP712 {
    struct SwapMetadata {
        address seller;
    }

    constructor(string memory name, string memory version)
        EIP712(name, version)
    { 
        console.log(name, version);
    }

    function verifySignature(SwapMetadata memory swap, bytes memory signature) public view returns (address) {
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    keccak256("Swap(address seller)"),
                    swap.seller
                )
            )
        );
        address signer = ECDSA.recover(digest, signature);
        return signer;
    }

    function verifySignature2(
        SwapMetadata calldata swap, 
        bytes32 r,
        bytes32 s,
        uint8 v
    ) public view returns (address) {
        bytes32 domainDigest = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("Blog")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
        
        bytes32 payloadDigest = keccak256(
            abi.encode(
                keccak256("Swap(address seller)"),
                swap.seller
            )
        );
        address signer = ecrecover(keccak256(abi.encodePacked("\x19\x01", domainDigest, payloadDigest)), v, r, s);
        return signer;
    }
}