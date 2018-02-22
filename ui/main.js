var button = document.getElementById('counter');

button.onclick = function() {

    //create a request object
     
    var request = new XMLHttpRequest();

    //Caapture response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString;
            }
        }
    };

    request.open('GET','http://suhas2ab.imad.hasura-app.io',true);
    request.send(null);
}