var promo_name = '';
var price = 12990;
var linkwithout = "https://t.me/Brainuniversity_bot?start=nopromo_program_14"
document.querySelectorAll("#nopromo_link").forEach((ah) => {
    ah.href = linkwithout;
})
function send_ajax(){
    if (promo_name != ''){
        $.ajax({
            url: "https://api.brainuniversity.ru/checkpromo/14&"+ promo_name,
            type: "POST",
            data: {'res': 'res'},
            success: function(resp){
                if (resp['res'] == 'success'){
                    var discount = resp["discount"]
                    var link = resp["return_link"]
                    document.getElementById("popup1").classList.remove("active");
                    document.getElementById("popup3").classList.add("active");
                    var newprice = price * (100 - discount) / 100;
                    document.getElementById("promo_price").innerHTML = newprice.toFixed(2) + "&nbsp;руб";
                    document.getElementById("promo_sent").onclick = function(){ gotg(link) };
                    document.querySelectorAll("#promo_link").forEach((ah) => {
                        ah.href = link;
                    })
                }
                else {
                    document.getElementById("popup1").classList.remove("active");
                    document.getElementById("popup4").classList.add("active");
                    promo_name = '';
                }
            },
            error: function(resp){
                console.log(resp)
            }
        })
    }
}
function eneter_promo1(){
    newprom = document.getElementById("promo_enter1").value;
    if (newprom.length > 0){
        promo_name = newprom;
        send_ajax();
    }
}
function eneter_promo2(){
    newprom = document.getElementById("promo_enter2").value;
    if (newprom.length > 0){
        promo_name = newprom;
        send_ajax();
    }
}
function eneter_promo3(){
    newprom = document.getElementById("promo_enter3").value;
    if (newprom.length > 0){
        promo_name = newprom;
        send_ajax();
    }
}
function withoutpromo(){
    document.getElementById("popup1").classList.remove("active");
    document.getElementById("popup4").classList.remove("active");
    document.getElementById("popup5").classList.add("active")
}
function gotgbut(){
    document.location.href = linkwithout;
}
function gotg(link){
    document.location.href = link
}
function tryagain(){
    document.getElementById("popup1").classList.add("active");
    document.getElementById("popup4").classList.remove("active");
}