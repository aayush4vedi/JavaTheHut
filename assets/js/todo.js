$("ul").on('click', 'li', function(){
    $(this).toggleClass('completed');
});

$('ul').on('click','span',function(e){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    e.stopPropagation();
});
$('input[type="text"]').keypress(function(e){
    if(e.which === 13){
        var txt = $(this).val();
        $('ul').append('<li><span><i class="fas fa-trash"></i></span> '+txt+'</li>');
        $(this).val("") ;
    }
});
$('.fa-plus-circle').click(function(){
    $('input[type="text"]').fadeToggle();
})



















