//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

contract ERC20 {
    string private _name = "Doctor";
    string private _symbol = "WHO";
    uint8 private _decimals = 18;
    uint256 private _totalSupply = 19632017;
    address public owner;
    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _allowances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor() {
        _balances[msg.sender] = _totalSupply;
        owner = msg.sender;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8){
        return _decimals;
    }

    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }

    function balanceOf(address _owner) public view returns (uint256 balance){
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        require(_balances[msg.sender] >= _value, "Not enough tokens");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_allowances[_from][msg.sender] >= _value, "Not enough allowed amount");
        require(_balances[_from] >= _value, "Not enough tokens");
        _balances[_from] -= _value;
        _balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        _allowances[_from][msg.sender] -= _value;
        emit Approval(_from, msg.sender, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        _allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return _allowances[_owner][_spender];
    }

}


