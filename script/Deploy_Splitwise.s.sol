// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Splitwise} from "../src/Splitwise.sol";

contract DeploySplitwise is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY"); 
        vm.startBroadcast(deployerKey);

        address tokenAddress = 0x4ac35A9975B7eA19A4Abf50f845b5164BFEeA149; 
        new Splitwise(tokenAddress);
        
        vm.stopBroadcast();
    }
}
