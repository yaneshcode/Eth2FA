import { init_web3 } from "./web3utils.js";

window.onload = async function () {

  var abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Action",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "server",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "signed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  var bytecode = '0x608060405234801561001057600080fd5b5073783a5bb7f476ea5ef198df382c24e39d9ce63865600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061060e806100b56000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80630555ff411461005c5780638da5cb5b146100b8578063b5d7df9714610102578063c434f3311461010c578063fd922a421461018f575b600080fd5b61009e6004803603602081101561007257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101d9565b604051808215151515815260200191505060405180910390f35b6100c06101f9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61010a61021e565b005b610114610386565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610154578082015181840152602081019050610139565b50505050905090810190601f1680156101815780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101976105b2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60026020528060005260406000206000915054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806102c657506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6102cf57600080fd5b60001515600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151461032c57600080fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550565b60606001151560026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514801561047b575060011515600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b61048457600080fd5b600060026000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506000600260008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506040518060400160405280601081526020017f416374696f6e20617070726f7665642100000000000000000000000000000000815250905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea264697066735822122041a6ecdebfb958aa4cc649114c03715a325f5dd4c7086cd976671dfd09cc953464736f6c63430006010033'




  var x = await init_web3()
  let address = window.accounts[0];

  console.log(address);

  // Deploy contract
  // TODO: Need to fix this
  document.getElementById("btnDeploy").addEventListener('click', () => {
    console.log(web3.eth.accounts[0])
    var multisigContract = new web3.eth.Contract(abi);

    multisigContract.options.data = bytecode;

    multisigContract.deploy({
    })
    .send({
        from: web3.eth.accounts[0],
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });

  })


   document.getElementById("btnSignOwner").addEventListener('click', () => {
     window.contract.methods.Sign().send({ from: window.accounts[0] })
       .then(result => {
         console.log(result);
         document.getElementById("alert-text").innerHTML = " Signed successfully by user!";
         document.getElementById('formAlert').style.display = "block";
         hideAlert();
       });
   });

   document.getElementById("btnSignServer").addEventListener('click', () => {
     $.get("/sign-server", function(data, status){
      console.log(data);
      document.getElementById("alert-text").innerHTML = " Signed successfully through 2FA server!";
      document.getElementById('formAlert').style.display = "block";
      hideAlert();
    });
   });

   document.getElementById("btnAction").addEventListener('click', () => {
     window.contract.methods.Action().send({ from: window.accounts[0] })
       .then(result => {
         console.log(result);
         document.getElementById("alert-text").innerHTML = " Action taken successfully!";
         document.getElementById('formAlert').style.display = "block";
         hideAlert();
       });
   });

   function hideAlert() {
     setTimeout(function(){ document.getElementById('formAlert').style.display = "none"; }, 5000);
   }
}
