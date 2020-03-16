// My custom solution to a psuedo-knapsack problem

const assignToButler = (taskReq, butlers) => {
    butlers.forEach((butler, i) => {
        if(butler.remainingHours >= taskReq.hours && !taskReq.assigned) {
            butlers[i] = {
                requests: [...butlers[i].requests, taskReq.requestId],
                remainingHours: butler.remainingHours - taskReq.hours
            }
            taskReq.assigned = true;
        } else if( i === butlers.length - 1 && !taskReq.assigned ) {
            if(taskReq.hours <= 8) {
                butlers.push({
                    requests: [taskReq.requestId],
                    remainingHours: 8 - taskReq.hours
                })
            } else {
                const splicount = Math.ceil(taskReq.hours/8);
                let taskHrs = 0;
                [...new Array(splicount)].forEach((el, i) => {
                    let hr = 0;
                    if(taskReq.hours - taskHrs > 8) {
                        hr = 8;
                        taskHrs += 8;
                    } else {
                        hr = taskReq.hours - taskHrs
                    }
                    assignToButler({
                        ...taskReq,
                        hours: hr
                    }, butlers);
                })
            }
            taskReq.assigned = true;
        }
    })
}

module.exports = function allocateAndReport(requests) {
    const butlers = [{ requests: [], remainingHours: 8 }];
    const clientIds = [];
    requests.forEach(taskReq => {
        clientIds.push(taskReq.clientId);
        taskReq.assigned = false;
        assignToButler(taskReq, butlers);
    })
    return {
        butlers,
        spreadClientIds: new Array(...new Set(clientIds))
    }
}