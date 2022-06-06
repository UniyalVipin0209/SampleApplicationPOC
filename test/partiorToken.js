const {expect}= require('chai');

describe("Partior Token Contract", function(){
  
    let PartiorToken;
    let deployedToken;
    let contractOwner;
    let add1;
    let add2;
    let addrs;

    beforeEach(async function(){
      [contractOwner,add1,add2,...addrs]= await ethers.getSigners();   
      //Creating an Instance using Factory Method
       PartiorToken = await ethers.getContractFactory("PartiorToken");      
      //Deploy the instance of PartiorToken 
      deployedToken= await PartiorToken.deploy();   
    });

    //TestMethods 1
   it("Deployment should assign the total supply token to the owner", async function(){
   
    //Fetching the balanceOf function
    const ownerBalance = await deployedToken.balanceOf(contractOwner.address);
    
   expect(await deployedToken.totalSupply()).to.equal(ownerBalance);
     //expect(await deployedToken.totalSupply()).to.equal(3500);
   
});

it("Should Transfer the token between accounts", async function(){
    //Task1 Transfer 5 token to address1 i.e add1
    await deployedToken.transfer(add1.address,5);
    const addr1Balance = await deployedToken.balanceOf(add1.address);
    expect(addr1Balance).to.equal(5);

     //Task Transfer 5 token to address2 from address1 i.e add1
     await deployedToken.connect(add1).transfer(add2.address,5);
     const addr2Balance = await deployedToken.balanceOf(add2.address);
     expect(addr2Balance).to.equal(5);
   
});

it("Should fail if sender does not have enough tokens", async function () {
  const initialOwnerBalance = await deployedToken.balanceOf(contractOwner.address); //10000
  await expect(
    deployedToken.connect(add1).transfer(contractOwner.address, 1) //initially - 0 tokens addr1
  ).to.be.revertedWith("Not enough tokens");
  expect(await deployedToken.balanceOf(contractOwner.address)).to.equal(
    initialOwnerBalance
  );
});

});