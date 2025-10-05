// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Splitwise {
    struct Expense {
        address maker;
        uint256 totalAmount;
        address[] participants;
        string description;
        bool settled;
    }

    IERC20 public token;
    uint256 public expenseCount;
    mapping(uint256 => Expense) public expenses;
    mapping(address => mapping(address => uint256)) public debts; // debts[debtor][creditor]

    event ExpenseAdded(uint256 indexed id, address indexed maker, uint256 totalAmount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    function addExpense(
        uint256 totalAmount,
        address[] memory participants,
        string memory description
    ) external {
        require(totalAmount > 0, "Amount must be greater than 0");
        require(participants.length > 0, "Add at least one participant");

        uint256 share = totalAmount / participants.length;

        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] != msg.sender) {
                debts[participants[i]][msg.sender] += share;
            }
        }

        expenseCount++;
        expenses[expenseCount] = Expense({
            maker: msg.sender,
            totalAmount: totalAmount,
            participants: participants,
            description: description,
            settled: false
        });

        emit ExpenseAdded(expenseCount, msg.sender, totalAmount);
    }
}
