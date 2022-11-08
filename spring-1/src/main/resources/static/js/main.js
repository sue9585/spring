let cartList;

window.addEventListener('load', () => {
    const grid = new Isotope("section", {
        "itemSelector":"article",
        "columnWidth":"article",
        "transitionDuration":"0.5s"
    });

    // 분류 기능에 대한 코드
    const btns = document.querySelectorAll("main ul li");
    for (let el of btns) {
        el.addEventListener("click", (event)=> {
            //event.preventDefault();
            const sort = event.currentTarget.querySelector("a").getAttribute("data-filter");
            grid.arrange({
                "filter":sort
            });
            
            for (let el of btns) {
                el.classList.remove("on");
            }
            event.currentTarget.classList.add("on");
        });
    }

    // Session Storage 초기화
    if ("cartList" in window.sessionStorage == false ){
        cartList = [];
        window.sessionStorage['cartList'] = JSON.stringify(cartList);
    } else {
        cartList = JSON.parse(window.sessionStorage['cartList']);
    }

    const basket_addBtns = document.querySelectorAll("main section article a");
    for (let el of basket_addBtns){
        el.addEventListener("click", (event) => {            
            let data_key = event.currentTarget.getAttribute("data-key");
            
            let existItem = false;
            for (let item of cartList) {
                if (item.id == data_key) {
                    // 이미 항목이 장바구니에 있는 경우
                    item.count++;
                    existItem = true;
                }            
            }
            if (existItem == false) {
                // 항목이 장바구니에 없는 경우
                let item = {
                    "id":data_key,
                    "src":event.currentTarget.closest("article").querySelector("img").getAttribute("src"),
                    "title":event.currentTarget.closest("article").querySelector("h2").getAttribute("h2"),
                    "count":1
                }
                cartList.push(item);
            }
            window.sessionStorage['cartList'] = JSON.stringify(cartList);

            let toastMsg = document.querySelector('.toastCartAdd');
            toastMsg.classList.add('msgon');
            setTimeout( () => {
                toastMsg.classList.remove('msgon');
            }, 1500);
        });
    }
});

