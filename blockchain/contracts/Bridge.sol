// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// USDT Adress TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf

interface ICrowdfundingContract {
    function contribute(uint8 _projectId, uint256 amount) external;
}

contract Bridge {
    address private admin;
    ERC20 private token;

    event TokensLockedForContribute(
        address indexed sender,
        uint8 projectId,
        uint256 amount
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(address tokenAddress) {
        admin = msg.sender;
        token = ERC20(tokenAddress);
    }

    // Заблокировать средства отправителя,
    // и отправить событие для вклада в проект в другом блокчейне
    function lockTokensForContribute(uint8 projectId, uint256 amount) external {
        require(
            token.transferFrom(msg.sender, address(this), amount),
            string.concat("Faile transfer ", token.name())
        );
        emit TokensLockedForContribute(msg.sender, projectId, amount);
    }

    // Выдать оригинальные токены получателю
    function contributeCrowdfunding(
        address crowdfundingContract,
        uint8 projectId,
        uint256 amount
    ) external onlyAdmin {
        require(
            token.balanceOf(address(this)) > amount,
            "not enough tokens on the bridge balance"
        );
        token.approve(crowdfundingContract, amount);
        ICrowdfundingContract(crowdfundingContract).contribute(
            projectId,
            amount
        );
    }

    function tokenBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function topUpBalance() external payable {}
}
