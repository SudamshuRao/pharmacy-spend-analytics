window.DASHBOARD_DATA = {
 "totals": [
  {
   "year": 2020,
   "spend": 194092038339.1399,
   "claims": 1454422165.0
  },
  {
   "year": 2021,
   "spend": 213513349360.9301,
   "claims": 1483268229.0
  },
  {
   "year": 2022,
   "spend": 239779215689.47992,
   "claims": 1539211134.0
  },
  {
   "year": 2023,
   "spend": 275808918752.69977,
   "claims": 1616688565.0
  },
  {
   "year": 2024,
   "spend": 288667842058.40015,
   "claims": 1711657015.0
  }
 ],
 "forecast": [
  {
   "year": 2020,
   "kind": "actual",
   "spend": 194092038339.1399,
   "low": 194092038339.1399,
   "high": 194092038339.1399
  },
  {
   "year": 2021,
   "kind": "actual",
   "spend": 213513349360.9301,
   "low": 213513349360.9301,
   "high": 213513349360.9301
  },
  {
   "year": 2022,
   "kind": "actual",
   "spend": 239779215689.47992,
   "low": 239779215689.47992,
   "high": 239779215689.47992
  },
  {
   "year": 2023,
   "kind": "actual",
   "spend": 275808918752.6998,
   "low": 275808918752.6998,
   "high": 275808918752.6998
  },
  {
   "year": 2024,
   "kind": "actual",
   "spend": 288667842058.40015,
   "low": 288667842058.40015,
   "high": 288667842058.40015
  },
  {
   "year": 2025,
   "kind": "forecast",
   "spend": 317806425889.2313,
   "low": 301297994923.95337,
   "high": 334314856854.50934
  },
  {
   "year": 2026,
   "kind": "forecast",
   "spend": 342951143572.2572,
   "low": 325136572132.15985,
   "high": 360765715012.3547
  },
  {
   "year": 2026,
   "kind": "forecast_with_negotiation",
   "spend": 295545994046.87085,
   "low": 280193879544.6684,
   "high": 310898108549.07336
  }
 ],
 "backtest": [
  {
   "method": "linear",
   "holdout_year": 2023,
   "actual": 275808918752.6998,
   "predicted": 261482045146.86572,
   "abs_pct_error": 0.051944925
  },
  {
   "method": "linear",
   "holdout_year": 2024,
   "actual": 288667842058.40015,
   "predicted": 298652507427.8711,
   "abs_pct_error": 0.0345887692
  },
  {
   "method": "loglin",
   "holdout_year": 2023,
   "actual": 275808918752.6998,
   "predicted": 270636967520.8311,
   "abs_pct_error": 0.0187519361
  },
  {
   "method": "loglin",
   "holdout_year": 2024,
   "actual": 288667842058.40015,
   "predicted": 316054161744.7536,
   "abs_pct_error": 0.0948713909
  },
  {
   "method": "recent",
   "holdout_year": 2023,
   "actual": 275808918752.6998,
   "predicted": 272495401654.8202,
   "abs_pct_error": 0.0120138142
  },
  {
   "method": "recent",
   "holdout_year": 2024,
   "actual": 288667842058.40015,
   "predicted": 330607661806.6068,
   "abs_pct_error": 0.1452874676
  }
 ],
 "growth_total": [
  {
   "price_effect": -1889448597.5445485,
   "volume_effect": 65122260976.044464,
   "new_drug_effect": 31342991340.760002,
   "exit_effect": 0.0,
   "spend_change": 94575803719.25998,
   "spend_2020": 194092038339.13986,
   "spend_2024": 288667842058.39966
  }
 ],
 "growth_by_class": [
  {
   "drug_class": "GLP-1 / incretin",
   "spend_2020": 7216574629.2300005,
   "spend_2024": 27904791305.940006,
   "spend_change": 20688216676.71,
   "price_effect": -1115888917.1195548,
   "volume_effect": 15117396493.889557,
   "new_drug_effect": 6686709099.94
  },
  {
   "drug_class": "Oncology (oral)",
   "spend_2020": 23660628274.340008,
   "spend_2024": 40107503640.069984,
   "spend_change": 16446875365.729996,
   "price_effect": 4202802011.772703,
   "volume_effect": 5493247447.927294,
   "new_drug_effect": 6750825906.030001
  },
  {
   "drug_class": "Other",
   "spend_2020": 88002350453.22986,
   "spend_2024": 102760952686.35008,
   "spend_change": 14758602233.119972,
   "price_effect": -5960635952.970962,
   "volume_effect": 9462300237.060968,
   "new_drug_effect": 11256937949.029997
  },
  {
   "drug_class": "Immunology biologic / targeted",
   "spend_2020": 11582942200.49,
   "spend_2024": 25991527899.040005,
   "spend_change": 14408585698.549997,
   "price_effect": 3320983059.467292,
   "volume_effect": 7812375575.082709,
   "new_drug_effect": 3275227063.9999995
  },
  {
   "drug_class": "SGLT2 inhibitor",
   "spend_2020": 3989944227.2999997,
   "spend_2024": 17895219534.35,
   "spend_change": 13905275307.049997,
   "price_effect": 820576729.568986,
   "volume_effect": 12876902625.621016,
   "new_drug_effect": 207795951.85999998
  },
  {
   "drug_class": "Anticoagulant (DOAC)",
   "spend_2020": 15244761553.55,
   "spend_2024": 27211466415.91,
   "spend_change": 11966704862.359999,
   "price_effect": 3274587510.3603272,
   "volume_effect": 8616110233.779673,
   "new_drug_effect": 76007118.22
  },
  {
   "drug_class": "Heart failure / cardiomyopathy",
   "spend_2020": 1682411172.37,
   "spend_2024": 7540784043.63,
   "spend_change": 5858372871.26,
   "price_effect": 708680562.1853876,
   "volume_effect": 4803578950.574613,
   "new_drug_effect": 346113358.5
  },
  {
   "drug_class": "HIV",
   "spend_2020": 5903536136.95,
   "spend_2024": 8004040477.829999,
   "spend_change": 2100504340.8799994,
   "price_effect": 966794514.5158683,
   "volume_effect": 847203185.7541311,
   "new_drug_effect": 286506640.60999995
  },
  {
   "drug_class": "Respiratory inhaler",
   "spend_2020": 14045361376.450003,
   "spend_2024": 15388910727.910002,
   "spend_change": 1343549351.460001,
   "price_effect": -1120842806.3241668,
   "volume_effect": 1802404103.7341676,
   "new_drug_effect": 661988054.05
  },
  {
   "drug_class": "Vaccine",
   "spend_2020": 893441208.2,
   "spend_2024": 2094774415.62,
   "spend_change": 1201333207.42,
   "price_effect": 104175361.44245023,
   "volume_effect": -156634825.4424503,
   "new_drug_effect": 1253792671.42
  },
  {
   "drug_class": "DPP-4 inhibitor",
   "spend_2020": 6626005596.140001,
   "spend_2024": 6162370045.609999,
   "spend_change": -463635550.52999973,
   "price_effect": 732229535.5818614,
   "volume_effect": -1219611987.1118615,
   "new_drug_effect": 23746901.0
  },
  {
   "drug_class": "Insulin",
   "spend_2020": 15244081510.890001,
   "spend_2024": 7605500866.14,
   "spend_change": -7638580644.749998,
   "price_effect": -7822910206.024732,
   "volume_effect": -333011064.8252661,
   "new_drug_effect": 517340626.09999996
  }
 ],
 "top_drugs": [
  {
   "spend_rank": 1,
   "brand_name": "Eliquis",
   "generic_name": "Apixaban",
   "drug_class": "Anticoagulant (DOAC)",
   "total_spend": 20774929225.0,
   "share": 0.071968284,
   "cum_share": 0.071968284
  },
  {
   "spend_rank": 2,
   "brand_name": "Ozempic",
   "generic_name": "Semaglutide",
   "drug_class": "GLP-1 / incretin",
   "total_spend": 12970296347.0,
   "share": 0.0449315596,
   "cum_share": 0.1168998435
  },
  {
   "spend_rank": 3,
   "brand_name": "Jardiance",
   "generic_name": "Empagliflozin",
   "drug_class": "SGLT2 inhibitor",
   "total_spend": 11435997421.0,
   "share": 0.0396164579,
   "cum_share": 0.1565163015
  },
  {
   "spend_rank": 4,
   "brand_name": "Mounjaro",
   "generic_name": "Tirzepatide",
   "drug_class": "GLP-1 / incretin",
   "total_spend": 6336942640.7,
   "share": 0.0219523678,
   "cum_share": 0.1784686693
  },
  {
   "spend_rank": 5,
   "brand_name": "Xarelto",
   "generic_name": "Rivaroxaban",
   "drug_class": "Anticoagulant (DOAC)",
   "total_spend": 6232231839.7,
   "share": 0.0215896298,
   "cum_share": 0.2000582991
  },
  {
   "spend_rank": 6,
   "brand_name": "Trulicity",
   "generic_name": "Dulaglutide",
   "drug_class": "GLP-1 / incretin",
   "total_spend": 5454134725.1,
   "share": 0.0188941542,
   "cum_share": 0.2189524533
  },
  {
   "spend_rank": 7,
   "brand_name": "Trelegy Ellipta",
   "generic_name": "Fluticasone/Umeclidin/Vilanter",
   "drug_class": "Respiratory inhaler",
   "total_spend": 5294401776.8,
   "share": 0.0183408091,
   "cum_share": 0.2372932623
  },
  {
   "spend_rank": 8,
   "brand_name": "Farxiga",
   "generic_name": "Dapagliflozin Propanediol",
   "drug_class": "SGLT2 inhibitor",
   "total_spend": 5290548963.4,
   "share": 0.0183274622,
   "cum_share": 0.2556207245
  },
  {
   "spend_rank": 9,
   "brand_name": "Humira(Cf) Pen",
   "generic_name": "Adalimumab",
   "drug_class": "Immunology biologic / targeted",
   "total_spend": 4328698864.2,
   "share": 0.0149954315,
   "cum_share": 0.2706161561
  },
  {
   "spend_rank": 10,
   "brand_name": "Revlimid",
   "generic_name": "Lenalidomide",
   "drug_class": "Oncology (oral)",
   "total_spend": 4179511486.3,
   "share": 0.0144786183,
   "cum_share": 0.2850947743
  },
  {
   "spend_rank": 11,
   "brand_name": "Entresto",
   "generic_name": "Sacubitril/Valsartan",
   "drug_class": "Heart failure / cardiomyopathy",
   "total_spend": 4020321686.4,
   "share": 0.0139271547,
   "cum_share": 0.299021929
  },
  {
   "spend_rank": 12,
   "brand_name": "Januvia",
   "generic_name": "Sitagliptin Phosphate",
   "drug_class": "DPP-4 inhibitor",
   "total_spend": 3807854661.8,
   "share": 0.0131911287,
   "cum_share": 0.3122130577
  },
  {
   "spend_rank": 13,
   "brand_name": "Biktarvy",
   "generic_name": "Bictegrav/Emtricit/Tenofov Ala",
   "drug_class": "HIV",
   "total_spend": 3456061331.1,
   "share": 0.0119724501,
   "cum_share": 0.3241855078
  },
  {
   "spend_rank": 14,
   "brand_name": "Xtandi",
   "generic_name": "Enzalutamide",
   "drug_class": "Oncology (oral)",
   "total_spend": 3400769228.6,
   "share": 0.0117809078,
   "cum_share": 0.3359664156
  },
  {
   "spend_rank": 15,
   "brand_name": "Stelara*",
   "generic_name": "Ustekinumab",
   "drug_class": "Immunology biologic / targeted",
   "total_spend": 3378017374.1,
   "share": 0.0117020911,
   "cum_share": 0.3476685067
  },
  {
   "spend_rank": 16,
   "brand_name": "Vyndamax",
   "generic_name": "Tafamidis",
   "drug_class": "Heart failure / cardiomyopathy",
   "total_spend": 2830811857.1,
   "share": 0.0098064677,
   "cum_share": 0.3574749743
  },
  {
   "spend_rank": 17,
   "brand_name": "Lenalidomide",
   "generic_name": "Lenalidomide",
   "drug_class": "Oncology (oral)",
   "total_spend": 2640854799.8,
   "share": 0.0091484205,
   "cum_share": 0.3666233948
  },
  {
   "spend_rank": 18,
   "brand_name": "Enbrel Sureclick",
   "generic_name": "Etanercept",
   "drug_class": "Immunology biologic / targeted",
   "total_spend": 2337152869.1,
   "share": 0.0080963396,
   "cum_share": 0.3747197344
  },
  {
   "spend_rank": 19,
   "brand_name": "Myrbetriq",
   "generic_name": "Mirabegron",
   "drug_class": "Other",
   "total_spend": 2297067833.5,
   "share": 0.0079574774,
   "cum_share": 0.3826772118
  },
  {
   "spend_rank": 20,
   "brand_name": "Imbruvica",
   "generic_name": "Ibrutinib",
   "drug_class": "Oncology (oral)",
   "total_spend": 2266252031.7,
   "share": 0.0078507256,
   "cum_share": 0.3905279374
  },
  {
   "spend_rank": 21,
   "brand_name": "Pomalyst",
   "generic_name": "Pomalidomide",
   "drug_class": "Oncology (oral)",
   "total_spend": 2150231814.6,
   "share": 0.0074488097,
   "cum_share": 0.3979767471
  },
  {
   "spend_rank": 22,
   "brand_name": "Ofev",
   "generic_name": "Nintedanib Esylate",
   "drug_class": "Other",
   "total_spend": 2086398978.9,
   "share": 0.0072276807,
   "cum_share": 0.4052044278
  },
  {
   "spend_rank": 23,
   "brand_name": "Jakafi",
   "generic_name": "Ruxolitinib Phosphate",
   "drug_class": "Oncology (oral)",
   "total_spend": 2082741189.3,
   "share": 0.0072150094,
   "cum_share": 0.4124194372
  },
  {
   "spend_rank": 24,
   "brand_name": "Ibrance",
   "generic_name": "Palbociclib",
   "drug_class": "Oncology (oral)",
   "total_spend": 2035022061.3,
   "share": 0.0070497013,
   "cum_share": 0.4194691385
  },
  {
   "spend_rank": 25,
   "brand_name": "Linzess",
   "generic_name": "Linaclotide",
   "drug_class": "Other",
   "total_spend": 1981958629.2,
   "share": 0.0068658795,
   "cum_share": 0.426335018
  }
 ],
 "pareto": [
  {
   "spend_rank": 1,
   "cum_share": 0.071968284
  },
  {
   "spend_rank": 2,
   "cum_share": 0.1168998435
  },
  {
   "spend_rank": 3,
   "cum_share": 0.1565163015
  },
  {
   "spend_rank": 4,
   "cum_share": 0.1784686693
  },
  {
   "spend_rank": 5,
   "cum_share": 0.2000582991
  },
  {
   "spend_rank": 6,
   "cum_share": 0.2189524533
  },
  {
   "spend_rank": 7,
   "cum_share": 0.2372932623
  },
  {
   "spend_rank": 8,
   "cum_share": 0.2556207245
  },
  {
   "spend_rank": 9,
   "cum_share": 0.2706161561
  },
  {
   "spend_rank": 10,
   "cum_share": 0.2850947743
  },
  {
   "spend_rank": 11,
   "cum_share": 0.299021929
  },
  {
   "spend_rank": 12,
   "cum_share": 0.3122130577
  },
  {
   "spend_rank": 13,
   "cum_share": 0.3241855078
  },
  {
   "spend_rank": 14,
   "cum_share": 0.3359664156
  },
  {
   "spend_rank": 15,
   "cum_share": 0.3476685067
  },
  {
   "spend_rank": 16,
   "cum_share": 0.3574749743
  },
  {
   "spend_rank": 17,
   "cum_share": 0.3666233948
  },
  {
   "spend_rank": 18,
   "cum_share": 0.3747197344
  },
  {
   "spend_rank": 19,
   "cum_share": 0.3826772118
  },
  {
   "spend_rank": 20,
   "cum_share": 0.3905279374
  },
  {
   "spend_rank": 21,
   "cum_share": 0.3979767471
  },
  {
   "spend_rank": 22,
   "cum_share": 0.4052044278
  },
  {
   "spend_rank": 23,
   "cum_share": 0.4124194372
  },
  {
   "spend_rank": 24,
   "cum_share": 0.4194691385
  },
  {
   "spend_rank": 25,
   "cum_share": 0.426335018
  },
  {
   "spend_rank": 26,
   "cum_share": 0.433113107
  },
  {
   "spend_rank": 27,
   "cum_share": 0.4396607086
  },
  {
   "spend_rank": 28,
   "cum_share": 0.4461669957
  },
  {
   "spend_rank": 29,
   "cum_share": 0.4524186565
  },
  {
   "spend_rank": 30,
   "cum_share": 0.4585893966
  },
  {
   "spend_rank": 31,
   "cum_share": 0.4645629176
  },
  {
   "spend_rank": 32,
   "cum_share": 0.4704852597
  },
  {
   "spend_rank": 33,
   "cum_share": 0.4763812227
  },
  {
   "spend_rank": 34,
   "cum_share": 0.4820178366
  },
  {
   "spend_rank": 35,
   "cum_share": 0.4871914198
  },
  {
   "spend_rank": 36,
   "cum_share": 0.4919938317
  },
  {
   "spend_rank": 37,
   "cum_share": 0.4967933266
  },
  {
   "spend_rank": 38,
   "cum_share": 0.5015064552
  },
  {
   "spend_rank": 39,
   "cum_share": 0.505974404
  },
  {
   "spend_rank": 40,
   "cum_share": 0.5102413211
  },
  {
   "spend_rank": 41,
   "cum_share": 0.5144562867
  },
  {
   "spend_rank": 42,
   "cum_share": 0.5184682036
  },
  {
   "spend_rank": 43,
   "cum_share": 0.52240343
  },
  {
   "spend_rank": 44,
   "cum_share": 0.5263183301
  },
  {
   "spend_rank": 45,
   "cum_share": 0.5302245444
  },
  {
   "spend_rank": 46,
   "cum_share": 0.5339204929
  },
  {
   "spend_rank": 47,
   "cum_share": 0.5375813001
  },
  {
   "spend_rank": 48,
   "cum_share": 0.5412014808
  },
  {
   "spend_rank": 49,
   "cum_share": 0.5446589706
  },
  {
   "spend_rank": 50,
   "cum_share": 0.5480326894
  },
  {
   "spend_rank": 51,
   "cum_share": 0.5513066562
  },
  {
   "spend_rank": 52,
   "cum_share": 0.5545689549
  },
  {
   "spend_rank": 53,
   "cum_share": 0.5577171132
  },
  {
   "spend_rank": 54,
   "cum_share": 0.5607559279
  },
  {
   "spend_rank": 55,
   "cum_share": 0.5637893206
  },
  {
   "spend_rank": 56,
   "cum_share": 0.5667733459
  },
  {
   "spend_rank": 57,
   "cum_share": 0.569634066
  },
  {
   "spend_rank": 58,
   "cum_share": 0.5724721307
  },
  {
   "spend_rank": 59,
   "cum_share": 0.5753043827
  },
  {
   "spend_rank": 60,
   "cum_share": 0.5779911977
  },
  {
   "spend_rank": 61,
   "cum_share": 0.5806776545
  },
  {
   "spend_rank": 62,
   "cum_share": 0.5833596239
  },
  {
   "spend_rank": 63,
   "cum_share": 0.5860334152
  },
  {
   "spend_rank": 64,
   "cum_share": 0.5886594146
  },
  {
   "spend_rank": 65,
   "cum_share": 0.5912800306
  },
  {
   "spend_rank": 66,
   "cum_share": 0.593804567
  },
  {
   "spend_rank": 67,
   "cum_share": 0.5963150967
  },
  {
   "spend_rank": 68,
   "cum_share": 0.5988237943
  },
  {
   "spend_rank": 69,
   "cum_share": 0.6012991283
  },
  {
   "spend_rank": 70,
   "cum_share": 0.603755856
  },
  {
   "spend_rank": 71,
   "cum_share": 0.6061777832
  },
  {
   "spend_rank": 72,
   "cum_share": 0.6085937267
  },
  {
   "spend_rank": 73,
   "cum_share": 0.6109987288
  },
  {
   "spend_rank": 74,
   "cum_share": 0.6133990526
  },
  {
   "spend_rank": 75,
   "cum_share": 0.6157793613
  },
  {
   "spend_rank": 76,
   "cum_share": 0.6181540541
  },
  {
   "spend_rank": 77,
   "cum_share": 0.6204833027
  },
  {
   "spend_rank": 78,
   "cum_share": 0.6227857046
  },
  {
   "spend_rank": 79,
   "cum_share": 0.62506454
  },
  {
   "spend_rank": 80,
   "cum_share": 0.6273065955
  },
  {
   "spend_rank": 81,
   "cum_share": 0.6295383419
  },
  {
   "spend_rank": 82,
   "cum_share": 0.6317304511
  },
  {
   "spend_rank": 83,
   "cum_share": 0.6339108146
  },
  {
   "spend_rank": 84,
   "cum_share": 0.6360767324
  },
  {
   "spend_rank": 85,
   "cum_share": 0.6382203191
  },
  {
   "spend_rank": 86,
   "cum_share": 0.6402912314
  },
  {
   "spend_rank": 87,
   "cum_share": 0.6423608641
  },
  {
   "spend_rank": 88,
   "cum_share": 0.6444295048
  },
  {
   "spend_rank": 89,
   "cum_share": 0.6464869903
  },
  {
   "spend_rank": 90,
   "cum_share": 0.6485301517
  },
  {
   "spend_rank": 91,
   "cum_share": 0.6505484158
  },
  {
   "spend_rank": 92,
   "cum_share": 0.6525604521
  },
  {
   "spend_rank": 93,
   "cum_share": 0.6545356797
  },
  {
   "spend_rank": 94,
   "cum_share": 0.6564960348
  },
  {
   "spend_rank": 95,
   "cum_share": 0.6584514703
  },
  {
   "spend_rank": 96,
   "cum_share": 0.6603955237
  },
  {
   "spend_rank": 97,
   "cum_share": 0.6623099563
  },
  {
   "spend_rank": 98,
   "cum_share": 0.6642222118
  },
  {
   "spend_rank": 99,
   "cum_share": 0.6661274279
  },
  {
   "spend_rank": 100,
   "cum_share": 0.6680320445
  },
  {
   "spend_rank": 101,
   "cum_share": 0.6699189747
  },
  {
   "spend_rank": 102,
   "cum_share": 0.671804029
  },
  {
   "spend_rank": 103,
   "cum_share": 0.6736784205
  },
  {
   "spend_rank": 104,
   "cum_share": 0.6754825425
  },
  {
   "spend_rank": 105,
   "cum_share": 0.6772781374
  },
  {
   "spend_rank": 106,
   "cum_share": 0.6790287106
  },
  {
   "spend_rank": 107,
   "cum_share": 0.6807396
  },
  {
   "spend_rank": 108,
   "cum_share": 0.6824241007
  },
  {
   "spend_rank": 109,
   "cum_share": 0.684101837
  },
  {
   "spend_rank": 110,
   "cum_share": 0.6857215355
  },
  {
   "spend_rank": 111,
   "cum_share": 0.6873296829
  },
  {
   "spend_rank": 112,
   "cum_share": 0.688909253
  },
  {
   "spend_rank": 113,
   "cum_share": 0.6904632486
  },
  {
   "spend_rank": 114,
   "cum_share": 0.6920168213
  },
  {
   "spend_rank": 115,
   "cum_share": 0.6935372711
  },
  {
   "spend_rank": 116,
   "cum_share": 0.695056097
  },
  {
   "spend_rank": 117,
   "cum_share": 0.6965685616
  },
  {
   "spend_rank": 118,
   "cum_share": 0.6980565621
  },
  {
   "spend_rank": 119,
   "cum_share": 0.6995356384
  },
  {
   "spend_rank": 120,
   "cum_share": 0.7009740396
  },
  {
   "spend_rank": 121,
   "cum_share": 0.7024108164
  },
  {
   "spend_rank": 122,
   "cum_share": 0.7038287547
  },
  {
   "spend_rank": 123,
   "cum_share": 0.7052175499
  },
  {
   "spend_rank": 124,
   "cum_share": 0.7065904176
  },
  {
   "spend_rank": 125,
   "cum_share": 0.7079526453
  },
  {
   "spend_rank": 126,
   "cum_share": 0.7093122915
  },
  {
   "spend_rank": 127,
   "cum_share": 0.7106653345
  },
  {
   "spend_rank": 128,
   "cum_share": 0.7120091113
  },
  {
   "spend_rank": 129,
   "cum_share": 0.7133496932
  },
  {
   "spend_rank": 130,
   "cum_share": 0.7146586707
  },
  {
   "spend_rank": 131,
   "cum_share": 0.7159607158
  },
  {
   "spend_rank": 132,
   "cum_share": 0.7172622314
  },
  {
   "spend_rank": 133,
   "cum_share": 0.7185629568
  },
  {
   "spend_rank": 134,
   "cum_share": 0.7198334078
  },
  {
   "spend_rank": 135,
   "cum_share": 0.7210807141
  },
  {
   "spend_rank": 136,
   "cum_share": 0.7223207896
  },
  {
   "spend_rank": 137,
   "cum_share": 0.7235597022
  },
  {
   "spend_rank": 138,
   "cum_share": 0.7247900755
  },
  {
   "spend_rank": 139,
   "cum_share": 0.7259959348
  },
  {
   "spend_rank": 140,
   "cum_share": 0.7271944443
  },
  {
   "spend_rank": 141,
   "cum_share": 0.7283785036
  },
  {
   "spend_rank": 142,
   "cum_share": 0.7295624481
  },
  {
   "spend_rank": 143,
   "cum_share": 0.7307461352
  },
  {
   "spend_rank": 144,
   "cum_share": 0.7319259849
  },
  {
   "spend_rank": 145,
   "cum_share": 0.7330960298
  },
  {
   "spend_rank": 146,
   "cum_share": 0.7342542266
  },
  {
   "spend_rank": 147,
   "cum_share": 0.7353657653
  },
  {
   "spend_rank": 148,
   "cum_share": 0.736476845
  },
  {
   "spend_rank": 149,
   "cum_share": 0.7375874217
  },
  {
   "spend_rank": 150,
   "cum_share": 0.7386921985
  },
  {
   "spend_rank": 151,
   "cum_share": 0.73979349
  },
  {
   "spend_rank": 152,
   "cum_share": 0.7408870967
  },
  {
   "spend_rank": 153,
   "cum_share": 0.741980362
  },
  {
   "spend_rank": 154,
   "cum_share": 0.7430650631
  },
  {
   "spend_rank": 155,
   "cum_share": 0.7441349039
  },
  {
   "spend_rank": 156,
   "cum_share": 0.745203215
  },
  {
   "spend_rank": 157,
   "cum_share": 0.7462619584
  },
  {
   "spend_rank": 158,
   "cum_share": 0.7473193202
  },
  {
   "spend_rank": 159,
   "cum_share": 0.7483709644
  },
  {
   "spend_rank": 160,
   "cum_share": 0.7494146667
  },
  {
   "spend_rank": 161,
   "cum_share": 0.750454566
  },
  {
   "spend_rank": 162,
   "cum_share": 0.7514759396
  },
  {
   "spend_rank": 163,
   "cum_share": 0.7524837356
  },
  {
   "spend_rank": 164,
   "cum_share": 0.7534912108
  },
  {
   "spend_rank": 165,
   "cum_share": 0.7544940665
  },
  {
   "spend_rank": 166,
   "cum_share": 0.7554426921
  },
  {
   "spend_rank": 167,
   "cum_share": 0.7563873881
  },
  {
   "spend_rank": 168,
   "cum_share": 0.7573298631
  },
  {
   "spend_rank": 169,
   "cum_share": 0.7582713754
  },
  {
   "spend_rank": 170,
   "cum_share": 0.7592068117
  },
  {
   "spend_rank": 171,
   "cum_share": 0.7601389419
  },
  {
   "spend_rank": 172,
   "cum_share": 0.7610690049
  },
  {
   "spend_rank": 173,
   "cum_share": 0.7619917015
  },
  {
   "spend_rank": 174,
   "cum_share": 0.7629105249
  },
  {
   "spend_rank": 175,
   "cum_share": 0.7638249594
  },
  {
   "spend_rank": 176,
   "cum_share": 0.7647267126
  },
  {
   "spend_rank": 177,
   "cum_share": 0.7656234048
  },
  {
   "spend_rank": 178,
   "cum_share": 0.7665184357
  },
  {
   "spend_rank": 179,
   "cum_share": 0.7674109614
  },
  {
   "spend_rank": 180,
   "cum_share": 0.7683018045
  },
  {
   "spend_rank": 181,
   "cum_share": 0.769187333
  },
  {
   "spend_rank": 182,
   "cum_share": 0.7700720802
  },
  {
   "spend_rank": 183,
   "cum_share": 0.7709554138
  },
  {
   "spend_rank": 184,
   "cum_share": 0.7718314156
  },
  {
   "spend_rank": 185,
   "cum_share": 0.7727031062
  },
  {
   "spend_rank": 186,
   "cum_share": 0.7735632283
  },
  {
   "spend_rank": 187,
   "cum_share": 0.7744231814
  },
  {
   "spend_rank": 188,
   "cum_share": 0.77527781
  },
  {
   "spend_rank": 189,
   "cum_share": 0.7761275413
  },
  {
   "spend_rank": 190,
   "cum_share": 0.7769703865
  },
  {
   "spend_rank": 191,
   "cum_share": 0.7778119498
  },
  {
   "spend_rank": 192,
   "cum_share": 0.778646122
  },
  {
   "spend_rank": 193,
   "cum_share": 0.7794761957
  },
  {
   "spend_rank": 194,
   "cum_share": 0.7803041463
  },
  {
   "spend_rank": 195,
   "cum_share": 0.7811221941
  },
  {
   "spend_rank": 196,
   "cum_share": 0.7819373588
  },
  {
   "spend_rank": 197,
   "cum_share": 0.7827442941
  },
  {
   "spend_rank": 198,
   "cum_share": 0.7835505864
  },
  {
   "spend_rank": 199,
   "cum_share": 0.784353067
  },
  {
   "spend_rank": 200,
   "cum_share": 0.7851512962
  },
  {
   "spend_rank": 201,
   "cum_share": 0.7859432855
  },
  {
   "spend_rank": 202,
   "cum_share": 0.7867332081
  },
  {
   "spend_rank": 203,
   "cum_share": 0.7875158219
  },
  {
   "spend_rank": 204,
   "cum_share": 0.7882922953
  },
  {
   "spend_rank": 205,
   "cum_share": 0.7890648265
  },
  {
   "spend_rank": 206,
   "cum_share": 0.7898286524
  },
  {
   "spend_rank": 207,
   "cum_share": 0.7905899804
  },
  {
   "spend_rank": 208,
   "cum_share": 0.7913457219
  },
  {
   "spend_rank": 209,
   "cum_share": 0.7920967814
  },
  {
   "spend_rank": 210,
   "cum_share": 0.7928428107
  },
  {
   "spend_rank": 211,
   "cum_share": 0.7935793697
  },
  {
   "spend_rank": 212,
   "cum_share": 0.7943149873
  },
  {
   "spend_rank": 213,
   "cum_share": 0.7950480576
  },
  {
   "spend_rank": 214,
   "cum_share": 0.7957773414
  },
  {
   "spend_rank": 215,
   "cum_share": 0.7965010284
  },
  {
   "spend_rank": 216,
   "cum_share": 0.7972241125
  },
  {
   "spend_rank": 217,
   "cum_share": 0.7979427353
  },
  {
   "spend_rank": 218,
   "cum_share": 0.7986598399
  },
  {
   "spend_rank": 219,
   "cum_share": 0.799371594
  },
  {
   "spend_rank": 220,
   "cum_share": 0.8000798158
  },
  {
   "spend_rank": 221,
   "cum_share": 0.8007848757
  },
  {
   "spend_rank": 222,
   "cum_share": 0.8014883245
  },
  {
   "spend_rank": 223,
   "cum_share": 0.8021878612
  },
  {
   "spend_rank": 224,
   "cum_share": 0.802882646
  },
  {
   "spend_rank": 225,
   "cum_share": 0.8035749854
  },
  {
   "spend_rank": 226,
   "cum_share": 0.8042669026
  },
  {
   "spend_rank": 227,
   "cum_share": 0.8049570912
  },
  {
   "spend_rank": 228,
   "cum_share": 0.8056464181
  },
  {
   "spend_rank": 229,
   "cum_share": 0.8063295111
  },
  {
   "spend_rank": 230,
   "cum_share": 0.8070117063
  },
  {
   "spend_rank": 231,
   "cum_share": 0.8076924222
  },
  {
   "spend_rank": 232,
   "cum_share": 0.8083720738
  },
  {
   "spend_rank": 233,
   "cum_share": 0.8090509999
  },
  {
   "spend_rank": 234,
   "cum_share": 0.8097267467
  },
  {
   "spend_rank": 235,
   "cum_share": 0.810388922
  },
  {
   "spend_rank": 236,
   "cum_share": 0.8110499801
  },
  {
   "spend_rank": 237,
   "cum_share": 0.8117075006
  },
  {
   "spend_rank": 238,
   "cum_share": 0.8123589648
  },
  {
   "spend_rank": 239,
   "cum_share": 0.8130069877
  },
  {
   "spend_rank": 240,
   "cum_share": 0.8136477443
  },
  {
   "spend_rank": 241,
   "cum_share": 0.8142881384
  },
  {
   "spend_rank": 242,
   "cum_share": 0.8149280176
  },
  {
   "spend_rank": 243,
   "cum_share": 0.8155678507
  },
  {
   "spend_rank": 244,
   "cum_share": 0.8162058471
  },
  {
   "spend_rank": 245,
   "cum_share": 0.8168429791
  },
  {
   "spend_rank": 246,
   "cum_share": 0.8174795768
  },
  {
   "spend_rank": 247,
   "cum_share": 0.8181123233
  },
  {
   "spend_rank": 248,
   "cum_share": 0.8187367391
  },
  {
   "spend_rank": 249,
   "cum_share": 0.8193567704
  },
  {
   "spend_rank": 250,
   "cum_share": 0.8199740556
  },
  {
   "spend_rank": 251,
   "cum_share": 0.8205900675
  },
  {
   "spend_rank": 252,
   "cum_share": 0.8212053803
  },
  {
   "spend_rank": 253,
   "cum_share": 0.8218118492
  },
  {
   "spend_rank": 254,
   "cum_share": 0.8224142482
  },
  {
   "spend_rank": 255,
   "cum_share": 0.823013402
  },
  {
   "spend_rank": 256,
   "cum_share": 0.8236099245
  },
  {
   "spend_rank": 257,
   "cum_share": 0.8241940706
  },
  {
   "spend_rank": 258,
   "cum_share": 0.8247762125
  },
  {
   "spend_rank": 259,
   "cum_share": 0.825356112
  },
  {
   "spend_rank": 260,
   "cum_share": 0.8259345294
  },
  {
   "spend_rank": 261,
   "cum_share": 0.8265075076
  },
  {
   "spend_rank": 262,
   "cum_share": 0.8270802129
  },
  {
   "spend_rank": 263,
   "cum_share": 0.827650799
  },
  {
   "spend_rank": 264,
   "cum_share": 0.8282213614
  },
  {
   "spend_rank": 265,
   "cum_share": 0.8287894797
  },
  {
   "spend_rank": 266,
   "cum_share": 0.8293535963
  },
  {
   "spend_rank": 267,
   "cum_share": 0.829915678
  },
  {
   "spend_rank": 268,
   "cum_share": 0.8304771611
  },
  {
   "spend_rank": 269,
   "cum_share": 0.8310360344
  },
  {
   "spend_rank": 270,
   "cum_share": 0.8315907758
  },
  {
   "spend_rank": 271,
   "cum_share": 0.8321451664
  },
  {
   "spend_rank": 272,
   "cum_share": 0.8326995287
  },
  {
   "spend_rank": 273,
   "cum_share": 0.8332536195
  },
  {
   "spend_rank": 274,
   "cum_share": 0.8338067717
  },
  {
   "spend_rank": 275,
   "cum_share": 0.8343594178
  },
  {
   "spend_rank": 276,
   "cum_share": 0.8349063215
  },
  {
   "spend_rank": 277,
   "cum_share": 0.8354531379
  },
  {
   "spend_rank": 278,
   "cum_share": 0.8359987279
  },
  {
   "spend_rank": 279,
   "cum_share": 0.8365422918
  },
  {
   "spend_rank": 280,
   "cum_share": 0.8370793843
  },
  {
   "spend_rank": 281,
   "cum_share": 0.8376147012
  },
  {
   "spend_rank": 282,
   "cum_share": 0.838149686
  },
  {
   "spend_rank": 283,
   "cum_share": 0.8386825761
  },
  {
   "spend_rank": 284,
   "cum_share": 0.8392154198
  },
  {
   "spend_rank": 285,
   "cum_share": 0.8397480563
  },
  {
   "spend_rank": 286,
   "cum_share": 0.8402802254
  },
  {
   "spend_rank": 287,
   "cum_share": 0.8408113911
  },
  {
   "spend_rank": 288,
   "cum_share": 0.8413409144
  },
  {
   "spend_rank": 289,
   "cum_share": 0.8418671651
  },
  {
   "spend_rank": 290,
   "cum_share": 0.8423874171
  },
  {
   "spend_rank": 291,
   "cum_share": 0.8429017825
  },
  {
   "spend_rank": 292,
   "cum_share": 0.8434128945
  },
  {
   "spend_rank": 293,
   "cum_share": 0.8439120482
  },
  {
   "spend_rank": 294,
   "cum_share": 0.8444111387
  },
  {
   "spend_rank": 295,
   "cum_share": 0.844908213
  },
  {
   "spend_rank": 296,
   "cum_share": 0.8454048631
  },
  {
   "spend_rank": 297,
   "cum_share": 0.8458964194
  },
  {
   "spend_rank": 298,
   "cum_share": 0.8463850819
  },
  {
   "spend_rank": 299,
   "cum_share": 0.8468734999
  },
  {
   "spend_rank": 300,
   "cum_share": 0.8473616895
  },
  {
   "spend_rank": 301,
   "cum_share": 0.8478468667
  },
  {
   "spend_rank": 302,
   "cum_share": 0.8483314862
  },
  {
   "spend_rank": 303,
   "cum_share": 0.8488142342
  },
  {
   "spend_rank": 304,
   "cum_share": 0.8492926514
  },
  {
   "spend_rank": 305,
   "cum_share": 0.8497688614
  },
  {
   "spend_rank": 306,
   "cum_share": 0.8502408759
  },
  {
   "spend_rank": 307,
   "cum_share": 0.8507092719
  },
  {
   "spend_rank": 308,
   "cum_share": 0.8511754483
  },
  {
   "spend_rank": 309,
   "cum_share": 0.8516407129
  },
  {
   "spend_rank": 310,
   "cum_share": 0.8521008823
  },
  {
   "spend_rank": 311,
   "cum_share": 0.8525598906
  },
  {
   "spend_rank": 312,
   "cum_share": 0.8530187448
  },
  {
   "spend_rank": 313,
   "cum_share": 0.8534756791
  },
  {
   "spend_rank": 314,
   "cum_share": 0.8539313718
  },
  {
   "spend_rank": 315,
   "cum_share": 0.8543850162
  },
  {
   "spend_rank": 316,
   "cum_share": 0.8548352957
  },
  {
   "spend_rank": 317,
   "cum_share": 0.855284916
  },
  {
   "spend_rank": 318,
   "cum_share": 0.8557326612
  },
  {
   "spend_rank": 319,
   "cum_share": 0.8561778887
  },
  {
   "spend_rank": 320,
   "cum_share": 0.8566222982
  },
  {
   "spend_rank": 321,
   "cum_share": 0.857066197
  },
  {
   "spend_rank": 322,
   "cum_share": 0.8575085667
  },
  {
   "spend_rank": 323,
   "cum_share": 0.8579507051
  },
  {
   "spend_rank": 324,
   "cum_share": 0.8583915601
  },
  {
   "spend_rank": 325,
   "cum_share": 0.8588313958
  },
  {
   "spend_rank": 326,
   "cum_share": 0.8592711997
  },
  {
   "spend_rank": 327,
   "cum_share": 0.8597107262
  },
  {
   "spend_rank": 328,
   "cum_share": 0.8601487148
  },
  {
   "spend_rank": 329,
   "cum_share": 0.860585555
  },
  {
   "spend_rank": 330,
   "cum_share": 0.8610161417
  },
  {
   "spend_rank": 331,
   "cum_share": 0.8614460663
  },
  {
   "spend_rank": 332,
   "cum_share": 0.8618729805
  },
  {
   "spend_rank": 333,
   "cum_share": 0.8622997071
  },
  {
   "spend_rank": 334,
   "cum_share": 0.8627259211
  },
  {
   "spend_rank": 335,
   "cum_share": 0.8631498537
  },
  {
   "spend_rank": 336,
   "cum_share": 0.8635734641
  },
  {
   "spend_rank": 337,
   "cum_share": 0.863994385
  },
  {
   "spend_rank": 338,
   "cum_share": 0.8644146138
  },
  {
   "spend_rank": 339,
   "cum_share": 0.8648327891
  },
  {
   "spend_rank": 340,
   "cum_share": 0.8652507617
  },
  {
   "spend_rank": 341,
   "cum_share": 0.8656680251
  },
  {
   "spend_rank": 342,
   "cum_share": 0.8660812344
  },
  {
   "spend_rank": 343,
   "cum_share": 0.8664932259
  },
  {
   "spend_rank": 344,
   "cum_share": 0.8669051209
  },
  {
   "spend_rank": 345,
   "cum_share": 0.8673166614
  },
  {
   "spend_rank": 346,
   "cum_share": 0.8677275205
  },
  {
   "spend_rank": 347,
   "cum_share": 0.8681380893
  },
  {
   "spend_rank": 348,
   "cum_share": 0.8685426021
  },
  {
   "spend_rank": 349,
   "cum_share": 0.8689469917
  },
  {
   "spend_rank": 350,
   "cum_share": 0.8693498974
  },
  {
   "spend_rank": 351,
   "cum_share": 0.8697511058
  },
  {
   "spend_rank": 352,
   "cum_share": 0.8701505474
  },
  {
   "spend_rank": 353,
   "cum_share": 0.870549058
  },
  {
   "spend_rank": 354,
   "cum_share": 0.8709466526
  },
  {
   "spend_rank": 355,
   "cum_share": 0.8713424455
  },
  {
   "spend_rank": 356,
   "cum_share": 0.871732985
  },
  {
   "spend_rank": 357,
   "cum_share": 0.8721224498
  },
  {
   "spend_rank": 358,
   "cum_share": 0.8725113513
  },
  {
   "spend_rank": 359,
   "cum_share": 0.8728973861
  },
  {
   "spend_rank": 360,
   "cum_share": 0.8732826763
  },
  {
   "spend_rank": 361,
   "cum_share": 0.8736670137
  },
  {
   "spend_rank": 362,
   "cum_share": 0.8740509101
  },
  {
   "spend_rank": 363,
   "cum_share": 0.8744311444
  },
  {
   "spend_rank": 364,
   "cum_share": 0.874810528
  },
  {
   "spend_rank": 365,
   "cum_share": 0.8751896096
  },
  {
   "spend_rank": 366,
   "cum_share": 0.8755655936
  },
  {
   "spend_rank": 367,
   "cum_share": 0.8759385532
  },
  {
   "spend_rank": 368,
   "cum_share": 0.8763093059
  },
  {
   "spend_rank": 369,
   "cum_share": 0.8766792829
  },
  {
   "spend_rank": 370,
   "cum_share": 0.8770486427
  },
  {
   "spend_rank": 371,
   "cum_share": 0.8774173573
  },
  {
   "spend_rank": 372,
   "cum_share": 0.877784226
  },
  {
   "spend_rank": 373,
   "cum_share": 0.878149272
  },
  {
   "spend_rank": 374,
   "cum_share": 0.8785084724
  },
  {
   "spend_rank": 375,
   "cum_share": 0.8788669382
  },
  {
   "spend_rank": 376,
   "cum_share": 0.8792247845
  },
  {
   "spend_rank": 377,
   "cum_share": 0.8795806144
  },
  {
   "spend_rank": 378,
   "cum_share": 0.8799321057
  },
  {
   "spend_rank": 379,
   "cum_share": 0.8802829336
  },
  {
   "spend_rank": 380,
   "cum_share": 0.8806288079
  },
  {
   "spend_rank": 381,
   "cum_share": 0.8809722563
  },
  {
   "spend_rank": 382,
   "cum_share": 0.8813154139
  },
  {
   "spend_rank": 383,
   "cum_share": 0.8816563474
  },
  {
   "spend_rank": 384,
   "cum_share": 0.8819965931
  },
  {
   "spend_rank": 385,
   "cum_share": 0.8823367928
  },
  {
   "spend_rank": 386,
   "cum_share": 0.8826769441
  },
  {
   "spend_rank": 387,
   "cum_share": 0.8830151197
  },
  {
   "spend_rank": 388,
   "cum_share": 0.8833512885
  },
  {
   "spend_rank": 389,
   "cum_share": 0.8836853175
  },
  {
   "spend_rank": 390,
   "cum_share": 0.8840187743
  },
  {
   "spend_rank": 391,
   "cum_share": 0.8843521228
  },
  {
   "spend_rank": 392,
   "cum_share": 0.8846853142
  },
  {
   "spend_rank": 393,
   "cum_share": 0.8850126908
  },
  {
   "spend_rank": 394,
   "cum_share": 0.8853396765
  },
  {
   "spend_rank": 395,
   "cum_share": 0.8856633525
  },
  {
   "spend_rank": 396,
   "cum_share": 0.8859869436
  },
  {
   "spend_rank": 397,
   "cum_share": 0.8863079412
  },
  {
   "spend_rank": 398,
   "cum_share": 0.8866286423
  },
  {
   "spend_rank": 399,
   "cum_share": 0.886948692
  },
  {
   "spend_rank": 400,
   "cum_share": 0.8872682243
  }
 ],
 "concentration": [
  {
   "n_drugs": 3625,
   "n_for_50": 38,
   "n_for_80": 220,
   "top10_share": 0.2850947743
  }
 ],
 "price_split": [
  {
   "grp": "generic",
   "price_effect": -9028484373.413517
  },
  {
   "grp": "brand",
   "price_effect": 14961945981.89372
  },
  {
   "grp": "insulin",
   "price_effect": -7822910206.024734
  }
 ],
 "top_growth_drugs": [
  {
   "brand_name": "Ozempic",
   "drug_class": "GLP-1 / incretin",
   "spend_change": 11514484079.9,
   "price_effect": -1738046156.6746917,
   "volume_effect": 13252530236.574694,
   "segment": "continuing"
  },
  {
   "brand_name": "Eliquis",
   "drug_class": "Anticoagulant (DOAC)",
   "spend_change": 10838859411.2,
   "price_effect": 2968811819.6357174,
   "volume_effect": 7870047591.564282,
   "segment": "continuing"
  },
  {
   "brand_name": "Jardiance",
   "drug_class": "SGLT2 inhibitor",
   "spend_change": 9059831128.5,
   "price_effect": 550831979.3697014,
   "volume_effect": 8508999149.130299,
   "segment": "continuing"
  },
  {
   "brand_name": "Mounjaro",
   "drug_class": "GLP-1 / incretin",
   "spend_change": 6336942640.7,
   "price_effect": null,
   "volume_effect": null,
   "segment": "new drug"
  },
  {
   "brand_name": "Farxiga",
   "drug_class": "SGLT2 inhibitor",
   "spend_change": 4553761399.879999,
   "price_effect": 190780144.6460164,
   "volume_effect": 4362981255.233984,
   "segment": "continuing"
  },
  {
   "brand_name": "Trelegy Ellipta",
   "drug_class": "Respiratory inhaler",
   "spend_change": 3806599469.1000004,
   "price_effect": 260720113.3292775,
   "volume_effect": 3545879355.770723,
   "segment": "continuing"
  },
  {
   "brand_name": "Entresto",
   "drug_class": "Heart failure / cardiomyopathy",
   "spend_change": 2817278146.4,
   "price_effect": 466408391.03806984,
   "volume_effect": 2350869755.3619304,
   "segment": "continuing"
  },
  {
   "brand_name": "Lenalidomide",
   "drug_class": "Oncology (oral)",
   "spend_change": 2640854799.8,
   "price_effect": null,
   "volume_effect": null,
   "segment": "new drug"
  },
  {
   "brand_name": "Vyndamax",
   "drug_class": "Heart failure / cardiomyopathy",
   "spend_change": 2577544316.5099998,
   "price_effect": 207618992.61958084,
   "volume_effect": 2369925323.890419,
   "segment": "continuing"
  },
  {
   "brand_name": "Stelara*",
   "drug_class": "Immunology biologic / targeted",
   "spend_change": 2271661125.7,
   "price_effect": 148631867.36386877,
   "volume_effect": 2123029258.336131,
   "segment": "continuing"
  }
 ],
 "adalimumab": [
  {
   "year": 2020,
   "product_group": "Humira",
   "spend": 4146389594.1800003,
   "units": 1463395.46,
   "price_per_unit": 2833.4033468848
  },
  {
   "year": 2021,
   "product_group": "Humira",
   "spend": 4713917330.360001,
   "units": 1528061.78,
   "price_per_unit": 3084.8997023929
  },
  {
   "year": 2022,
   "product_group": "Humira",
   "spend": 5411034182.96,
   "units": 1610317.689,
   "price_per_unit": 3360.2277487992
  },
  {
   "year": 2023,
   "product_group": "Biosimilar",
   "spend": 42969331.870000005,
   "units": 38000.4,
   "price_per_unit": 1130.7599885791
  },
  {
   "year": 2023,
   "product_group": "Humira",
   "spend": 6053631248.22,
   "units": 1627719.5999999999,
   "price_per_unit": 3719.0872729062
  },
  {
   "year": 2024,
   "product_group": "Biosimilar",
   "spend": 162061996.74000004,
   "units": 79267.1,
   "price_per_unit": 2044.5051823518
  },
  {
   "year": 2024,
   "product_group": "Humira",
   "spend": 5715863099.68,
   "units": 1630311.702,
   "price_per_unit": 3505.99403333
  }
 ],
 "adalimumab_scenarios": [
  {
   "price_basis": "blended",
   "conversion": 0.25,
   "units_switched": 407577.9255,
   "humira_price_per_unit": 3505.99403333,
   "biosimilar_price_per_unit": 2044.5051823518,
   "gross_savings": 595670594.0230455
  },
  {
   "price_basis": "blended",
   "conversion": 0.5,
   "units_switched": 815155.851,
   "humira_price_per_unit": 3505.99403333,
   "biosimilar_price_per_unit": 2044.5051823518,
   "gross_savings": 1191341188.046091
  },
  {
   "price_basis": "blended",
   "conversion": 0.75,
   "units_switched": 1222733.7765000002,
   "humira_price_per_unit": 3505.99403333,
   "biosimilar_price_per_unit": 2044.5051823518,
   "gross_savings": 1787011782.0691366
  },
  {
   "price_basis": "low_list",
   "conversion": 0.25,
   "units_switched": 407577.9255,
   "humira_price_per_unit": 3505.99403333,
   "biosimilar_price_per_unit": 638.2560084994,
   "gross_savings": 1168826715.0379176
  },
  {
   "price_basis": "low_list",
   "conversion": 0.5,
   "units_switched": 815155.851,
   "humira_price_per_unit": 3505.99403333,
   "biosimilar_price_per_unit": 638.2560084994,
   "gross_savings": 2337653430.075835
  },
  {
   "price_basis": "low_list",
   "conversion": 0.75,
   "units_switched": 1222733.7765000002,
   "humira_price_per_unit": 3505.99403333,
   "biosimilar_price_per_unit": 638.2560084994,
   "gross_savings": 3506480145.1137533
  }
 ],
 "negotiation": [
  {
   "negotiated_2026_group": "Eliquis",
   "spend_2024": 20774929225.0,
   "list_price_2023_30d": 521.0,
   "negotiated_price_2026_30d": 231.0,
   "discount": 0.556621881,
   "est_gross_reduction": 11563780182.821497
  },
  {
   "negotiated_2026_group": "Jardiance",
   "spend_2024": 11435997421.0,
   "list_price_2023_30d": 573.0,
   "negotiated_price_2026_30d": 197.0,
   "discount": 0.6561954625,
   "est_gross_reduction": 7504249616.572425
  },
  {
   "negotiated_2026_group": "Xarelto",
   "spend_2024": 6232231839.7,
   "list_price_2023_30d": 517.0,
   "negotiated_price_2026_30d": 197.0,
   "discount": 0.6189555126,
   "est_gross_reduction": 3857474252.8123794
  },
  {
   "negotiated_2026_group": "Farxiga",
   "spend_2024": 5290548963.4,
   "list_price_2023_30d": 556.0,
   "negotiated_price_2026_30d": 178.5,
   "discount": 0.6789568345,
   "est_gross_reduction": 3592054377.128597
  },
  {
   "negotiated_2026_group": "Entresto",
   "spend_2024": 4020466403.9,
   "list_price_2023_30d": 628.0,
   "negotiated_price_2026_30d": 295.0,
   "discount": 0.5302547771,
   "est_gross_reduction": 2131871516.717675
  },
  {
   "negotiated_2026_group": "Januvia",
   "spend_2024": 3807854661.8,
   "list_price_2023_30d": 527.0,
   "negotiated_price_2026_30d": 113.0,
   "discount": 0.7855787476,
   "est_gross_reduction": 2991369696.366604
  },
  {
   "negotiated_2026_group": "Stelara",
   "spend_2024": 3378017374.1,
   "list_price_2023_30d": 13836.0,
   "negotiated_price_2026_30d": 4695.0,
   "discount": 0.6606678231,
   "est_gross_reduction": 2231747384.840134
  },
  {
   "negotiated_2026_group": "Enbrel",
   "spend_2024": 3225567875.91,
   "list_price_2023_30d": 7106.0,
   "negotiated_price_2026_30d": 2355.0,
   "discount": 0.668589924,
   "est_gross_reduction": 2156582181.0369277
  },
  {
   "negotiated_2026_group": "Imbruvica",
   "spend_2024": 2266252031.7,
   "list_price_2023_30d": 14934.0,
   "negotiated_price_2026_30d": 9319.0,
   "discount": 0.3759876791,
   "est_gross_reduction": 852082841.703194
  },
  {
   "negotiated_2026_group": "Fiasp / NovoLog",
   "spend_2024": 843699816.31,
   "list_price_2023_30d": 495.0,
   "negotiated_price_2026_30d": 119.0,
   "discount": 0.7595959596,
   "est_gross_reduction": 640870971.5809293
  }
 ],
 "xwalk": [
  {
   "status": "matched",
   "n_drugs": 167,
   "spend": 177047797726.65
  },
  {
   "status": "not_in_nadac",
   "n_drugs": 77,
   "spend": 53879934386.290016
  },
  {
   "status": "unmatched",
   "n_drugs": 13,
   "spend": 271597137.83
  }
 ]
};
