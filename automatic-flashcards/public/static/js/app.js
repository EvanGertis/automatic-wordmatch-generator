var id;
var category;
function init() {
    id = document.getElementById('ID').value;
    console.log("id: "+id);
}

function save(){
    init();
    saveTopic();
    saveCategory();
    saveCard();

    //refresh page
    location.reload()
}

// save topic
function saveTopic(){
    console.log("save topic");
    //fetch 
    //1. id
    console.log("id: "+id);
    //2. topic
    var topic = document.getElementById('topic').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/topic", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function()
    {   
        if(xhr.readyState == 4 && xhr.status == 201) {
            console.log(xhr.status)
            console.log("content saved");
        }
        else{
            console.log(xhr.status)
            console.log("content was not saved successfully");
        }
    }
    //TODO: send topic
    var json = JSON.stringify({id: id, topic: topic})
    console.log("sending topic"); 
    console.log(json);
    xhr.send(json);
}

// save category
function saveCategory(){
    console.log("save category");
    //1. id
    console.log("id: "+id);
    //2. category
    var category = document.getElementById('category').value;
    console.log("category: "+category);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/category", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function()
    {   
        if(xhr.readyState == 4 && xhr.status == 201) {
            console.log(xhr.status)
            console.log("content saved");
        }
        else{
            console.log(xhr.status)
            console.log("content was not save successfully");
        }
    }
    //TODO: send category
    var json = JSON.stringify({id: id, category: category});
    console.log("sending category");
    console.log(json);
    xhr.send(json);
}

// save card
function saveCard(){
    console.log("save card");
    //fetch
    //1. id
    console.log("id: "+id);
    var json = [];//changed to array so that it could contain objects
    json.id = id;
    json.category = category;
    // loop for each and append to array
        //2. prompt 
        //3. question
        //4. answerid: id
    //
    var xhr = new XMLHttpRequest();
    //TODO: each of these need to be added to the json string.
    var elements = document.getElementsByTagName("input")

    
    var temp = {};//temp object that can be used to push new cards to json array
    for (const element of elements) {
    
        temp.id = id;//needed to keep id value after "reset"
        temp.category = document.getElementById('category').value;//added

        var promptValue;
        temp.prompt = promptValue;//needed to keep prompt value after "reset"

            if(element.id.includes("pl")) {
                console.log("prompt: "+ element.value);
                temp.prompt = element.value;
                //json.prompt = element.value
                promptValue = element.value;//reassign so it can be used outside if statement
            }

            if(element.id.includes("ql")) {
                console.log("question: "+ element.value);
                temp.question = element.value;
                //json.question = element.value;
            }

            if(element.id.includes("al")) {
                console.log("answer: "+ element.value);
                temp.answer = element.value;
                //json.answer = element.value;
                console.log(temp);
            //when it gets to the answer then the card is complete so we need to 
            //save the value in our json array
                json.push(temp);
                console.log(json);
                var temp = {}; //reset temp so it can be used for next question
                //id and prompt are saved outside of statement so they will 
                //be reassigned at the beginning of the next loop
                console.log('pushed');
                console.log(json);
                }
    }
        //create an array of JSON strings to be looped through and sent
        let strings = json.map((o) => JSON.stringify(o));
        console.log(strings);

for(i=0; i<strings.length; i++){//send each card separately by looping through array
    xhr = [];//allow for new request each iteration.
    xhr[i] = new XMLHttpRequest;
    xhr[i].open("POST", "/card", true);
    xhr[i].setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr[i].onreadystatechange = function()
    {   
        if(xhr.readyState == 4 && xhr.status == 201) {
            console.log(xhr.status)
            console.log("content saved");
        }
        else{
            console.log(xhr.status)
            console.log("content was not saved successfully");
        }
    }
    console.log("sending card",(i+1));
    //verify that the proper json is sent to the server
    // i.e. {"id":"5","prompt":"p1","question":"q1","answer":"a1"}
    // cont'd {"id":"5","prompt":"p2","question":"q2","answer":"a2"}
    console.log(strings[i]);
    xhr[i].send(strings[i]);
}
}