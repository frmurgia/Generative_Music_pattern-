// JavaScript Document

//-------------------------------------------------------------------------------------------
//  INITIALISE SOUND
//-------------------------------------------------------------------------------------------

var cxa;
var canvasA;

var acx;
var bpm = 110;
var paused = true;


var startCounter = 0;
var mode = 2;


// COLOUR //
var col1 = ["#634a4c","#624b56","#6c4c56","#a05b6d","#3e3940","#3c3d49","#36363f","#868c9d","#bdc4cc","#312d33","#e17280","#787f83","#583c52","#6e8073","#e39f9f","#3e3f4b","#363138","#5e4358","#525363","#484d5b"]; // MAUVE
var col2 = ["#554a45","#5e4c4f","#544b4f","#945b66","#313939","#303d42","#2a3638","#798c97","#b4c4c8","#242b2b","#dc7279","#6a7f7c","#4a3c4b","#60806c","#df9f99","#313f44","#283030","#4e424f","#43555c","#3b4d54"]; // OLIVE
var col3 = ["#6e5348","#6d5452","#795552","#bc6769","#413f3c","#3f4445","#373c3b","#9aa199","#e3e3c9","#30302e","#ff827c","#88927f","#60434e","#7c936f","#ffb79b","#414647","#363633","#634953","#565d5e","#4d5757"]; // YELLOW
var col4 = ["#54524f","#53535a","#5d545a","#936371","#304143","#2f454c","#293d42","#7894a0","#b3c9cd","#253436","#dc7a83","#698786","#494456","#5f8876","#dfa6a2","#30474e","#28383b","#504b5c","#3f5d66","#3a555f"]; // BLUE

var col = [];

var sky1 = ["#d9c6be","#c0948f","#e8b892","#624b56","#a05b6d","#3e3940","#36363f","#36363f" ];
var sky2 = ["#d9c6be","#c0948f","#e8b892","#5e4c4f","#945b66","#313939","#2a3638","#2a3638" ];
var sky3 = ["#ffe6c0","#f1aa91","#ffd594","#6d5452","#bc6769","#413f3c","#373c3b","#373c3b" ];
var sky4 = ["#d9cbc4","#bf9c98","#e8be9b","#53535a","#936371","#304143","#293d42","#293d42" ];

var sky = [];
var skyCol = "";
var palette = 0;

var white = "#fff";
var font1 = "Georgia";
var font1 = "Lora";


var panOver = [false,false,false,false,false,false,false];
var panOn = [false,false,false,false,false,false,false];
var panTimer = [];
var panG = [];
var panOpen = false;
var panCloseOver = false;

var panPadY = [1,1,1,1,1,1,1];
var panPadDest = [1,1,1,1,1,1,1];

var harpOpen = false;
var harpCloseOver = false;
var harpOver = false;
var harpHold = false;

var harpN = 0;
var harpNLast = 0;
var harpOn = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var harpTimer = [];
var harpInterval;
var harpD = [];
var harpG = [];
var harpCount = 0;



// SOUND //
var beatCount = 0;
var fInt = 0;
var midC = -9;
var thisInt = 0;

var freq = 0;
var freq2 = 0;

var major = [0,2,4,5,7,9,11,12];
var minor = [0,0,3,5,7,0,10,12];
var minor2 = [-2,0,3,5,7 ,8, 10,12];
var minor3 = [0,2,3,5,7,3,10,12];
var harmony = [2,3,7,8,10,12,14,15];
var fifth = [5,7,10,12,14,15,17,19];
var panScale = [0,2,12,7,10,-2,2];
var panHarm = [7,10,17,12,15,5,10];
var harpScale = [0,2,3,5,7,8,10,12,14,15,17,19,20,22,24];

var harpFreq = 0;
var harpFreqDest = 0;

var harmonyInterval;
var harmPlaying = false;
var harmFreq = 1;
var harmFreqDest = 1;
var harmTimer = 0;

var note = minor;
var note2 = minor2;
var note3 = minor3;

var lead8 = [1,0,0,1,1,0,1,0];
var count8 = 0;
var bass8 = [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0];
var bassReset = [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0];
var bassLength = [4,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0];
var currentBassLength = 0;
var countBass = 0;
var monoBass = "";
var bassSelect = 0;
var bassSelectLast = 0;
var bassSelectCount = 0;
var bassHarmVol = 0.2 + Math.random()*0.1;
var bassHarmVolDest = bassHarmVol;

var mainDest = "";

var delayLevel = 0;

var starting = true;
var breaking = false;
var leadBreak = false;

var leadMode = 0;
var leadDir = 1;
var leadStep = 0;
var leadStepCount = 0;

var leadLastNote = 5;
var leadLastOctave = 12;


//-------------------------------------------------------------------------------------------
//  INITIALISE SOUND
//-------------------------------------------------------------------------------------------


function soundSetup() {

 try {
	 window.AudioContext = window.AudioContext||window.webkitAudioContext;
	 acx = new AudioContext();
 }
 catch(e) {
	 alert('Web Audio API non supportato');
 }



 masterGain = 0.23;

 bpm = 110;


 // COMPRESSION / EQ //
 brickWall = acx.createDynamicsCompressor();
 brickWall.connect(acx.destination);
 brickWall.threshold.value = -10;
 brickWall.attack = 0.001;
 brickWall.ratio = 12;


 compressor = acx.createDynamicsCompressor();
 compressor.connect(brickWall);
 compressor.threshold.value = -32;
 compressor.ratio = 20;

 lows = acx.createBiquadFilter();
 lows.type = 3;
 lows.frequency.value = 400;
 lows.gain.value = -7.5;
 lows.connect(compressor);

 mainDest = lows;





 // LEAD //
 leadFilter = acx.createBiquadFilter();
 leadMod = acx.createGain();
 leadEchoFilter  = acx.createBiquadFilter();
 leadPanL = acx.createPanner();
 leadPanR = acx.createPanner();
 leadEchoL = acx.createDelay();
 leadEchoR = acx.createDelay();
 leadGainL = acx.createGain();
 leadGainR = acx.createGain();

 leadFilter.frequency.value = 1100 + (0.2*1000);
 leadEchoFilter.frequency.value = 800 + (0.2*1000);
 leadEchoL.delayTime.value = ((60/bpm)*0.5);
 leadEchoR.delayTime.value = ((60/bpm)*1);
 leadPanL.setPosition(-1,0,0);
 leadPanR.setPosition(1,0,0);
 leadGainL.gain.value = delayLevel*0.8;
 leadGainR.gain.value = delayLevel*0.5;

 leadFilter.connect(leadMod);
 leadMod.connect(mainDest);

 leadEchoFilter.connect(mainDest);
 leadGainL.connect(leadEchoFilter);
 leadGainR.connect(leadEchoFilter);
 leadPanL.connect(leadGainL);
 leadPanR.connect(leadGainR);
 leadEchoL.connect(leadPanL);
 leadEchoR.connect(leadPanR);

 // BASS //
 bassFilter = acx.createBiquadFilter();
 bassFilter2 = acx.createBiquadFilter();

 bassFilter.frequency.value = 1000 + (0.2*1000);
 bassFilter.connect(bassFilter2);

 bassFilter2.connect(mainDest);
 bassFilter2.type = 5;
 bassFilter2.gain.value = (0.2*10);
 bassFilter2.frequency.value = 400;


 // PAN //
 panFilter = acx.createBiquadFilter();
 panFilter.connect(mainDest);
 panFilter.Q.value = 5;
 panFilter.frequency.value = 900 + (0.2*1000);

 panL = acx.createPanner();
 panR = acx.createPanner();
 panL.connect(panFilter);
 panR.connect(panFilter);
 panL.setPosition(-0.01,0,0);
 panR.setPosition(0.01,0,0);

 // HARP //
 harpFilter = acx.createBiquadFilter();
 harpFilter.connect(mainDest);
 harpFilter.frequency.value = 1500 + (0.2*1000);

 harpL = acx.createPanner();
 harpL.connect(harpFilter);
 harpL.setPosition(-0.01,0,0);
 harpR = acx.createPanner();
 harpR.connect(harpFilter);
 harpR.setPosition(0.01,0,0);



 for (i=0;i<6;i++) {

	 harpD[i] = acx.createOscillator();
	 harpG[i] = acx.createGain();
	 harpD[i].connect(harpG[i]);
	 if (i%2==0) {
		 harpG[i].connect(harpL);
	 } else {
		 harpG[i].connect(harpR);
	 }
	 harpD[i].type = 3;
	 harpG[i].gain.value = 0;
	 harpD[i].start(0);
 }


 // HARMONY //
 harmFilter = acx.createBiquadFilter();
 harmFilter.frequency.value = ((800/10)*harmFreq) + (0.2*500);

 holdFilter = acx.createBiquadFilter();
 holdFilter.type = 5;
 holdFilter.gain.value = 5 + harmFreq; // 15

 shelfFilter = acx.createBiquadFilter();
 shelfFilter.type = 3;
 shelfFilter.frequency.value = (700/10)*harmFreq;
 shelfFilter.gain.value = -(10+harmFreq);

 harmBreak = acx.createBiquadFilter();
 harmBreak.frequency.value = 1;

 harmFilter.connect(holdFilter);
 holdFilter.connect(shelfFilter);
 shelfFilter.connect(mainDest);
 harmBreak.connect(mainDest);

 // PADS //
 pad = acx.createOscillator();
 pad2 = acx.createOscillator();
 padPanner = acx.createPanner();
 padPanner2 = acx.createPanner();
 padGain = acx.createGain();
 padFilter = acx.createBiquadFilter();

 pad.connect(padPanner);
 pad2.connect(padPanner2);
 padPanner.connect(padGain);
 padPanner2.connect(padGain);

 padPanner.setPosition(-0.5,0,0);
 padPanner2.setPosition(1,0,0);

 padGain.connect(padFilter);
 padFilter.connect(leadMod);

 padGain.gain.value = 0;
 padFilter.frequency.value = 600;
 pad.type = 1;
 pad2.type = 1;
 pad.start(0);
 pad2.start(0);

 // MODULATE //
 setInterval(function() {

	 var now = acx.currentTime;
	 leadMod.gain.cancelScheduledValues( now );
	 leadMod.gain.setValueAtTime(masterGain*2, now);

	 leadMod.gain.linearRampToValueAtTime(masterGain*1, now+0.09);
	 leadMod.gain.linearRampToValueAtTime(masterGain*2, now+0.18);


 }, 200);

 soundLoop();
 leadFilter.frequency.value =0
 bassFilter.frequency.value=0
}


var paused= false;
//-------------------------------------------------------------------------------------------
//  SEQUENCING LOOP
//-------------------------------------------------------------------------------------------
function soundLoop() {




	 if (paused==false) {

	 playBass();
		 playLead8();
 playHarm();



		 beatCount += 1;
		 if (beatCount==16) {
			 if (firstTime==false) {

				 if (startCounter<100) {
						 startCounter+= 1;
				 }
			 }
			 beatCount = 0;
		 }
		 firstTime = false;
	 }


 setTimeout(soundLoop,((60/bpm)*0.5)*1000);

}

//-------------------------------------------------------------------------------------------
//  ENVELOPE SCHEDULERS
//-------------------------------------------------------------------------------------------


function startTone(mode,length1,o,g,d) {

 d = d || false;
 f = o.frequency.value;

	 var now = acx.currentTime;
	 g.gain.cancelScheduledValues( now );
 o.frequency.cancelScheduledValues( now );
	 g.gain.setValueAtTime(masterGain*0.0, now);
 o.frequency.setValueAtTime(f, now);

 // TINE
 if (mode==1) {
	 g.gain.linearRampToValueAtTime(masterGain*1.1, now + 0.01);
	 g.gain.linearRampToValueAtTime(masterGain*0.6, now + 0.2);
	 g.gain.linearRampToValueAtTime(masterGain*0.1, now + ((60/bpm)*3));
	 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*4.5));

	 length = ((60/bpm)*4.6)*1000;
 }

 // BASS
 else if (mode==3) {
	 g.gain.linearRampToValueAtTime(masterGain*1.1, now + 0.03);
	 g.gain.linearRampToValueAtTime(masterGain*0.5, now + ((60/bpm)*2));

	 if (length1<4) {
		 g.gain.cancelScheduledValues( now + ((60/bpm)*(length1*1)) );
		 g.gain.linearRampToValueAtTime(masterGain*0.35, now + ((60/bpm)*(length1*1.08)));
	 } else {
		 g.gain.linearRampToValueAtTime(masterGain*0.1, now + ((60/bpm)*(length1*1.08)));
	 }
	 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*(length1*1.1)));

	 length = ((60/bpm)*(length1*1.2))*1000;
 }
 // HARMONY
 else if (mode==4) {
	 g.gain.linearRampToValueAtTime(masterGain*0.2, now + 0.5);
	 g.gain.linearRampToValueAtTime(masterGain*0.01, now + ((60/bpm)*5));
	 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*5.5));

	 length = ((60/bpm)*5.6)*1000;
 }



 // PAN
 else if (mode==9) {
	 g.gain.linearRampToValueAtTime(masterGain*1.1, now + 0.05);
	 g.gain.linearRampToValueAtTime(masterGain*0.7, now + ((60/bpm)*0.3));
	 g.gain.linearRampToValueAtTime(masterGain*0.08, now + ((60/bpm)*2.1));
	 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*3));

	 length = ((60/bpm)*3.1)*1000;
 }
 // PAN
 else if (mode==10) {
	 g.gain.linearRampToValueAtTime(masterGain*0.5, now + 0.05);
	 g.gain.linearRampToValueAtTime(masterGain*0.3, now + ((60/bpm)*0.3));
	 g.gain.linearRampToValueAtTime(masterGain*0.05, now + ((60/bpm)*2.1));
	 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*3));

	 length = ((60/bpm)*3.1)*1000;
 }
 // BASS HARMONY
 else if (mode==11) {
	 g.gain.linearRampToValueAtTime(masterGain*(bassHarmVol-(0.2*0.25)), now + ((60/bpm)*2.5));
	 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*5));

	 length = ((60/bpm)*5.05)*1000;
 }


 setTimeout(function(){

			 o.disconnect();
	 if (d==true) {
			 g.disconnect();
	 }
 },length);
}


function startHarp(g,o,f) {
	 var now = acx.currentTime;
	 g.gain.cancelScheduledValues( now );
	 g.gain.setValueAtTime(g.gain.value, now);


 g.gain.linearRampToValueAtTime(masterGain*0.01, now + 0.03);
 g.gain.linearRampToValueAtTime(masterGain*0.6, now + ((60/bpm)*2));
 g.gain.linearRampToValueAtTime(masterGain*0.0, now + ((60/bpm)*4));
}



//-------------------------------------------------------------------------------------------
//  SETUP NOTES TO BE SENT TO ENVELOPES
//-------------------------------------------------------------------------------------------


// ECHO LEAD //
function leadNote(f) {

 oscillator = acx.createOscillator();
 gainNode = acx.createGain();
 leadL = acx.createOscillator();
 lGain = acx.createGain();
 leadR = acx.createOscillator();
 rGain = acx.createGain();


 oscillator.connect(gainNode);
 leadL.connect(lGain);
 leadR.connect(rGain);

 gainNode.connect(leadFilter);
 lGain.connect(leadEchoL);
 rGain.connect(leadEchoR);

 gainNode.gain.value = 0;
 lGain.gain.value = 0;
 rGain.gain.value = 0;

 oscillator.frequency.value = f;
 leadL.frequency.value = f;
 leadR.frequency.value = f;
 oscillator.type = 3; // triangle wave
 leadL.type = 3; // triangle wave
 leadR.type = 3; // triangle wave

 leadGainL.gain.value = delayLevel*0;
 leadGainR.gain.value = delayLevel*0;

 oscillator.start(0);
 leadL.start(0);
 leadR.start(0);

 startTone(1,3500,oscillator,gainNode,true);
 startTone(1,3500,leadL,lGain,true);
 startTone(1,3500,leadR,rGain,true);
}

// BASS //
function bassNote(f,f2,f3,f4,bl) {
 currentBassLength = bl;

 bass = acx.createOscillator();
 subBass = acx.createOscillator();
 bassHarm =  acx.createOscillator();
 bassHarm2 =  acx.createOscillator();
 gainNode = acx.createGain();
 bassHarmGain = acx.createGain();
 bassPre = acx.createGain();

 bass.connect(bassPre);

 bassPre.connect(gainNode);
 subBass.connect(gainNode);
 bassHarm.connect(bassHarmGain);
 bassHarm2.connect(bassHarmGain);
 gainNode.connect(bassFilter);
 bassHarmGain.connect(bassFilter);
 gainNode.gain.value = 0;
 bassPre.gain.value = 0.3;
 bassHarmGain.gain.value = 0;

 bass.frequency.value = f;
 bass.type = 1; // triangle wave

 subBass.frequency.value = f2;
 subBass.type = 3; // triangle wave

 bassHarm.frequency.value = f3;
 bassHarm.type = 0; // triangle wave

 bassHarm2.frequency.value = f4;
 bassHarm2.type = 1; // triangle wave

 bass.start(0);
 subBass.start(0);
 bassHarm.start(0);
 bassHarm2.start(0);

 startTone(3,bl,bass,gainNode);
 startTone(3,bl,subBass,gainNode,true);
 startTone(11,bl,bassHarm,bassHarmGain);
 startTone(11,bl,bassHarm2,bassHarmGain,true);
 monoBass = gainNode;
}

// DRAG HARMONY //
function harmNote(f) {
 harm = acx.createOscillator();
 harm2 = acx.createOscillator();
 harmGain = acx.createGain();
 harmPan = acx.createPanner();

 harm.connect(harmGain);
 harm2.connect(harmPan);
 harmPan.connect(harmGain);
 harmGain.connect(harmFilter);
 harmGain.gain.value = 0;

 harmPan.setPosition(-1,0,0);
 harm.frequency.value = f;
 harm2.frequency.value = f;
 harm.type = 1; // triangle wave
 harm2.type = 2; // triangle wave

 harm.start(0);
 harm2.start(0);
 harmPlaying = true;
 startTone(4,3500,harm,harmGain);
 startTone(4,3500,harm2,harmGain,true);
}

// PAN SYNTH //
function panNote(f,n,p) {

 panOsc = acx.createOscillator();
 panG[p] = acx.createGain();
 panOsc.connect(panG[p]);
 panG[p].connect(panFilter);
 panG[p].gain.value = 0;

 panOsc.frequency.value = f;
 panOsc.type = 3; // square wave

 panOsc2 = acx.createOscillator(); // harmonic
 panG2 = acx.createGain();
 panOsc2.connect(panG2);
 panG2.connect(panR);
 panG2.gain.value = 0;

 panOsc2.frequency.value = n-3;
 panOsc2.type = 0; // square wave

 panOsc3 = acx.createOscillator();
 panEcho = acx.createDelay();
 panG3 = acx.createGain();
 panOsc3.connect(panG3);
 panG3.connect(panEcho);
 panEcho.connect(panFilter);
 panG3.gain.value = 0;

 panOsc3.frequency.value = f+2;
 panOsc3.type = 3; // square wave

 panEcho.delayTime.value = ((60/bpm)*0);

 panOsc.start(0);
 startTone(9,1500,panOsc,panG[p],true);

 panOsc2.start(0);
 startTone(10,1500,panOsc2,panG2,true);

 panOsc3.start(0);
 startTone(9,1500,panOsc3,panG3,true);
}

function harpLoop() {
 if (harpN!==-10) {
	 harpD[harpCount].frequency.value = harpFreq+(harpCount*2);
	 startHarp(harpG[harpCount],harpD[harpCount],harpFreq);
	 harpCount += 1;
	 if (harpCount==6) {
		 harpCount = 0;
	 }
 }
}


//-------------------------------------------------------------------------------------------
//  PROCEDURAL ALGORHYTHMS
//-------------------------------------------------------------------------------------------

function playLead8() {

  		gyro.startTracking(function(o) {
  			var b = document.getElementById('example'),
  					f = document.getElementById('features');
  			f.innerHTML = gyro.getFeatures();
  			b.innerHTML = "<p> x = " + o.x + "</p>" +
  										"<p> y = " + o.y + "</p>" +
  										"<p> z = " + o.z + "</p>"  ;

                      if(o.y>0){
                        var a=o.y*1000
                        var b=o.x*500
      leadFilter.frequency.value =a
      bassFilter.frequency.value =a
    }
    else{
      leadFilter.frequency.value =0
      bassFilter.frequency.value=0

    }
    if(o.x>0){
    leadEchoFilter.frequency.value=o.x*140
     }
  		});



 if (lead8[count8]==1) {

	 // SWITCH MODE
	 if (leadStepCount==leadStep) { //end of segment



			 if (leadMode==1) {

			 leadStep = 1 + Math.floor(Math.random()*5);
		 } else {
			 leadStep = 1 + Math.floor(Math.random()*2);
		 }



		 leadDir = -leadDir;
		 modeSelect = Math.floor(Math.random()*15); // DICEROLL





		 if (modeSelect<6) {
			 leadMode = 3; // JUMP
		 }



		 if (modeSelect>5 && modeSelect<8) {
			 leadMode = 1; // TRI
			 if (leadLastOctave==0) {
				 leadLastNote = 5 + Math.floor(Math.random()*3);
				 leadDir = 1;
			 }
		 }




		 if (modeSelect>7) {
			 leadMode = 1; // STEP
			 if (leadLastOctave==0) {
				 leadLastNote = 5 + Math.floor(Math.random()*3);
				 leadDir = 1;
			 }
		 }

		 leadStepCount = 0;
	 }
	 leadStepCount += 1;


	 // NOTE FROM MODE
	 if (leadMode==1) { // STEP

			 thisScale = note3;
			 thisOctave = leadLastOctave;

		 if (leadDir==1) { // UP
			 thisRand = leadLastNote += 1;
		 } else { // DOWN
			 thisRand = leadLastNote -= 1;
		 }

		 // RANGE
		 if (thisRand>1 && thisOctave==36) {
			 thisRand = 7;
			 thisOctave -= 12;
			 leadDir = -leadDir;
			 leadStepCount = 0;
		 }




		 if (thisRand<0) {
			 if (thisOctave>0) { // SHIFT OCTAVE
				 thisRand = 6;
				 thisOctave -= 12;
			 }


				else { // CHANGE DIR
				 thisRand = 1;
				 leadDir = -leadDir;
				 leadStepCount = 0;
			 }
		 }





		 if (thisRand>7) {
			 if (thisOctave<36) { // SHIFT OCTAVE
				 thisRand = 1;
				 thisOctave += 12;
			 } else { // CHANGE DIR
				 thisRand = 6;
				 leadDir = -leadDir;
				 leadStepCount = 0;
			 }
		 }






	 } else if (leadMode==2) { // TRI

			 thisScale = note;
			 thisOctave = leadLastOctave;

		 if (leadDir==1) { // UP
			 thisRand = leadLastNote += 2;
		 } else { // DOWN
			 thisRand = leadLastNote -= 2;
		 }

		 // RANGE
		 if (thisRand<0) {
			 if (thisOctave>0) { // SHIFT OCTAVE
				 thisRand = 6;
				 thisOctave -= 12;
			 } else { // CHANGE DIR
				 thisRand = 1;
				 leadDir = -leadDir;
				 leadStepCount = 0;
			 }
		 }
		 if (thisRand>7) {
			 if (thisOctave<24) { // SHIFT OCTAVE
				 thisRand = 0;
				 thisOctave += 12;
			 } else { // CHANGE DIR
				 thisRand = 6;
				 leadDir = -leadDir;
				 leadStepCount = 0;
			 }
		 }

	 } else if (leadMode==3) { // JUMP

			 thisScale = note;
			 thisOctave = (Math.round(Math.random()*2))*12;
			 thisRand = Math.floor(Math.random()*8);

	 }
	 leadLastNote = thisRand;
	 leadLastOctave = thisOctave;

	 // DO NOTE
		 thisKey = midC -13;
	 if (starting==true||leadBreak==true) {
		 thisRand = 5;
		 starting = false;
	 }
		 thisInt = thisKey + thisOctave + thisScale[thisRand];
	 freq = Math.pow(2,(thisInt/12))*440;
	 leadNote(freq);


 }

 // END BAR RESET
 count8 += 1;
 if (count8==8) {
	 count8 = 0;

	 leadBreakEnd = Math.floor(Math.random()*1); // potentially end break section
	 if (leadBreakEnd==0) {
			 leadBreak = false;
	 }


	 for (i=0;i<7;i+=2) {
		 lead8[i] = 1; // reset bar
		 lead8[i+1] = 0;

		 restRoll = Math.floor(Math.random()*4); // rests
		 if (restRoll==0) {
			 lead8[i] = 0;
		 }
		 if (leadMode==1) {
			 sixteenRoll = Math.floor(Math.random()*4); // 16th beats
		 } else {
			 sixteenRoll = Math.floor(Math.random()*5); // 16th beats
		 }

		 if (sixteenRoll==0) {
			 lead8[i+1] = 1;
		 }

	 }


	 if (leadBreak==true) { // each break bar

			 for (i=0;i<8;i++) {
					 lead8[i] = 0;
		 }
		 }

	 leadBreakRoll = Math.floor(Math.random()*8); // lead break start
	 if (leadBreakRoll==0) {
		 leadBreak = true;

		 for (i=0;i<8;i++) {
					 lead8[i] = 0;
		 }
		 lead8[0] = 1;
	 }


 }
}

function playBass() {

 if (bass8[countBass]==1) {

		 // CHOOSE & PLAY NOTE //
		 thisKey = midC -25;
	 thisOctave = 0;
	 bassSelect = Math.floor(Math.random()*8);

	 if (bassSelect==bassSelectLast && bassSelect!==1) {
		 bassSelectCount += 1;
		 if (bassSelectCount==1) { // have another go on repeat
			 bassSelect = Math.floor(Math.random()*8);
		 } else {
			 while (bassSelect==bassSelectLast) { // force different note after 2 repeats
				 bassSelect = Math.floor(Math.random()*8);
			 }
			 bassSelectCount = 0;
		 }
	 } else {
		 bassSelectCount = 0;
	 }

	 if (starting==true||breaking==true) {
		 bassSelect = 1;
		 //starting = false;
	 }
	 harmPicker = Math.floor(Math.random()*2);
	 if (harmPicker==0) {
		 thisInt2  = thisKey + (thisOctave) + fifth[bassSelect];
	 } else if (harmPicker==1) {
		 thisInt2  = thisKey + (thisOctave) + harmony[bassSelect];
	 } else {
		 thisInt2  = thisKey + (thisOctave) + note2[bassSelect];
	 }

		 thisInt = thisKey + thisOctave + note2[bassSelect];
	 thisInt2  = thisKey + (thisOctave) + harmony[bassSelect];
	 thisInt3  = thisKey + (thisOctave) + fifth[bassSelect];
	 freq = Math.pow(2,(thisInt/12))*440;
	 freq2 = Math.pow(2,((thisInt+12)/12))*440;
	 freq3 = Math.pow(2,((thisInt2+24)/12))*440;
	 freq4 = Math.pow(2,((thisInt3+24)/12))*440;
	 bassNote(freq,freq,freq,freq,bassLength[countBass]);
	 bassSelectLast = bassSelect;
 }

 countBass += 1;
 if (countBass==16) { // END OF BAR RESET
	 countBass = 0;

	 breakEnd = Math.floor(Math.random()*2); // potentially end break section
	 if (breakEnd==0) {
			 breaking = false;
		 harmFreqDest = 10;
	 }

	 // RHYTHM //

	 if (breaking==false) {
		 for (i=0;i<16;i++) {
			 bass8[i] = bassReset[i]; // EVERY 4 BEATS
		 }

		 for (i=0;i<7;i+=8) {

			 restRoll = Math.floor(Math.random()*20); // rests
			 if (restRoll==0) {
				 bass8[i] = 0;
			 }

			 sixteenRoll = Math.floor(Math.random()*2); // 16th beats
			 if (sixteenRoll==0) {

				 delayRoll  = Math.floor(Math.random()*8);
				 if (delayRoll==0) {
					 bass8[i+6] = 1;
				 } else {
					 bass8[i+4] = 1;
				 }

			 }
		 }

		 // TIMING FINISHED, SET NOTE LENGTH

		 for (i=0;i<16;i++) {
			 if (i==0||i==8) {
				 bassLength[i] = 4;
				 if (bass8[i+4]==1) { // if 4 beats long
					 bassLength[i] = 2;
				 }
				 if (bass8[i+6]==1) { // if 6 beats long
					 bassLength[i] = 3;
				 }
			 }
			 if (i==4||i==12) {
				 bassLength[i] = 2;
				 if (bass8[i+4]==0) {
					 bassLength[i] = 4; // can extend to 8 beats long
				 }
			 }
			 if (i==6) {
				 bassLength[i] = 1;
				 if (bass8[i+2]==0) {
					 bassLength[i] = 3; // can extend to 6 beats long
				 }
			 }
			 if (i==14) {
				 bassLength[i] = 3;
			 }

		 }
	 }

	 if (breaking==true) { // each break bar

			 for (i=0;i<16;i++) {
					 bass8[i] = 0;
		 }
		 }

	 if (startCounter>10) { // from bar 12
		 breakRoll = Math.floor(Math.random()*16); // bass break start
		 if (breakRoll==0) {
			 breaking = true;
			 harmFreqDest = 6;
			 for (i=0;i<16;i++) {
				 bass8[i] = 0;
			 }
			 bass8[0] = 1;
		 }
	 }

	 harmVolRoll = Math.floor(Math.random()*3); // harmony volume
	 if (harmVolRoll==0) {
		 bassHarmVolDest = 0.05 + Math.random()*0.3;
	 }

 }
}


function playHarm() {
 if (beatCount==3|| beatCount==15) {



		 thisKey = midC -1;
		 thisOctave = 0;
		 thisInt = thisKey + thisOctave + harmony[bassSelect];
		 freq = Math.pow(2,(thisInt/12))*440;
		 harmNote(freq);


 }

}


for (i=0;i<7;i++) {
 if (panOver[i]==true) {
	 panOn[i] = true;
	 panPlay(i);
 }
}
function panPlay(p) {
 clearTimeout(panTimer[p]);

 thisKey = midC + 11;
 thisInt = thisKey + panScale[p];
 thisInt2 = thisKey - 12 + panHarm[p];
 freq = Math.pow(2,(thisInt/12))*440;
 freq2 = Math.pow(2,(thisInt2/12))*440;
 panNote(freq,freq2,p);


 panTimer[p] = setTimeout(function(){
			 panOn[p] = false;
 },((60/bpm)*2.6)*1000);
}

function harpSetFreq(p) {
 thisKey = midC + 11;
 thisInt = thisKey + harpScale[p];
 thisInt2 = thisKey - 12 + harpScale[p];
 freq = Math.pow(2,(thisInt/12))*440;
 freq2 = Math.pow(2,(thisInt2/12))*440;
 harpFreqDest = freq;
 harpFreq = freq;
 harpD[harpCount].frequency.value = harpFreq;
}

//-------------------------------------------------------------------------------------------
//  SILENT START NOTE FOR DEVICES
//-------------------------------------------------------------------------------------------


function silentNote() {
 silence = acx.createOscillator();
 silenceGain = acx.createGain();
 silence.connect(silenceGain);
 silenceGain.connect(mainDest);
 silenceGain.gain.value = 0;
 silence.start(0);

 setTimeout(function(){

			 silence.disconnect(); // Disconnect oscillator so it can be picked up by browser's garbage collecter
	 silenceGain.disconnect();

 },1000);
}
// JavaScript Document
//-------------------------------------------------------------------------------------------
