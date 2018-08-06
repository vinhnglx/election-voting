pragma solidity ^0.4.24;

contract Election {
  // Model a Candidate
  struct Candidate {
    uint id;
    string name;
    uint voteCount;
  }

  // Store Candidate
  // Fetch Candidate
  mapping(uint => Candidate) public candidates;

  // Store Candidate Count. Default is 0
  uint public candidatesCount;

  constructor() public {
    addCandidate("Luffy");
    addCandidate("Zoro");
  }

  function addCandidate (string _name) private {
    candidatesCount++;
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
  }
}