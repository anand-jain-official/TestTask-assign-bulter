// My custom solution to a psuedo-knapsack problem

const assignToButler = (taskReq, butlers) => {
    butlers.forEach((butler, i) => {
        if(butler.remainingHours >= taskReq.hours) {
            butler[i] = {
                requests: [...butler[i].requests, taskReq.requestId],
                remainingHours: butler.remainingHours - taskReq.hours
            }
        } else if( i === butlers.length - 1 ) {
            butlers.push({
                requests: [taskReq.requestId],
                remainingHours: 8 - taskReq.hours
            })
        }
    })
}

module.exports = function allocateAndReport(requests) {
    const butlers = [{ requests: [], remainingHours: 8 }];
    const clientIds = [];
    requests.forEach(taskReq => {
        clientIds.push(taskReq.clientId);
        if(taskReq.hours < 8) {
            assignToButler(taskReq, butlers);
        } else {
            const splitCount = Math.ceil(taskReq.hours / 8);
            let i = 0;
            while (i < splitCount) {
                const taskObj = {
                    ...taskReq,
                    hours: Math.ceil(taskReq.hours / splitCount)
                }
                assignToButler(taskObj);
                i++;
            }
        }
    })
    return {
        butlers,
        spreadClientIds: new Array(...new Set(clientIds))
    }
}