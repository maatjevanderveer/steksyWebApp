// When the DOM is ready, run this function
$(document).ready(function() {
  //Set the carousel options
  $('#quote-carousel').carousel({
  	pause: true,
  	interval: 4000,
  });
});


$('.category_item').click(function(){
	var category = $(this).attr('id');
	if(category == 'all'){
		$('.plant_item').addClass('hide');
		setTimeout(function(){
			$('.plant_item').removeClass('hide');
		}, 300);
	} 
	else {
		$('.plant_item').addClass('hide');
		setTimeout(function(){
			$('.' + category).removeClass('hide');
		}, 300);
	}
});


function show_next(id,nextid,bar)
{
  var ele=document.getElementById(id).getElementsByTagName("input");
  var error=0;
  for(var i=0;i<ele.length;i++)
  {
    if(ele[i].type=="text" && ele[i].value=="")
  {
    error++;
  }
  }
	
  if(error==0)
  {
    document.getElementById("account-details").style.display="none";
    document.getElementById("user-details").style.display="none";
    
    $("#"+nextid).fadeIn();
    document.getElementById(bar).style.backgroundColor="#38610B";
  }
  else
  {
    console.log("Did not fill out all fields")
  }
}

function show_prev(previd,bar)
{
  document.getElementById("account-details").style.display="none";
  document.getElementById("user-details").style.display="none";
  
  $("#"+previd).fadeIn();
  document.getElementById(bar).style.backgroundColor="#D8D8D8";
}


// $('.button').click(function(){
// 	$('')
// })

// $('.button').click(function(){
// 	var $btn = $(this),
// 	$step = $btn.parents('.modal-body'),
// 	stepIndex = $step.index(),
// 	$pag = $('.modal-header span').eq(stepIndex);

// 	if(stepIndex === 0 || stepIndex === 1) { step1($step, $pag); }
// 	else { step3($step, $pag); }
	
// });


// function step1($step, $pag){
// 	console.log('step1');
//   // animate the step out
//   $step.addClass('animate-out');
  
//   // animate the step in
//   setTimeout(function(){
//   	$step.removeClass('animate-out is-showing')
//   	.next().addClass('animate-in');
//   	$pag.removeClass('is-active')
//   	.next().addClass('is-active');
//   }, 600);
  
//   // after the animation, adjust the classes
//   setTimeout(function(){
//   	$step.next().removeClass('animate-in')
//   	.addClass('is-showing');
  	
//   }, 1200);
// }


// function step3($step, $pag){
// 	console.log('3');

//   // animate the step out
//   $step.parents('.modal-wrap').addClass('animate-up');

//   setTimeout(function(){
//   	$('.rerun-button').css('display', 'inline-block');
//   }, 300);
// }

// $('.rerun-button').click(function(){
// 	$('.modal-wrap').removeClass('animate-up')
// 	.find('.modal-body')
// 	.first().addClass('is-showing')
// 	.siblings().removeClass('is-showing');

// 	$('.modal-header span').first().addClass('is-active')
// 	.siblings().removeClass('is-active');
// 	$(this).hide();
// });

