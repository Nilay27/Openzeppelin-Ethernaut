---
 Title: Ethernaut
 Description: Solutions for Openzeppelin's Ethernaut
 Progress: 10/25
---
* Executable solutions for all challenges from [Ethernaut](https://ethernaut.openzeppelin.com/)

### Challenges
- [x] Fallback
- [x] Fallout
- [x] CoinFlip
- [x] Telephone
- [x] Token
- [x] Delegation
- [x] Force
- [x] Vault
- [x] King
- [x] Reentrancy
- [ ] Elevator
- [ ] Privacy
- [ ] GatekeeperOne
- [ ] GatekeeperTwo
- [ ] NaughtCoin
- [ ] Preservation
- [ ] Recovery
- [ ] MagicNumber
- [ ] AlienCodex
- [ ] Denial
- [ ] Dex
- [ ] DexTwo
- [ ] PuzzleWallet
- [ ] MororBike
- [ ] DoubleEntryPoint

### Steps to setup in local

* Install dependencies

```
yarn
```

* Compile all the contracts
```
yarn c
```

* Run linter for all tests
```
yarn l
```
* Run linter for all contracts
```
yarn sl
```

* Running the tests will deploy the contract on local network and execute the hack
```
npx hardhat test test/ContractName.js
```

* To compile and hack all contracts
```
yarn t
```