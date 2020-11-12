
class SignInFormData {
    get validationErrors(): { emailOrPasswordIncorrect: string, phoneNumberOrPasswordIncorrect: string, passwordYouEnteredIncorrect: string }  {
        return {
            passwordYouEnteredIncorrect: "The password you entered was incorrect. Please try again.",
            emailOrPasswordIncorrect: "Email or password incorrect. Please try again.",
            phoneNumberOrPasswordIncorrect: "Phone number or password incorrect."
        }
    }

    get authMethods(): { email: string, phone: string } {
        return {
            email: "Sign in with email",
            phone: "Sign in with phone number"
        }
    }

    randomCountry(): { dialCode: string, countryCode: string, countryName: string } {
        const list = [
            {"dialCode":"1","countryCode":"us","countryName":"United States"},
            {"dialCode":"44","countryCode":"gb","countryName":"United Kingdom"},
            {"dialCode":"93","countryCode":"af","countryName":"Afghanistan (‫افغانستان‬‎)"},
            {"dialCode":"355","countryCode":"al","countryName":"Albania (Shqipëri)"},
            {"dialCode":"213","countryCode":"dz","countryName":"Algeria (‫الجزائر‬‎)"},
            {"dialCode":"1684","countryCode":"as","countryName":"American Samoa"},
            {"dialCode":"376","countryCode":"ad","countryName":"Andorra"},
            {"dialCode":"244","countryCode":"ao","countryName":"Angola"},
            {"dialCode":"1264","countryCode":"ai","countryName":"Anguilla"},
            {"dialCode":"1268","countryCode":"ag","countryName":"Antigua and Barbuda"},
            {"dialCode":"54","countryCode":"ar","countryName":"Argentina"},
            {"dialCode":"374","countryCode":"am","countryName":"Armenia (Հայաստան)"},
            {"dialCode":"297","countryCode":"aw","countryName":"Aruba"},
            {"dialCode":"61","countryCode":"au","countryName":"Australia"},
            {"dialCode":"43","countryCode":"at","countryName":"Austria (Österreich)"},
            {"dialCode":"994","countryCode":"az","countryName":"Azerbaijan (Azərbaycan)"},
            {"dialCode":"1242","countryCode":"bs","countryName":"Bahamas"},
            {"dialCode":"973","countryCode":"bh","countryName":"Bahrain (‫البحرين‬‎)"},
            {"dialCode":"880","countryCode":"bd","countryName":"Bangladesh (বাংলাদেশ)"},
            {"dialCode":"1246","countryCode":"bb","countryName":"Barbados"},
            {"dialCode":"375","countryCode":"by","countryName":"Belarus (Беларусь)"},
            {"dialCode":"32","countryCode":"be","countryName":"Belgium (België)"},
            {"dialCode":"501","countryCode":"bz","countryName":"Belize"},
            {"dialCode":"229","countryCode":"bj","countryName":"Benin (Bénin)"},
            {"dialCode":"1441","countryCode":"bm","countryName":"Bermuda"},
            {"dialCode":"975","countryCode":"bt","countryName":"Bhutan (འབྲུག)"},
            {"dialCode":"591","countryCode":"bo","countryName":"Bolivia"},
            {"dialCode":"387","countryCode":"ba","countryName":"Bosnia and Herzegovina (Босна и Херцеговина)"},
            {"dialCode":"267","countryCode":"bw","countryName":"Botswana"},
            {"dialCode":"55","countryCode":"br","countryName":"Brazil (Brasil)"},
            {"dialCode":"246","countryCode":"io","countryName":"British Indian Ocean Territory"},
            {"dialCode":"1284","countryCode":"vg","countryName":"British Virgin Islands"},
            {"dialCode":"673","countryCode":"bn","countryName":"Brunei"},
            {"dialCode":"359","countryCode":"bg","countryName":"Bulgaria (България)"},
            {"dialCode":"226","countryCode":"bf","countryName":"Burkina Faso"},
            {"dialCode":"257","countryCode":"bi","countryName":"Burundi (Uburundi)"},
            {"dialCode":"855","countryCode":"kh","countryName":"Cambodia (កម្ពុជា)"},
            {"dialCode":"237","countryCode":"cm","countryName":"Cameroon (Cameroun)"},
            {"dialCode":"1","countryCode":"ca","countryName":"Canada"},
            {"dialCode":"238","countryCode":"cv","countryName":"Cape Verde (Kabu Verdi)"},
            {"dialCode":"599","countryCode":"bq","countryName":"Caribbean Netherlands"},
            {"dialCode":"1345","countryCode":"ky","countryName":"Cayman Islands"},{"dialCode":"236","countryCode":"cf","countryName":"Central African Republic (République centrafricaine)"},{"dialCode":"235","countryCode":"td","countryName":"Chad (Tchad)"},{"dialCode":"56","countryCode":"cl","countryName":"Chile"},{"dialCode":"86","countryCode":"cn","countryName":"China (中国)"},{"dialCode":"61","countryCode":"cx","countryName":"Christmas Island"},{"dialCode":"61","countryCode":"cc","countryName":"Cocos (Keeling) Islands"},{"dialCode":"57","countryCode":"co","countryName":"Colombia"},{"dialCode":"269","countryCode":"km","countryName":"Comoros (‫جزر القمر‬‎)"},{"dialCode":"243","countryCode":"cd","countryName":"Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)"},{"dialCode":"242","countryCode":"cg","countryName":"Congo (Republic) (Congo-Brazzaville)"},{"dialCode":"682","countryCode":"ck","countryName":"Cook Islands"},{"dialCode":"506","countryCode":"cr","countryName":"Costa Rica"},{"dialCode":"225","countryCode":"ci","countryName":"Côte d’Ivoire"},{"dialCode":"385","countryCode":"hr","countryName":"Croatia (Hrvatska)"},{"dialCode":"53","countryCode":"cu","countryName":"Cuba"},{"dialCode":"599","countryCode":"cw","countryName":"Curaçao"},{"dialCode":"357","countryCode":"cy","countryName":"Cyprus (Κύπρος)"},{"dialCode":"420","countryCode":"cz","countryName":"Czech Republic (Česká republika)"},{"dialCode":"45","countryCode":"dk","countryName":"Denmark (Danmark)"},{"dialCode":"253","countryCode":"dj","countryName":"Djibouti"},{"dialCode":"1767","countryCode":"dm","countryName":"Dominica"},{"dialCode":"1","countryCode":"do","countryName":"Dominican Republic (República Dominicana)"},{"dialCode":"593","countryCode":"ec","countryName":"Ecuador"},{"dialCode":"20","countryCode":"eg","countryName":"Egypt (‫مصر‬‎)"},{"dialCode":"503","countryCode":"sv","countryName":"El Salvador"},{"dialCode":"240","countryCode":"gq","countryName":"Equatorial Guinea (Guinea Ecuatorial)"},{"dialCode":"291","countryCode":"er","countryName":"Eritrea"},{"dialCode":"372","countryCode":"ee","countryName":"Estonia (Eesti)"},{"dialCode":"251","countryCode":"et","countryName":"Ethiopia"},{"dialCode":"500","countryCode":"fk","countryName":"Falkland Islands (Islas Malvinas)"},{"dialCode":"298","countryCode":"fo","countryName":"Faroe Islands (Føroyar)"},{"dialCode":"679","countryCode":"fj","countryName":"Fiji"},{"dialCode":"358","countryCode":"fi","countryName":"Finland (Suomi)"},{"dialCode":"33","countryCode":"fr","countryName":"France"},{"dialCode":"594","countryCode":"gf","countryName":"French Guiana (Guyane française)"},{"dialCode":"689","countryCode":"pf","countryName":"French Polynesia (Polynésie française)"},{"dialCode":"241","countryCode":"ga","countryName":"Gabon"},{"dialCode":"220","countryCode":"gm","countryName":"Gambia"},{"dialCode":"995","countryCode":"ge","countryName":"Georgia (საქართველო)"},{"dialCode":"49","countryCode":"de","countryName":"Germany (Deutschland)"},{"dialCode":"233","countryCode":"gh","countryName":"Ghana (Gaana)"},{"dialCode":"350","countryCode":"gi","countryName":"Gibraltar"},{"dialCode":"30","countryCode":"gr","countryName":"Greece (Ελλάδα)"},{"dialCode":"299","countryCode":"gl","countryName":"Greenland (Kalaallit Nunaat)"},{"dialCode":"1473","countryCode":"gd","countryName":"Grenada"},{"dialCode":"590","countryCode":"gp","countryName":"Guadeloupe"},{"dialCode":"1671","countryCode":"gu","countryName":"Guam"},{"dialCode":"502","countryCode":"gt","countryName":"Guatemala"},{"dialCode":"44","countryCode":"gg","countryName":"Guernsey"},{"dialCode":"224","countryCode":"gn","countryName":"Guinea (Guinée)"},{"dialCode":"245","countryCode":"gw","countryName":"Guinea-Bissau (Guiné Bissau)"},{"dialCode":"592","countryCode":"gy","countryName":"Guyana"},{"dialCode":"509","countryCode":"ht","countryName":"Haiti"},{"dialCode":"504","countryCode":"hn","countryName":"Honduras"},{"dialCode":"852","countryCode":"hk","countryName":"Hong Kong (香港)"},{"dialCode":"36","countryCode":"hu","countryName":"Hungary (Magyarország)"},{"dialCode":"354","countryCode":"is","countryName":"Iceland (Ísland)"},{"dialCode":"91","countryCode":"in","countryName":"India (भारत)"},{"dialCode":"62","countryCode":"id","countryName":"Indonesia"},{"dialCode":"98","countryCode":"ir","countryName":"Iran (‫ایران‬‎)"},{"dialCode":"964","countryCode":"iq","countryName":"Iraq (‫العراق‬‎)"},{"dialCode":"353","countryCode":"ie","countryName":"Ireland"},{"dialCode":"44","countryCode":"im","countryName":"Isle of Man"},{"dialCode":"972","countryCode":"il","countryName":"Israel (‫ישראל‬‎)"},{"dialCode":"39","countryCode":"it","countryName":"Italy (Italia)"},{"dialCode":"1","countryCode":"jm","countryName":"Jamaica"},{"dialCode":"81","countryCode":"jp","countryName":"Japan (日本)"},{"dialCode":"44","countryCode":"je","countryName":"Jersey"},{"dialCode":"962","countryCode":"jo","countryName":"Jordan (‫الأردن‬‎)"},{"dialCode":"7","countryCode":"kz","countryName":"Kazakhstan (Казахстан)"},{"dialCode":"254","countryCode":"ke","countryName":"Kenya"},{"dialCode":"686","countryCode":"ki","countryName":"Kiribati"},{"dialCode":"383","countryCode":"xk","countryName":"Kosovo"},{"dialCode":"965","countryCode":"kw","countryName":"Kuwait (‫الكويت‬‎)"},{"dialCode":"996","countryCode":"kg","countryName":"Kyrgyzstan (Кыргызстан)"},{"dialCode":"856","countryCode":"la","countryName":"Laos (ລາວ)"},{"dialCode":"371","countryCode":"lv","countryName":"Latvia (Latvija)"},{"dialCode":"961","countryCode":"lb","countryName":"Lebanon (‫لبنان‬‎)"},{"dialCode":"266","countryCode":"ls","countryName":"Lesotho"},{"dialCode":"231","countryCode":"lr","countryName":"Liberia"},{"dialCode":"218","countryCode":"ly","countryName":"Libya (‫ليبيا‬‎)"},{"dialCode":"423","countryCode":"li","countryName":"Liechtenstein"},{"dialCode":"370","countryCode":"lt","countryName":"Lithuania (Lietuva)"},{"dialCode":"352","countryCode":"lu","countryName":"Luxembourg"},{"dialCode":"853","countryCode":"mo","countryName":"Macau (澳門)"},{"dialCode":"389","countryCode":"mk","countryName":"Macedonia (FYROM) (Македонија)"},{"dialCode":"261","countryCode":"mg","countryName":"Madagascar (Madagasikara)"},{"dialCode":"265","countryCode":"mw","countryName":"Malawi"},{"dialCode":"60","countryCode":"my","countryName":"Malaysia"},{"dialCode":"960","countryCode":"mv","countryName":"Maldives"},{"dialCode":"223","countryCode":"ml","countryName":"Mali"},{"dialCode":"356","countryCode":"mt","countryName":"Malta"},{"dialCode":"692","countryCode":"mh","countryName":"Marshall Islands"},{"dialCode":"596","countryCode":"mq","countryName":"Martinique"},{"dialCode":"222","countryCode":"mr","countryName":"Mauritania (‫موريتانيا‬‎)"},{"dialCode":"230","countryCode":"mu","countryName":"Mauritius (Moris)"},{"dialCode":"262","countryCode":"yt","countryName":"Mayotte"},{"dialCode":"52","countryCode":"mx","countryName":"Mexico (México)"},{"dialCode":"691","countryCode":"fm","countryName":"Micronesia"},{"dialCode":"373","countryCode":"md","countryName":"Moldova (Republica Moldova)"},{"dialCode":"377","countryCode":"mc","countryName":"Monaco"},{"dialCode":"976","countryCode":"mn","countryName":"Mongolia (Монгол)"},{"dialCode":"382","countryCode":"me","countryName":"Montenegro (Crna Gora)"},{"dialCode":"1664","countryCode":"ms","countryName":"Montserrat"},{"dialCode":"212","countryCode":"ma","countryName":"Morocco (‫المغرب‬‎)"},{"dialCode":"258","countryCode":"mz","countryName":"Mozambique (Moçambique)"},{"dialCode":"95","countryCode":"mm","countryName":"Myanmar (Burma) (မြန်မာ)"},{"dialCode":"264","countryCode":"na","countryName":"Namibia (Namibië)"},{"dialCode":"674","countryCode":"nr","countryName":"Nauru"},{"dialCode":"977","countryCode":"np","countryName":"Nepal (नेपाल)"},{"dialCode":"31","countryCode":"nl","countryName":"Netherlands (Nederland)"},{"dialCode":"687","countryCode":"nc","countryName":"New Caledonia (Nouvelle-Calédonie)"},{"dialCode":"64","countryCode":"nz","countryName":"New Zealand"},{"dialCode":"505","countryCode":"ni","countryName":"Nicaragua"},{"dialCode":"227","countryCode":"ne","countryName":"Niger (Nijar)"},{"dialCode":"234","countryCode":"ng","countryName":"Nigeria"},{"dialCode":"683","countryCode":"nu","countryName":"Niue"},{"dialCode":"672","countryCode":"nf","countryName":"Norfolk Island"},{"dialCode":"850","countryCode":"kp","countryName":"North Korea (조선 민주주의 인민 공화국)"},{"dialCode":"1670","countryCode":"mp","countryName":"Northern Mariana Islands"},{"dialCode":"47","countryCode":"no","countryName":"Norway (Norge)"},{"dialCode":"968","countryCode":"om","countryName":"Oman (‫عُمان‬‎)"},{"dialCode":"92","countryCode":"pk","countryName":"Pakistan (‫پاکستان‬‎)"},{"dialCode":"680","countryCode":"pw","countryName":"Palau"},{"dialCode":"970","countryCode":"ps","countryName":"Palestine (‫فلسطين‬‎)"},{"dialCode":"507","countryCode":"pa","countryName":"Panama (Panamá)"},{"dialCode":"675","countryCode":"pg","countryName":"Papua New Guinea"},{"dialCode":"595","countryCode":"py","countryName":"Paraguay"},{"dialCode":"51","countryCode":"pe","countryName":"Peru (Perú)"},{"dialCode":"63","countryCode":"ph","countryName":"Philippines"},{"dialCode":"48","countryCode":"pl","countryName":"Poland (Polska)"},{"dialCode":"351","countryCode":"pt","countryName":"Portugal"},{"dialCode":"1","countryCode":"pr","countryName":"Puerto Rico"},{"dialCode":"974","countryCode":"qa","countryName":"Qatar (‫قطر‬‎)"},{"dialCode":"262","countryCode":"re","countryName":"Réunion (La Réunion)"},{"dialCode":"40","countryCode":"ro","countryName":"Romania (România)"},{"dialCode":"7","countryCode":"ru","countryName":"Russia (Россия)"},{"dialCode":"250","countryCode":"rw","countryName":"Rwanda"},{"dialCode":"590","countryCode":"bl","countryName":"Saint Barthélemy"},{"dialCode":"290","countryCode":"sh","countryName":"Saint Helena"},{"dialCode":"1869","countryCode":"kn","countryName":"Saint Kitts and Nevis"},{"dialCode":"1758","countryCode":"lc","countryName":"Saint Lucia"},{"dialCode":"590","countryCode":"mf","countryName":"Saint Martin (Saint-Martin (partie française))"},{"dialCode":"508","countryCode":"pm","countryName":"Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)"},{"dialCode":"1784","countryCode":"vc","countryName":"Saint Vincent and the Grenadines"},{"dialCode":"685","countryCode":"ws","countryName":"Samoa"},{"dialCode":"378","countryCode":"sm","countryName":"San Marino"},{"dialCode":"239","countryCode":"st","countryName":"São Tomé and Príncipe (São Tomé e Príncipe)"},{"dialCode":"966","countryCode":"sa","countryName":"Saudi Arabia (‫المملكة العربية السعودية‬‎)"},{"dialCode":"221","countryCode":"sn","countryName":"Senegal (Sénégal)"},{"dialCode":"381","countryCode":"rs","countryName":"Serbia (Србија)"},{"dialCode":"248","countryCode":"sc","countryName":"Seychelles"},{"dialCode":"232","countryCode":"sl","countryName":"Sierra Leone"},{"dialCode":"65","countryCode":"sg","countryName":"Singapore"},{"dialCode":"1721","countryCode":"sx","countryName":"Sint Maarten"},{"dialCode":"421","countryCode":"sk","countryName":"Slovakia (Slovensko)"},{"dialCode":"386","countryCode":"si","countryName":"Slovenia (Slovenija)"},{"dialCode":"677","countryCode":"sb","countryName":"Solomon Islands"},{"dialCode":"252","countryCode":"so","countryName":"Somalia (Soomaaliya)"},{"dialCode":"27","countryCode":"za","countryName":"South Africa"},{"dialCode":"82","countryCode":"kr","countryName":"South Korea (대한민국)"},{"dialCode":"211","countryCode":"ss","countryName":"South Sudan (‫جنوب السودان‬‎)"},{"dialCode":"34","countryCode":"es","countryName":"Spain (España)"},{"dialCode":"94","countryCode":"lk","countryName":"Sri Lanka (ශ්‍රී ලංකාව)"},{"dialCode":"249","countryCode":"sd","countryName":"Sudan (‫السودان‬‎)"},{"dialCode":"597","countryCode":"sr","countryName":"Suriname"},{"dialCode":"47","countryCode":"sj","countryName":"Svalbard and Jan Mayen"},{"dialCode":"268","countryCode":"sz","countryName":"Swaziland"},{"dialCode":"46","countryCode":"se","countryName":"Sweden (Sverige)"},{"dialCode":"41","countryCode":"ch","countryName":"Switzerland (Schweiz)"},{"dialCode":"963","countryCode":"sy","countryName":"Syria (‫سوريا‬‎)"},{"dialCode":"886","countryCode":"tw","countryName":"Taiwan (台灣)"},{"dialCode":"992","countryCode":"tj","countryName":"Tajikistan"},{"dialCode":"255","countryCode":"tz","countryName":"Tanzania"},{"dialCode":"66","countryCode":"th","countryName":"Thailand (ไทย)"},{"dialCode":"670","countryCode":"tl","countryName":"Timor-Leste"},{"dialCode":"228","countryCode":"tg","countryName":"Togo"},{"dialCode":"690","countryCode":"tk","countryName":"Tokelau"},{"dialCode":"676","countryCode":"to","countryName":"Tonga"},{"dialCode":"1868","countryCode":"tt","countryName":"Trinidad and Tobago"},{"dialCode":"216","countryCode":"tn","countryName":"Tunisia (‫تونس‬‎)"},{"dialCode":"90","countryCode":"tr","countryName":"Turkey (Türkiye)"},{"dialCode":"993","countryCode":"tm","countryName":"Turkmenistan"},{"dialCode":"1649","countryCode":"tc","countryName":"Turks and Caicos Islands"},{"dialCode":"688","countryCode":"tv","countryName":"Tuvalu"},{"dialCode":"1340","countryCode":"vi","countryName":"U.S. Virgin Islands"},{"dialCode":"256","countryCode":"ug","countryName":"Uganda"},{"dialCode":"380","countryCode":"ua","countryName":"Ukraine (Україна)"},{"dialCode":"971","countryCode":"ae","countryName":"United Arab Emirates (‫الإمارات العربية المتحدة‬‎)"},{"dialCode":"44","countryCode":"gb","countryName":"United Kingdom"},{"dialCode":"1","countryCode":"us","countryName":"United States"},{"dialCode":"598","countryCode":"uy","countryName":"Uruguay"},{"dialCode":"998","countryCode":"uz","countryName":"Uzbekistan (Oʻzbekiston)"},{"dialCode":"678","countryCode":"vu","countryName":"Vanuatu"},{"dialCode":"39","countryCode":"va","countryName":"Vatican City (Città del Vaticano)"},{"dialCode":"58","countryCode":"ve","countryName":"Venezuela"},{"dialCode":"84","countryCode":"vn","countryName":"Vietnam (Việt Nam)"},{"dialCode":"681","countryCode":"wf","countryName":"Wallis and Futuna (Wallis-et-Futuna)"},{"dialCode":"212","countryCode":"eh","countryName":"Western Sahara (‫الصحراء الغربية‬‎)"},{"dialCode":"967","countryCode":"ye","countryName":"Yemen (‫اليمن‬‎)"},{"dialCode":"260","countryCode":"zm","countryName":"Zambia"},{"dialCode":"263","countryCode":"zw","countryName":"Zimbabwe"},{"dialCode":"358","countryCode":"ax","countryName":"Åland Islands"}]
        return list[Math.floor(Math.random() * list.length)];
    }
}

export const signInFormData = new SignInFormData();