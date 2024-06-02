// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Project {
        address payable creator;
        uint goal;
        uint deadline;
        uint fundsRaised;
        bool goalReached;
    }

    mapping(uint => Project) public projects;

    // Маппинг для хранения вкладов участников по проектам
    mapping(uint8 => mapping(address => uint)) public contributions;
    // Маппинг для хранения количества вкладов в проект
    mapping(uint8 => uint8) public contributionsToProjectCount;


    event ProjectCreated(uint8 projectId, address creator, uint goal, uint deadline);
    event FundContributed(uint8 projectId, address contributor, uint amount);
    event GoalReached(uint8 projectId, uint totalFunds);
    event FundsWithdrawn(uint8 projectId, address creator, uint amount);
    event FundsRefunded(uint8 projectId, address contributor, uint amount);

    // Функция для создания нового проекта
    function createProject(uint8 projectId, uint goal, uint duration) external {
        require(goal > 0, "Goal must be greater than zero");
        require(duration > 0, "Duration must be greater than zero");

        uint deadline = block.timestamp + duration;

        projects[projectId] = Project({
            creator: payable(msg.sender),
            goal: goal,
            deadline: deadline,
            fundsRaised: 0,
            goalReached: false
        });

        emit ProjectCreated(projectId, msg.sender, goal, deadline);
    }

    // Gолучения собранных средств для проектов
    function getProjectsFundsRaised(uint8[] memory projectIdList) external view returns (uint[] memory) {
        uint[] memory fundsRaisedList = new uint[](projectIdList.length);
        for (uint8 i = 0; i < projectIdList.length; i++) {
            fundsRaisedList[i] = projects[projectIdList[i]].fundsRaised;
        }

        return fundsRaisedList;
    }

    // Получение количества вкладов в проект
    function getContributionsToProjectCount(uint8 projectId) external view returns (uint8) {
        return  contributionsToProjectCount[projectId];
    }

    // Внесения средств в проект
    function contribute(uint8 _projectId) external payable {
        Project storage project = projects[_projectId];
        require(block.timestamp < project.deadline, "Project has ended");
        require(msg.value > 0, "Contribution must be greater than zero");

        project.fundsRaised += msg.value;
        contributions[_projectId][msg.sender] += msg.value;
        contributionsToProjectCount[_projectId]++;

        emit FundContributed(_projectId, msg.sender, msg.value);

        // Проверяем, достигнута ли цель
        if (project.fundsRaised >= project.goal && !project.goalReached) {
            project.goalReached = true;
            emit GoalReached(_projectId, project.fundsRaised);
        }
    }

    // Вывод средств создателем проекта после достижения цели
    function withdrawFunds(uint8 _projectId) external {
        Project storage project = projects[_projectId];
        require(project.creator == msg.sender, "Only the creator can withdraw funds");
        require(project.goalReached, "Goal not reached");
        require(block.timestamp >= project.deadline, "Project has not ended yet");

        uint amount = project.fundsRaised;
        project.fundsRaised = 0;
        project.creator.transfer(amount);

        emit FundsWithdrawn(_projectId, msg.sender, amount);
    }

    // Возврат средств участникам, если цель не достигнута
    function refund(uint8 _projectId) external {
        Project storage project = projects[_projectId];
        require(block.timestamp >= project.deadline, "Project has not ended yet");
        require(!project.goalReached, "Goal was reached");

        uint amount = contributions[_projectId][msg.sender];
        require(amount > 0, "No contributions to refund");

        contributions[_projectId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit FundsRefunded(_projectId, msg.sender, amount);
    }
}