// My custom solution to a psuedo-knapsack problem

const assignToButler = (taskReq, butlers) => {
    butlers.forEach((butler, i) => {
        if(butler.remainingHours >= taskReq.hours && !taskReq.assigned) { // Check if current butler in array has enough remaining time for non-assigned task
            butlers[i] = {
                requests: [...butlers[i].requests, taskReq.requestId],
                remainingHours: butler.remainingHours - taskReq.hours
            }
            taskReq.assigned = true;                                      // set task assigned as true
        }
    });
    if(!taskReq.assigned ) {
        if(taskReq.hours <= 8) {                                      // else If task if <= 8 hours, just assign a new butler to it
            butlers.push({
                requests: [taskReq.requestId],
                remainingHours: 8 - taskReq.hours
            });
        } else {                                                     // else if task > 8 hours, split it into multiple tasks 
            const splicount = Math.ceil(taskReq.hours/8);            // and recursively call assignToButler function
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
}

module.exports = function allocateAndReport(requests) {
    const butlers = [{ requests: [], remainingHours: 8 }]; // Initial butler Array
    const clientIds = [];
    requests = requests.sort((a,b) => b.hours - a.hours); // Sort for better butler utilization
    requests.forEach(taskReq => {                         // Looping through the requests
        clientIds.push(taskReq.clientId);
        taskReq.assigned = false;
        assignToButler(taskReq, butlers);                 // Call assignToButler function.
    })
    return {
        butlers,
        spreadClientIds: new Array(...new Set(clientIds)) // To remove duplicates in clientIds Array
    }
}