    
    const base_url = `https://jeromesaka.github.io/code-challenge-3/db.json`
    //const base_url = "http://localhost:3000/films";
    const film_endpoint = `${base_url}`;
// create an empty json object to hold films

    let films = {};
//call this method to load films
    load_films()
// method definition
    function load_films(){
    fetch(film_endpoint)
        .then(res=>res.json())
        .then(re=> {
            const res      = re['films']
// call this function to load film details.. And append data to right div.

            load_film_details(1)
//html content to be appended to left side, a list of movies.
            let html = "";

            for (let i=0; i<res.length;i++){

                const film = res[i];
//added a load_film_details function to onclick event to load details and append to the right div

                html += "<li onclick='load_film_details("+film.id+")'>"+film.title+"</li>"

            }
 // replace ul#films with a list of movies.           
            document.getElementById("films").innerHTML = html

        })
        .catch(e=>console.error(e))
}

    function load_film_details(id){
    fetch(`${film_endpoint}`)
        .then(res=>res.json())
        .then(re=> {

            const res = re['films'][id];

            const ticket_available = res.capacity - res.tickets_sold

            let buy_ticket_button = "";

            if (ticket_available>0)
                buy_ticket_button = `<button onclick="buy_ticket(${res.id},${res.tickets_sold}+1)">Buy Ticket</button>`
            else
                buy_ticket_button = "<p>Sold out</p>"

            document.getElementById("movie_details").innerHTML = `<div>
                <img src="${res.poster}" width="200px" height="150px" alt="res.title">

                <p>title: ${res.title}</p>
                <p>runtime: ${res.runtime}</p>
                <p>showtime: ${res.showtime}</p>
                <p>available tickets ${ticket_available}</p>
                <br>
                ${buy_ticket_button}
            </div>`

        })
        .catch(e=>console.error(e))
}
// function to buy ticket. Increments the number of tickets sold

    function buy_ticket(id,tickets_sold){
    fetch(`${film_endpoint}/${id}`,
        {
            method:"PATCH",
            body:JSON.stringify({
                tickets_sold
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>load_film_details(id))
        .catch(e=>console.error(e))
}
