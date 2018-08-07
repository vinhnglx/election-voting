var Election = artifacts.require('./Election.sol');

contract('Election', function (accounts) {
  it('initializes with two candidates', function () {
    return Election.deployed().then(function (instance) {
      return instance.candidatesCount()
    }).then(function (count) {
      assert.equal(count, 2)
    })
  })

  it('initialized the candidates with the correct values', function () {
    return Election.deployed().then(function (instance) {
      electionInstance = instance
      return electionInstance.candidates(1)
    }).then(function (candidate) {
      assert.equal(candidate[0], 1)
      assert.equal(candidate[1], 'Luffy')
      assert.equal(candidate[2], 0)
      return electionInstance.candidates(2)
    }).then(function (candidate) {
      assert.equal(candidate[0], 2)
      assert.equal(candidate[1], 'Zoro')
      assert.equal(candidate[2], 0)
    })
  })

  it('allowed a voter to do a vote', function () {
    return Election.deployed().then(function (instance) {
      electionInstance = instance
      candidateId = 1
      return electionInstance.vote(candidateId, { from: accounts[0] })
    }).then(function (receipt) {
      return electionInstance.voters(accounts[0])
    }).then(function (voted) {
      assert(voted, 'the voter was marked as voted')
      return electionInstance.candidates(candidateId)
    }).then(function (candidate) {
      var voteCount = candidate[2]
      assert.equal(voteCount, 1)
    })
  })

  it('throws an exception for invalid candidates', function () {
    return Election.deployed().then(function (instance) {
      electionInstance = instance
      return electionInstance.vote(9999, { from: accounts[1] })
    }).then(assert.fail).catch(function (err) {
      assert(err.message.indexOf('revert') >= 0)
      return electionInstance.candidates(1)
    }).then(function (candidate1) {
      assert.equal(candidate1[2], 1)
      return electionInstance.candidates(2)
    }).then(function (candidate2) {
      assert.equal(candidate2[2], 0)
    })
  })

  it('throws an exception for double voting', function () {
    return Election.deployed().then(function (instance) {
      electionInstance = instance
      candidateId = 2
      electionInstance.vote(candidateId, { from: accounts[1] })
      return electionInstance.candidates(2)
    }).then(function (candidate2) {
      var voteCount = candidate2[2]
      assert.equal(voteCount, 1)
      return electionInstance.vote(candidateId, { from: accounts[1] })
    }).then(assert.fail).catch(function (err) {
      assert(err.message.indexOf('revert') >= 0)
    })
  })
})