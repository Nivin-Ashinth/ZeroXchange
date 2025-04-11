# Smart Contracts for ZeroXchange

This project contains smart contracts deployed using Hardhat.

## Structure

- **contracts/**: Solidity contracts
  - `YourContract.sol`: Main contract with basic functionality.
  - `Migrations.sol`: Migration contract (if needed for Truffle).
- **scripts/**: Deployment scripts
  - `deploy.js`: Script for deploying contracts using Hardhat.
- **migrations/**: Truffle migrations (if using Truffle)
  - `1_initial_migration.js`
- **test/**: Unit tests
  - `TestYourContract.js`
- **hardhat.config.js**: Hardhat configuration.
- **package.json**: Project metadata and dependency management.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Compile contracts:**

   ```bash
   npx hardhat compile
   ```

3. **Deploy contracts:**

   ```bash
   npx hardhat run scripts/deploy.js
   ```

4. **Run tests:**

   ```bash
   npx hardhat test
   ```

## License

This project is licensed under the MIT License.