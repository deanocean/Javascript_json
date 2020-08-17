
let data;
let cardPerPage = 10;

init()

function loadData(){
    let url = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);

    if(xhr.status == 200){
        let back = JSON.parse(xhr.responseText);
        data = back.result.records;
        // console.log(data);
        showData(data);
        zoneList();
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
    $('header .dropdown-item').click( function(e) { judgeBtnContent(e, $(this)) } )
}

function judgeBtnContent(e, obj){
    e.preventDefault();
    let strict = obj.text();
    let filteredData = filterZone(strict);
    console.log(filteredData)
    $('.infoArea h2').text(strict);
    $('.infoArea h2').attr('data-strict',strict);
    showData(filteredData);
    showPage(filteredData);
}

function filterZone(strict){
    let filteredData = [];

    if(strict == "all"){
        return data;
    }

    for(let i = 0; i < data.length; i++){
        if(data[i].Zone == strict){
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}

function showData(filteredData, index = 0){
    // console.log("index", index);
    let content = '';
    let dataPerPage = filteredData.slice(index, index+cardPerPage);
    for(var i = 0; i < dataPerPage.length; i++){
        let template = `
        <div class="col mb-4">
            <div class="card h-100">
                <div style="height: 250px; background-image: url(${dataPerPage[i].Picture1})" class="card-img-top bg-cover position-relative">
                    <h3 style="bottom: 0; left: 1.25rem;" class="position-absolute mb-3 text-white">${dataPerPage[i].Name}</h3>
                </div>
                <div class="card-body">
                    <p class="card-text"><i class="text-success mr-2 fas fa-clock"></i>${dataPerPage[i].Opentime}</p>
                    <p class="card-text"><i class="text-warning mr-2 fas fa-map-marker-alt"></i>${dataPerPage[i].Add}</p>
                    <p class="card-text mb-0"><i class="text-primary mr-2 fas fa-mobile-alt"></i>${dataPerPage[i].Tel}</p>
                    <p class="card-tag mb-0 position-absolute"><i class="text-warning mr-2 fas fa-tag"></i>${dataPerPage[i].Ticketinfo}</p>
                </div>
            </div>
        </div>
        `;
        content += template;
    }
    $('.infoContent').html(content);
}

function clickPage(e, obj){
    console.log(e.target)
    e.preventDefault()
    let index = ( parseInt(e.target.textContent) - 1 ) * cardPerPage;  // 1: 0 | 2: 6 送給showData()的slice處理，它會從0開始抓0~5、從6開始抓6~11
    let strict = $('.infoArea h2').data('strict');
    console.log("strict", strict);
    let filteredData = filterZone(strict);
    
    showData(filteredData, index);
    
    obj.find(".page-item").removeClass('active');
    $(e.target).parent().addClass('active');
}

function showPage (filteredData){
    let str = '';
    let length = filteredData.length;
    let pageAmt = Math.ceil((length / cardPerPage));

    for(var i=0; i<pageAmt; i++){
        str += `<li class="page-item"><a class="page-link" href="#">${i+1}</a></li>`;
    }

    $('.pagination').html(str);
    $('.pagination .page-item').eq(0).addClass("active");
}

function init(){
    loadData()
    showPage(data)
    $('.hot .btn').click(function(e){ judgeBtnContent(e, $(this)) })
    $('.pagination').click(function(e){ clickPage(e, $(this)) })
}


// 順一下流程