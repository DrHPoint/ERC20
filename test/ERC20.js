const { expect } = require("chai");
const { utils } = require("ethers");
const { ethers } = require("hardhat");

describe("ERC20", function () {
    it("name() should return name of Token", async function () {
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        expect(await token.name()).to.equal("Doctor");
    });
    it("symbol() should return symbol of Token", async function () {
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        expect(await token.symbol()).to.equal("WHO");
    });
    it("decimals() should return 18", async function () {
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        expect(await token.decimals()).to.equal(18);
    });
    it("totalSupply() should return total supply", async function () {
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        expect(await token.totalSupply()).to.equal(19632017);
    });
    it("balanceOf() should return balance after transfer() of owner to another address", async function () {
        const [owner, addr1] = await ethers.getSigners();
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        const transferToken = await token.transfer(addr1.address, 100);
        await transferToken.wait();
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });
    it("transfer() should return error, because adrr1 has no tokens", async function () {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.connect(owner).deployed();
        await expect(token.connect(addr1).transfer(addr2.address, 100)).to.be.revertedWith("Not enough tokens");
    });
    it("transferFrom() should return error, because addr2 didnt give permission to the add1 ", async function () {
        const [addr1, addr2, addr3] = await ethers.getSigners();
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        await expect(token.connect(addr1).transferFrom(addr2.address, addr3.address, 100)).to.be.revertedWith("Not enough allowed amount");
    });
    it("transferFrom() should return error, because adrr1 has no tokens ", async function () {
        const [addr1, addr2, addr3] = await ethers.getSigners();
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        const getApprove = await token.connect(addr2).approve(addr1.address, 100);
        await getApprove.wait();
        await expect(token.connect(addr1).transferFrom(addr2.address, addr3.address, 100)).to.be.revertedWith("Not enough tokens");
    });
    it("transferFrom() should transfer tokens from addr2 to addr3 ", async function () {
        const [addr1, addr2, addr3] = await ethers.getSigners();
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        const transferToken = await token.transfer(addr2.address, 100);
        await transferToken.wait();
        const getApprove = await token.connect(addr2).approve(addr1.address, 100);
        await getApprove.wait();
        const transferFromToken = await token.connect(addr1).transferFrom(addr2.address, addr3.address, 100);
        await transferFromToken.wait();
        expect(await token.balanceOf(addr3.address)).to.equal(100);
    });
    it("allowance() should return allowed amount", async function () {
        const [addr1, addr2] = await ethers.getSigners();
        const ERC20 = await ethers.getContractFactory("ERC20");
        const token = await ERC20.deploy();
        await token.deployed();
        const getApprove = await token.connect(addr2).approve(addr1.address, 100);
        await getApprove.wait();
        expect(await token.allowance(addr2.address, addr1.address)).to.equal(100);
    });
});