## hello-world-by-polkadot-2020
# FRAME Multisig

### Installation

#### Environment setup
Follow the standard steps of Substrate Node Template & Substrate Front-end Template for environment and tool setup


#### Clone the repository
> git clone -b FRAME-Multisig --single-branch https://github.com/shri4net/hackathon-polkadot-2020.git


#### Usage of Substrate Node Template

> cd substrate-node-template

Update dependencies
> ./cargo build --release

Run it locally
> ./target/release/node-template --dev --tmp

#### Usage of Substrate Front-end Template

> cd ./substrate-front-end-template

Update dependencies
> yarn install

Run it locally
> yarn start

### Code Review
The pull request file changes from original can be found here
> https://github.com/shri4net/hackathon-polkadot-2020/pull/3/files

Substrate node template commit changes
> 

Substrate front-end template commit changes
> 


### Screen shots
Initial state (logged in as Alex)
![Initial state](/screen-shots/11.png)

Transaction (logged/approved in as Alex, Multisig group with Bob. Transfer amount to Dave)
![Transaction state](/screen-shots/22.png)

Transaction (logged/approved in as Bob, Multisig group with Alex. Transfer amount to Dave)
![Transaction state](/screen-shots/33.png)

Transaction event sequence in PolkaJS app
![PolkaJs App events](/screen-shots/44.png)



