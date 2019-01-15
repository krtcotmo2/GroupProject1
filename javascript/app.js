$("#button1").click(function() { $("#form1").show(); };



$("#previousbutton").click(function() {
    $("#form_sub_container1").show();
    $("#form_sub_container2").hide(); })

    $("#nextbutton").click(function() {
    $("#form_container").find(":hidden").show().next();
    $("#form_sub_container1").hide();
})

function shows_form_part(n){
    var i = 1, p = document.getElementById("form_part"+1);
    while (p !== null){
        if (i === n){
            p.style.display = "";
        }
        else{
            p.style.display = "none";
        }
        i++;
        p = document.getElementById("form_part"+i);
    }
}
