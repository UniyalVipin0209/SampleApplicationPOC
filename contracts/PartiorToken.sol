//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PartiorToken{
   string public name = "Partior Token";
   string public symbol = "PARTIOR-TKN"; 
   uint public totalSupply = 10000;

   address public owner;

   mapping(address=>uint) accBalances;  

 
   constructor(){
       accBalances[msg.sender]= totalSupply;
       owner= msg.sender;
   }

   function transfer(address to, uint amount) external{
       require(accBalances[msg.sender]>=amount, "Token not sufficient in user account");
       accBalances[msg.sender] -= amount;
       accBalances[to] += amount;
       }

   function balanceOf(address account) external view returns(uint){
       return accBalances[account];
   } 

}