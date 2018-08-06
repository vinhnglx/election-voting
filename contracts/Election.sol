pragma solidity ^0.4.24;

contract Election {
  // State variable
  string public candidate;

  // Constructor
  // store and read candidate
  constructor() public {
    candidate = "Candidate 1";
  }
}