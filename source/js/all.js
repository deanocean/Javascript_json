let data;

loadData()

function loadData(){
    let url = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);

    xhr.onload = function(){
        let back = JSON.parse(xhr.responseText);
        data = back.result.records;
        // console.log(data);
        showData()
    }
}


function showData(){
    let content = '';
    for(var i = 0; i < 10; i++){
        let template = `
        <div class="col mb-4">
            <div class="card h-100">
                <img src="${data[i].Picture1}" class="card-img-top" alt="...">
                <div class="card-img-overlay">
                    <h3>${data[i].Name}</h3>
                </div>
                <div class="card-body">
                    <p class="card-text"><i class="text-success mr-2 fas fa-clock"></i>${data[i].Opentime}</p>
                    <p class="card-text"><i class="text-warning mr-2 fas fa-map-marker-alt"></i>${data[i].Add}</p>
                    <p class="card-text mb-0"><i class="text-primary mr-2 fas fa-mobile-alt"></i>${data[i].Tel}</p>
                    <p class="card-tag mb-0 position-absolute"><i class="text-warning mr-2 fas fa-tag"></i>${data[i].Ticketinfo}</p>
                </div>
            </div>
        </div>
        `;
        content += template;
    }
    $('.infoContent').html(content);
}