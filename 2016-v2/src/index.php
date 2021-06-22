<?php
function getIndex()
{
	$main = [
		'zh' => [
			'headerBtn' => [
				['text'=>'Youtube直播頻道','href'=>'https://www.youtube.com/c/MopconOrg/live','target'=>'blank'],
			],
			'footerBtn' => [
				['text'=>'KKTIX 議程徵稿','href'=>'http://mopcon.kktix.cc/events/mopcon2016-cfp','target'=>'_blank'],
				['text'=>'講者募集','href'=>'cfp.php','target'=>''],
				
			],
			'list' => [
	        	[
	        		'header' => '精神',
	        		'desc' => '行動科技的進步，開拓一條連結創意和生產力的路徑，帶領我們進入一個充滿無限可能的新境界。<br/>
	              
		            	自智慧型手機與穿戴式裝置普及以來，各類如社交、地理資訊、拍照、攝影、共享經濟、行動支付等「軟應用」，紀錄著使用者的生活足跡，眾多世界級科技公司透過手環、手錶、居家感應、醫療收集等「硬載體」，試圖無接縫地收集使用者每分每秒的動態。<br/>
		              
		            	在這個資料為王的時代，「軟應用」與「硬載體」正在把每個人納入數據洪流之中，行動科技將是獲取使用者資料的最後一哩，也正是 MOPCON（Mobile / Open / Platform CONference） 專精探討的主軸！<br/>
		                    
		              	MOPCON「行動科技年會」，今年度將以 "Connect Everything"。作為主要精神意涵。'
	        	],
	        	[
	        		'header' => '議程',
	        		'desc' => '本屆議程重心除行動開發技術、服務營運、數位內容三大主軸之外，將更廣泛涵蓋雲端運算、穿戴應用、VR 虛擬實境、AR 擴增實境、物聯網應用與基於 HTML5 的可攜式跨裝置應用等相關議題，以真實運作的案例，向與會者做第一手的探討與分享，促進更多優秀開發者項目的成熟與發展。'
	        	],
	        ],
    	],
		'en' => [
			'headerBtn' => [
				['text'=>'sign up','href'=>'http://mopcon.kktix.cc/events/2016-registration?utm_source=web&utm_medium=site-pv&utm_campaign=ticket','target'=>'_blank'],
			],
			'footerBtn' => [
				['text'=>'Call for Presentation','href'=>'http://mopcon.kktix.cc/events/mopcon2016-cfp-eng','target'=>'_blank'],
				
			],
			'list' => [
				[
					'header' => 'Spirit of MOPCON',
					'desc' => 'In this data-oriented era, we are unconsciously drawn into the "data torrent" by software applications and hardware payloads. The last mile of data collection will be Mobile Technologies -- the ultimate idea and the topics that Mobile/Open/Platform Conference ( MOPCON) called for.<br/><br />

						"Connect Everything" will be the main spirit of MOPCON this year. Besides the main schemes of mobile developing technologies, service operations and digital contents, more topics will be covered incuding cloud computing, wearable applications, virtual reality, augmentated reality, internet of things and HTML5-based cross-device applicaions in the conference, whereas the presenters will facilitate maturing developers and their future progression.',
					],
			],

		],
	];
	return getI18n($main);
}