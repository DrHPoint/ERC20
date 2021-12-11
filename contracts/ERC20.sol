//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

/// @title Standard but handmade contract by standard ERC20.
/// @author Pavel E. Hrushchev (DrHPoint).
/// @notice You can use this contract for standard token transactions.
/// @dev All function calls are currently implemented without side effects.
contract ERC20 {
    string private _name = "Doctor";
    string private _symbol = "WHO";
    uint8 private _decimals = 18;
    uint256 private _totalSupply = 0;
    address public owner;
    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _allowances;

    /// @notice This event shows from which (_from) and to which address (_to) a certain amount (_value) of tokens were transferred.
    /// @dev Nothing unusual. Standard event with two addresses and the amount of tokens for which the transaction is made.
    /// @param _from is the address from which the transaction is made.
    /// @param _to is the address to which the transaction is made.
    /// @param _value is the value by which the transaction is made.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
    /// @notice This event indicates that a user with one address (_owner) has entrusted a user with a different address (_spender) to use a certain number of tokens (_value).
    /// @dev Nothing unusual. Standard event with two addresses and the amount of tokens with which action is allowed
    /// @param _owner is the address from which the approval was given to carry out transactions by proxy.
    /// @param _spender is the address to which the approval was given to carry out transactions by proxy.
    /// @param _value is the value
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    /// @dev Currently, the value of '_totalSupply' shown in the constructor, like the '_name' and '_symbol', cannot be set. 
    constructor() {
        owner = msg.sender;
        mint(owner, 19632017 * 1e18);
    }

    /// @notice This function returns the name of the token.
    /// @dev Nothing unusual. Returns the name of the token, which is hardcoded in the parameters of the contract
    /// @return Age in years, rounded up for partial years
    function name() public view returns (string memory) {
        return _name;
    }

    /// @notice This function returns the symbol of the token.
    /// @dev
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /// @notice This function shows how many the whole token is being divided.
    /// @dev
    function decimals() public view returns (uint8){
        return _decimals;
    }

    /// @notice This function shows the sum of all balances.
    /// @dev
    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }

    /// @notice This function shows the balance of the address (_owner) you need to know.
    /// @dev Standart view balance function without any complexity
    /// @param _owner - The address of the client whose balance you want to check
    /// @return balance - The client's token balance
    function balanceOf(address _owner) public view returns (uint256 balance){
        return _balances[_owner];
    }

    /// @notice This function transfers a certain number of tokens (_value) from the address from which the user applies to another address specified in the parameters (_to).
    /// @dev
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "Transfer to the zero address");
        require(_balances[msg.sender] >= _value, "Not enough tokens");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /// @notice This function transfers a certain number of tokens (_value) from the address from which the user wants to transfer tokens (_from) to another address specified in the parameters (_to).
    /// @dev
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(_from != address(0), "Transfer from the zero address");
        require(_to != address(0), "Transfer to the zero address");
        require(_allowances[_from][msg.sender] >= _value, "Not enough allowed amount");
        require(_balances[_from] >= _value, "Not enough tokens");
        _balances[_from] -= _value;
        _balances[_to] += _value;
        _allowances[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    /// @notice This function allows the requesting user to entrust the management of a certain amount of tokens (_value) to a user with a different address (_spender).
    /// @dev
    function approve(address _spender, uint256 _value) public returns (bool success){
        require(_spender != address(0), "Approve to the zero address");
        _allowances[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @notice This function allows you to find out how many tokens a user with one specified address (_owner) is trusted to use from the user's balance with another specified address (_spender).
    /// @dev
    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return _allowances[_owner][_spender];
    }

    /// @notice This function allows you to burn a certain number of tokens from a specified address (_from).
    /// @dev
    function burn(address _from, uint256 _value) public returns (bool success){
        require(msg.sender == owner, "Not owner");
        require(_from != address(0), "Burn from the zero address");
        require(_balances[_from] >= _value, "Not enough tokens");
        _balances[_from] -= _value;
        _totalSupply -= _value;
        emit Transfer(_from, address(0), _value);
        return true;
    }

    /// @notice This function allows you to mint a certain number of tokens to a specified address (_to).
    /// @dev
    function mint(address _to, uint256 _value) public returns (bool success){
        require(msg.sender == owner, "Not owner");
        require(_to != address(0), "Mint to the zero address");
        _balances[_to] += _value;
        _totalSupply += _value;
        emit Transfer(address(0), _to, _value);
        return true;
    }
}


