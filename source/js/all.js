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
        zoneList()
    }
}

function zoneList(){
    let arr = filterZoneList();
    showZoneList(arr);
}

function filterZoneList(){ 
    // 從json資料中的data[i].Zone，取出所有的行政區
    // 加進陣列的過程要跳過重複的區域
    let content = [];
    for(var i = 0; i < data.length; i++){
        // console.log(data[i].Zone)
        let bool = content.find(function(el){ 
            // array.find() 回傳第一個滿足條件的值，如果找不到則回傳 undefined。
            // 如果陣列裡有該區域的話，就回傳該區域的值，找不到就會回傳undefined。
            return data[i].Zone == el; //return 後面接著的是要判斷的條件
        });
        if(bool == undefined){ // 如果陣列找不到才加進去
            content.push(data[i].Zone);
        }
    }
    // console.log(content);
    return content;
}

function showZoneList(arr){
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += `<a class="dropdown-item" href="#">${arr[i]}</a>`;
    }
    $('header .dropdown-menu').html(str);
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