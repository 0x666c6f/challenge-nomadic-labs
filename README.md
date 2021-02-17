# Taquito boilerplate

![Built with Taquito][logo]

A minimal framework-agnostic setup for starting developing Tezos DApps quickly with Taquito.

> If you are looking for the React template, please follow [this link](https://github.com/ecadlabs/taquito-react-template).

## Dependencies
1. jQuery - for simple manipulation and traversal of HTML documents.
2. parcel-bundler - for packaging web applications quickly.

## Getting Started

1. Create a new repository from taquito-boilerplate by clicking "Use this template".
2. Clone your new repository:

    `git clone <YOUR_REPOSITORY_URL>`

3. Change your current working directory to the newly cloned repository directory.
4. Install dependencies:

    `npm install`

5. Start development server:

    `npm run watch`

6. Open http://localhost:1234 in your browser to see a sample application.

[logo]: https://raw.githubusercontent.com/ecadlabs/taquito-boilerplate/master/assets/built-with-taquito.png "Built with Taquito"


# Challenge
## Smart Contract

## Run testnet node

> wget -O edonet.sh https://gitlab.com/tezos/tezos/raw/latest-release/scripts/tezos-docker-manager.sh
> chmod +x edonet.sh
> sudo ./edonet.sh start

## Deploy smart contract to tezos testnet
Create a testnet wallet on https://faucet.tzalpha.net/
Set wallet on smartpy https://smartpy.io/wallet.html

Develop smartpy smart contract https://smartpy.io/ide
When developed, click on RUn
Once run, click on deploy michelson contract
Config and deploy

Check deployed contract: https://smartpy.io/explorer.html?address=KT1NgZiXiDQrdRThSeVZ3exMEMTJNMC61gms

Go to smart contract explorer