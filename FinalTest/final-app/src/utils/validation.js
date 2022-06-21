const validation = (input, setValidation)=> {
    let msg = {};
    let check = true;
    if (!/^[\w\s]+$/.test(input.name)){
        msg.name = "Task is required";
        check = false;
    }

    let score = parseFloat(input.score);
    if (isNaN(score) || score < 0 || score > 10 ){
        msg.score = "Score is > 0 and < 10";
        check = false;
    }


    if (input.priority !== "important" && input.priority !== "medium" && input.priority !== "normal"){
        msg.priority = "Priority is required";
        check = false;
    }

    setValidation(msg);
    return check;
}

export default validation;