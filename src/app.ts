import { ContractAbstraction, ContractProvider, TezosToolkit } from "@taquito/taquito";
import $ from "jquery";
import { InMemorySigner, importKey } from '@taquito/signer';

export class App {
  private tk: TezosToolkit;
  private contract: ContractAbstraction<ContractProvider>;

  constructor() {
    this.tk = new TezosToolkit("https://api.tez.ie/rpc/edonet");
    this.tk.setProvider({ signer: new InMemorySigner("edskS928LHHH578sq6UvpcmTZi1MYCkNJArrP8ThuYFon9bQ554ENnJzkL9Byuh9SRjj6z3PAjFS3Hx3ZwnA4idtL4QiMzMm9Y") });
    this.tk.contract.at('KT1NgZiXiDQrdRThSeVZ3exMEMTJNMC61gms')
      .then((c) => {
        this.contract = c;
        let methods = c.parameterSchema.ExtractSignatures();
        this.showContractMethods(methods)
        console.log(JSON.stringify(methods, null, 2));
        c.storage().then( storage => {
          console.log(JSON.stringify(storage))
          $("#storageValue").html(JSON.stringify(storage));
        })
      })
      .catch((error) => console.log(`Error: ${error}`));
  }

  public initUI() {
    $("#show-balance").bind("click", () =>
      this.getBalance($("#address-input").val())
    );

    $("#execute").bind("click", () =>
      this.executeMethod()
    );
  }

  private showError(message: string) {
    $("#balance-output").removeClass().addClass("hide");
    $("#error-message")
      .removeClass()
      .addClass("show error-message")
      .html("Error: " + message);
  }

  private showBalance(balance: number) {
    $("#error-message").removeClass().addClass("hide");
    $("#balance-output").removeClass().addClass("show message");
    $("#balance").html(balance);
  }

  private cleanMethodouput() {
    $("#contract-error-message").removeClass().addClass("hide");
    $("#contract-output").removeClass().addClass("hide");

  }

  private showMethodOutput() {
    $("#contract-error-message").removeClass().addClass("hide");
    $("#contract-output").removeClass().addClass("show message");
  }

  private showMethodError(message: string) {
    $("#contract-output").removeClass().addClass("hide");
    $("#contract-error-message")
      .removeClass()
      .addClass("show error-message")
      .html("Error: " + message);
  }

  private appendOutput(message: string) {
    $("#contract-output").append("<br/>" + message);

  }

  private refreshStorageValue(){
    this.contract.storage().then( storage => {
      console.log(JSON.stringify(storage))
      $("#storageValue").html(JSON.stringify(storage));
    })
  }

  private showContractMethods(methods: string[][]) {
    methods.forEach(method => {
      $('#method-select').append('<option value="' + method[0] + '">' + method[0] + ' (' +  method[1] +') </option>');
    });
  }

  private getBalance(address: string) {
    this.tk.rpc
      .getBalance(address)
      .then(balance => this.showBalance(balance.toNumber() / 1000000))
      .catch(e => this.showError("Address not found"));
  }

  private executeMethod(){
    this.cleanMethodouput();
    const input = $("#method-input").val();
    const method = $( "#method-select option:selected" ).val();
    console.log("input = " + input);
    console.log("method = " + method);
    this.showMethodOutput();
    this.appendOutput(`Executing smart contract method...`)

    switch (method) {
      case "divide":
        this.contract.methods.divide(input).send().then((op) => {
          this.appendOutput(`Awaiting for ${op.hash} to be confirmed...`)
          console.log(`Awaiting for ${op.hash} to be confirmed...`);
          return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => {
          this.appendOutput(`Operation injected: https://edo.tzstats.com/${hash}`)
          console.log(`Operation injected: https://edo.tzstats.com/${hash}`)
          this.refreshStorageValue()
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));;
        break;
      case "double":
        this.contract.methods.double([["unit"]]).send().then((op) => {
          this.appendOutput(`Awaiting for ${op.hash} to be confirmed...`)
          console.log(`Awaiting for ${op.hash} to be confirmed...`);
          return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => {
          this.appendOutput(`Operation injected: https://edo.tzstats.com/${hash}`)
          console.log(`Operation injected: https://edo.tzstats.com/${hash}`)
          this.refreshStorageValue()
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));;
        break; 
      case "replace":
        this.contract.methods.replace(input).send().then((op) => {
          this.appendOutput(`Awaiting for ${op.hash} to be confirmed...`)
          console.log(`Awaiting for ${op.hash} to be confirmed...`);
          return op.confirmation(1).then(() => op.hash);
        })
        .then((hash) => {
          this.appendOutput(`Operation injected: https://edo.tzstats.com/${hash}`)
          console.log(`Operation injected: https://edo.tzstats.com/${hash}`)
          this.refreshStorageValue()
        })
        .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));;
        break;    
      default:
        break;
    }
  }

}
