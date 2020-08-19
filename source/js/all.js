// init
let data;
let pageArea = "全部列表";
let cardPerPage = 10;

dataLoad()
renderAreaList( filterAreaList() );
renderArea(data);
renderPage(data);

$('.hot .btn').click(function(e){ 
    renderArea( filterArea(e, $(this)) ); 
    renderPage( filterArea(e, $(this)) );
})

$('.pagination').click(function(e){ clickPage(e, $(this)) })

$('header .dropdown-menu').click( function(e) { 
    renderArea( filterArea(e, $(this)) ); 
    renderPage( filterArea(e, $(this)) );
} )


function dataLoad(){
    let url = "https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);

    if(xhr.status == 200){
        let back = JSON.parse(xhr.responseText);
        data = back.result.records;
    }
}

function filterAreaList(){ 
    // 從json資料中的data[i].Area，取出所有的行政區
    // 加進陣列的過程要跳過重複的區域
    let content = [];
    for(var i = 0; i < data.length; i++){
        let bool = content.find(function(el){ 
            // array.find() 回傳第一個滿足條件的值，如果找不到則回傳 undefined。
            // 如果陣列裡有該區域的話，就回傳該區域的值，找不到就會回傳undefined。
            return data[i].Zone == el; //return 後面接著的是要判斷的條件
        });
        if(bool == undefined){ // 如果陣列找不到才加進去
            content.push(data[i].Zone);
        }
    }
    return content;
}

function renderAreaList(filteredData){
    let arr = filteredData;
    let str = "";
    for(let i = 0; i < arr.length; i++){
        str += `<a class="dropdown-item" data-area="${arr[i]}" href="#">${arr[i]}</a>`;
    }
    $('header .dropdown-menu').html(str);
}

function filterArea(e = null, obj = null){
    let filteredData = [];

    if(e != null){
        e.preventDefault();
        pageArea = $(e.target).data('area');
    }

    if(pageArea == "全部列表"){
        return data;
    }

    for(let i = 0; i < data.length; i++){
        if(data[i].Zone == pageArea){
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}

function renderArea(filteredData, index = 0){
    let content = '';

    let dataPerPage = filteredData.slice(index, index+cardPerPage);

    $('.infoArea h2').text(pageArea);
    $('.infoArea h2').attr('data-area', pageArea);

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
    e.preventDefault()
    let index = ( parseInt(e.target.textContent) - 1 ) * cardPerPage;  // 1: 0 | 2: 6 送給showData()的slice處理，它會從0開始抓0~5、從6開始抓6~11
    let area = $('.infoArea h2').data('area');
    let filteredData = filterArea();
    console.log(filteredData);
    renderArea(filteredData, index);
    
    obj.find(".page-item").removeClass('active');
    $(e.target).parent().addClass('active');
}

function renderPage (filteredData){
    let str = '';
    let length = filteredData.length;
    let pageAmt = Math.ceil((length / cardPerPage));

    for(var i=0; i<pageAmt; i++){
        str += `<li class="page-item"><a class="page-link" href="#">${i+1}</a></li>`;
    }

    $('.pagination').html(str);
    $('.pagination .page-item').eq(0).addClass("active");
}


// 順一下流程
    // 資料
    // 事件
    // 渲染

// 功能
/*
    資料 撈取全部內容 json
    
    註冊 下拉選單 點擊 (顯示列表資料) 

    資料 篩選 下拉選單內顯示的區域 

    繪製 下拉選單 在header   

    註冊 熱門行政區 點擊 (顯示列表資料)

    資料 篩選 被點擊的熱門區域所屬內容

    繪製 列表資料 在內容

    註冊 pagination 點擊 (顯示出對應頁數的內容)

    資料 篩選 pagination的頁數

    繪製 pagination 在內容下方
*/

// function
/* 
    dataLoad()

    filterAreaList()

    renderAreaList()
    
    filterArea()

    renderArea()

    filterPage()

    renderPage()

*/

// init
/*

*/
