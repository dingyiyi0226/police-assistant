# Police Assistant
A decentralized platform to report a crime

## How to run

Install ganache and truffle
```
$ yarn global add ganache-cli truffle
```

Then open two terminals

In Terminal 1
```
$ ./run_ganache.sh
```

In Terminal 2
```
$ cd client
$ yarn
$ yarn migrate
$ yarn start
```

## Introduction

Police Assistant is a decentralized application. To reduce police’s heavy workloads and build a safer community, we provide this platform for user to report or check a crime. Once you've witnessed or been the victim of crime, you can report it here. To encourage user uploading criminal case, we offer ETH as reward for useful information. Also, user can check out all records anytime and anywhere. 

## Implementation

- Front-end : Javascript & React
- Back-end : Truffle, Ganache-cli, Metamask, Solidity, IPFS, Google map API
Data in the blockchain is shared between every single node, which is extremely inefficient. So we decide to use IPFS for image uploading to have only some nodes storing the data, namely decentralized it.

## Procedure

Report a crime on the upload page. The form includes user name, offense type, description of what you witnessed or encountered, latitude and longitude of the crime scene and also an image about the case. Police will review the information users uploaded and determine whether the reported case is reasonable and useful, and then click the $ button on the record page to send ETH. User can check crime record by category or by position. We embed Google Maps into the map page, so user can check the crime case around himself or herself easily and clearly.

