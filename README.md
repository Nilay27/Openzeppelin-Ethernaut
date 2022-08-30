---
 Title: Ethernaut
 Description: Solutions for Openzeppelin's Ethernaut
 Progress: 1/25
---
* Executable solutions for all challenges from [Ethernaut](https://ethernaut.openzeppelin.com/)

### Challenges
- [x] Fallback
- [ ] Fallout
- [ ] CoinFlip
- [ ] Telephone
- [ ] Token
- [ ] Delegation
- [ ] Force
- [ ] Vault
- [ ] King
- [ ] Reentrancy
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

* Setup `.env` file with your own keys

* Compile all the contracts
```
npx hardhat compile
```

* Running the tests will deploy the contract on local network and execute the hack
```
npx hardhat test test/ContractName.js
```