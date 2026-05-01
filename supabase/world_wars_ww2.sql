-- ============================================================
-- PERANG DUNIA II (1939-1945) — 30 Peristiwa
-- Jalankan SETELAH world_wars.sql
-- ============================================================
INSERT INTO world_war_events (war, title, event_date, year, description, key_figures, nations, event_type, sort_order) VALUES

('ww2', 'Jerman Menginvasi Polandia', '1939-09-01', 1939,
 'Wehrmacht melancarkan Blitzkrieg ke Polandia — kombinasi Luftwaffe, tank Panzer, dan infanteri mekanis. Inggris dan Prancis menyatakan perang 2 hari kemudian. Uni Soviet menginvasi dari timur pada 17 September. Polandia menyerah 6 Oktober.',
 'Adolf Hitler, Walther von Brauchitsch, Edward Rydz-Śmigły', 'Jerman, Polandia, Uni Soviet', 'invasion', 21),

('ww2', 'Perang Musim Dingin (Finlandia vs Soviet)', '1939-11-30', 1939,
 'Uni Soviet menginvasi Finlandia setelah tuntutan wilayah ditolak. Finlandia memberikan perlawanan luar biasa dengan perang gerilya. Sniper legendaris Simo Häyhä ("White Death") membunuh 500+ tentara Soviet. Perang berakhir Maret 1940 — Finlandia kehilangan 11% wilayah tapi mempertahankan kedaulatan.',
 'Carl Gustaf Emil Mannerheim, Simo Häyhä', 'Finlandia, Uni Soviet', 'battle', 22),

('ww2', 'Pembantaian Katyn', '1940-04-01', 1940,
 'Sekitar 22.000 perwira militer, polisi, dan intelektual Polandia dieksekusi oleh NKVD Soviet. Pembantaian ini dirahasiakan puluhan tahun — Soviet menyalahkan Jerman. Kebenaran baru diakui resmi oleh Rusia tahun 1990.',
 'Joseph Stalin, Lavrentiy Beria', 'Uni Soviet, Polandia', 'atrocity', 23),

('ww2', 'Evakuasi Dunkirk (Operasi Dynamo)', '1940-05-26', 1940,
 '338.226 tentara Sekutu dievakuasi dari Dunkirk oleh 800+ kapal termasuk perahu sipil. Keputusan Hitler menghentikan Panzer selama 2 hari kritis memungkinkan evakuasi. Churchill menyebutnya "keajaiban" sambil mengingatkan "perang tidak dimenangkan dengan evakuasi."',
 'Winston Churchill, Lord Gort, Gerd von Rundstedt', 'Inggris, Prancis, Belgia, Jerman', 'event', 24),

('ww2', 'Jatuhnya Prancis', '1940-06-22', 1940,
 'Jerman menaklukkan Prancis dalam 6 minggu melalui Hutan Ardennes yang dianggap tidak bisa dilalui tank, memotong garis Maginot. Prancis menandatangani gencatan senjata di gerbong kereta api yang sama di mana Jerman menyerah 1918.',
 'Adolf Hitler, Heinz Guderian, Charles de Gaulle', 'Jerman, Prancis, Inggris, Belgia, Belanda', 'invasion', 25),

('ww2', 'Pertempuran Inggris (Battle of Britain)', '1940-07-10', 1940,
 'Kampanye udara besar pertama sepenuhnya oleh angkatan udara. Luftwaffe berusaha menghancurkan RAF sebagai persiapan invasi. Berkat radar dan pilot pejuang, RAF menang. Churchill: "Never was so much owed by so many to so few."',
 'Winston Churchill, Hugh Dowding, Hermann Göring', 'Inggris, Jerman', 'battle', 26),

('ww2', 'Blitz London', '1940-09-07', 1940,
 'Jerman memulai pengeboman sistematis kota-kota Inggris selama 8 bulan, terutama London. Lebih dari 30.000 warga sipil tewas dan 1 juta rumah hancur. Meskipun kehancuran masif, semangat rakyat Inggris justru menguat — "London can take it!" menjadi semboyan perlawanan.',
 'Winston Churchill, Hermann Göring, Arthur Harris', 'Jerman, Inggris', 'atrocity', 27),

('ww2', 'Operasi Barbarossa', '1941-06-22', 1941,
 'Invasi Jerman ke Uni Soviet — operasi militer darat terbesar dalam sejarah. 3,8 juta tentara Axis menyerbu sepanjang front 2.900 km. Awalnya sukses, namun terhenti di gerbang Moskow saat musim dingin brutal. Membuka dua front = kesalahan fatal Hitler.',
 'Adolf Hitler, Joseph Stalin, Georgy Zhukov', 'Jerman, Uni Soviet, Rumania, Finlandia', 'invasion', 28),

('ww2', 'Pertempuran Moskow', '1941-10-02', 1941,
 'Pertempuran Moskow (Oktober 1941 - Januari 1942) adalah upaya Jerman merebut ibu kota Soviet dalam Operasi Typhoon. Pasukan Jerman maju hingga 30 km dari Kremlin, tetapi musim dingin yang membekukan dan serangan balik Soviet di bawah Zhukov memaksa Wehrmacht mundur — kekalahan darat pertama Jerman dalam PD II.',
 'Georgy Zhukov, Fedor von Bock, Heinz Guderian', 'Jerman, Uni Soviet', 'battle', 29),

('ww2', 'Serangan Pearl Harbor', '1941-12-07', 1941,
 '353 pesawat Jepang dari 6 kapal induk menyerang Pearl Harbor, Hawaii. 4 kapal perang hancur, 2.403 tewas. Roosevelt menyebutnya "a date which will live in infamy." AS secara resmi masuk perang, membawa superpower industri terbesar dunia ke dalam konflik.',
 'Franklin D. Roosevelt, Isoroku Yamamoto', 'Jepang, Amerika Serikat', 'turning_point', 30),

('ww2', 'Jatuhnya Singapura', '1942-02-15', 1942,
 'Penyerahan Singapura kepada Jepang adalah kekalahan militer terbesar dalam sejarah Inggris. 80.000 tentara Sekutu menjadi tawanan perang. Jenderal Yamashita, dijuluki "Harimau Malaya," berhasil menaklukkan benteng Inggris ini dengan kekuatan yang lebih kecil melalui taktik pergerakan cepat melalui hutan.',
 'Tomoyuki Yamashita, Arthur Percival', 'Jepang, Inggris, Australia', 'battle', 31),

('ww2', 'Pertempuran Midway', '1942-06-04', 1942,
 'Titik balik Pasifik. Berkat pemecahan kode Jepang, AL AS menenggelamkan 4 kapal induk Jepang (Akagi, Kaga, Soryu, Hiryu). AS kehilangan 1 kapal induk (Yorktown). Setelah Midway, inisiatif strategis beralih ke AS.',
 'Chester Nimitz, Raymond Spruance, Isoroku Yamamoto', 'AS, Jepang', 'turning_point', 32),

('ww2', 'Pertempuran Guadalcanal', '1942-08-07', 1942,
 'Ofensif darat besar pertama Sekutu melawan Jepang di Pasifik Selatan. Marinir AS merebut pulau dalam pertempuran brutal di hutan tropis selama 6 bulan. Kemenangan ini membuktikan Jepang bisa dikalahkan di darat.',
 'Alexander Vandegrift, Harukichi Hyakutake', 'AS, Jepang', 'battle', 33),

('ww2', 'Pertempuran Stalingrad', '1942-08-23', 1942,
 'Pertempuran paling berdarah dalam sejarah — hampir 2 juta korban. Pertempuran jarak dekat brutal dari rumah ke rumah. Operasi Uranus Soviet mengepung Tentara Ke-6 Jerman. Paulus menyerah Feb 1943 dengan 91.000 prajurit — titik balik definitif PD II di Eropa.',
 'Friedrich Paulus, Vasily Chuikov, Georgy Zhukov', 'Jerman, Uni Soviet', 'turning_point', 34),

('ww2', 'Pertempuran El Alamein Kedua', '1942-10-23', 1942,
 'Titik balik di Afrika Utara. Montgomery memimpin Tentara Ke-8 Inggris melawan Afrika Korps Rommel. Setelah 12 hari, Rommel mundur. Churchill: "Before Alamein we never had a victory. After Alamein we never had a defeat."',
 'Bernard Montgomery, Erwin Rommel', 'Inggris, Jerman, Italia', 'turning_point', 35),

('ww2', 'Pertempuran Kursk', '1943-07-05', 1943,
 'Pertempuran tank terbesar dalam sejarah — 6.000 tank, 4.000 pesawat, 2 juta tentara. Jerman melancarkan Operasi Citadel tetapi intelijen Soviet telah mengetahui rencana serangan. Setelah Kursk, Jerman tidak pernah lagi mampu melancarkan ofensif strategis di Front Timur.',
 'Georgy Zhukov, Erich von Manstein, Walter Model', 'Uni Soviet, Jerman', 'battle', 36),

('ww2', 'Pendaratan Sekutu di Sisilia', '1943-07-09', 1943,
 'Operasi Husky: 160.000 tentara, 600 tank, 3.000 pesawat. Keberhasilan menyebabkan jatuhnya Mussolini (25 Juli) dan kapitulasi Italia (September). Italia berganti pihak dan menyatakan perang pada Jerman.',
 'Dwight Eisenhower, Bernard Montgomery, George Patton', 'AS, Inggris, Kanada, Italia, Jerman', 'invasion', 37),

('ww2', 'Hari-D: Pendaratan Normandia', '1944-06-06', 1944,
 'Invasi amfibi terbesar dalam sejarah. 156.000 tentara Sekutu menyerbu 5 pantai Normandia (Utah, Omaha, Gold, Juno, Sword). Omaha Beach menjadi paling berdarah. D-Day membuka Front Barat kedua dan memulai pembebasan Eropa.',
 'Dwight Eisenhower, Bernard Montgomery, Omar Bradley, Erwin Rommel', 'AS, Inggris, Kanada, Prancis Bebas, Jerman', 'invasion', 38),

('ww2', 'Pembebasan Paris', '1944-08-25', 1944,
 'Setelah 4 tahun pendudukan, Paris dibebaskan oleh Divisi Lapis Baja ke-2 Prancis Bebas dan Divisi Infanteri ke-4 AS. Jenderal von Choltitz mengabaikan perintah Hitler untuk menghancurkan kota. De Gaulle memimpin parade kemenangan di Champs-Elysees.',
 'Charles de Gaulle, Philippe Leclerc, Dietrich von Choltitz', 'Prancis, AS, Jerman', 'event', 39),

('ww2', 'Pertempuran Leyte Gulf', '1944-10-23', 1944,
 'Pertempuran laut terbesar dalam sejarah — melibatkan 367 kapal dan 1.843 pesawat. AS menghancurkan sisa kekuatan laut Jepang di Filipina. Pertempuran ini juga menyaksikan penggunaan pertama taktik kamikaze secara terorganisir oleh Angkatan Laut Jepang.',
 'William Halsey, Thomas Kinkaid, Takeo Kurita', 'AS, Jepang, Australia', 'battle', 40),

('ww2', 'Pertempuran Bulge', '1944-12-16', 1944,
 'Ofensif besar terakhir Jerman di Front Barat. 250.000 tentara menyerang di Ardennes dalam musim dingin brutal, menciptakan tonjolan 80 km. Perlawanan heroik AS di Bastogne dan serangan balik Patton menghancurkan ofensif ini.',
 'Dwight Eisenhower, George Patton, Anthony McAuliffe', 'AS, Inggris, Jerman', 'battle', 41),

('ww2', 'Holocaust: Pembebasan Auschwitz', '1945-01-27', 1945,
 'Tentara Merah membebaskan Auschwitz-Birkenau — kamp pemusnahan terbesar Nazi. 1,1 juta orang dibunuh di sini, sebagian besar Yahudi. Total Holocaust menewaskan 6 juta Yahudi dan jutaan korban lainnya. 27 Januari kini Hari Peringatan Holocaust Internasional.',
 'Ivan Konev, Heinrich Himmler, Rudolf Höss', 'Uni Soviet, Jerman', 'atrocity', 42),

('ww2', 'Konferensi Yalta', '1945-02-04', 1945,
 'Pertemuan "Tiga Besar" — Roosevelt, Churchill, Stalin — membahas reorganisasi pasca-perang Eropa: pembagian Jerman, pembentukan PBB, dan janji pemilihan bebas di Eropa Timur (tidak ditepati). Konferensi ini menanam benih Perang Dingin.',
 'Franklin D. Roosevelt, Winston Churchill, Joseph Stalin', 'AS, Inggris, Uni Soviet', 'treaty', 43),

('ww2', 'Pertempuran Iwo Jima', '1945-02-19', 1945,
 'Marinir AS menyerbu pulau vulkanik yang dipertahankan 21.000 tentara Jepang dalam jaringan terowongan. Hanya 216 Jepang selamat sebagai tawanan. Foto pengibaran bendera di Gunung Suribachi menjadi foto perang paling ikonik sepanjang masa.',
 'Holland Smith, Tadamichi Kuribayashi', 'AS, Jepang', 'battle', 44),

('ww2', 'Pertempuran Okinawa', '1945-04-01', 1945,
 'Pertempuran darat terbesar di Pasifik. 180.000 vs 100.000. Terkenal karena 1.900+ pesawat kamikaze. 100.000-150.000 warga sipil tewas. Besarnya korban menjadi faktor keputusan Truman menggunakan bom atom.',
 'Simon Bolivar Buckner Jr., Mitsuru Ushijima', 'AS, Jepang', 'battle', 45),

('ww2', 'Pertempuran Berlin & Bunuh Diri Hitler', '1945-04-30', 1945,
 '2,5 juta tentara Soviet mengepung Berlin. Hitler bunuh diri di bunkernya bersama Eva Braun pada 30 April saat Soviet berjarak ratusan meter. Bendera Soviet dikibarkan di gedung Reichstag.',
 'Adolf Hitler, Eva Braun, Georgy Zhukov, Ivan Konev', 'Uni Soviet, Jerman', 'surrender', 46),

('ww2', 'V-E Day: Kemenangan di Eropa', '1945-05-08', 1945,
 'Penyerahan tanpa syarat seluruh pasukan Jerman mengakhiri PD II di Eropa. Kapitulasi ditandatangani Jodl di Reims (7 Mei) dan Keitel di Berlin (8 Mei). Perayaan massal di seluruh Eropa, namun perang berlanjut di Pasifik.',
 'Alfred Jodl, Wilhelm Keitel, Dwight Eisenhower', 'Sekutu, Jerman', 'surrender', 47),

('ww2', 'Bom Atom Hiroshima dan Nagasaki', '1945-08-06', 1945,
 'B-29 "Enola Gay" menjatuhkan "Little Boy" di Hiroshima (6 Agustus, 140.000 korban) dan "Fat Man" di Nagasaki (9 Agustus, 70.000 korban). Satu-satunya penggunaan senjata nuklir dalam perang. Keputusan kontroversial Truman untuk menghindari invasi darat.',
 'Harry S. Truman, Paul Tibbets, Emperor Hirohito', 'AS, Jepang', 'turning_point', 48),

('ww2', 'Konferensi Potsdam', '1945-07-17', 1945,
 'Pertemuan terakhir Tiga Besar — Truman, Stalin, dan Attlee. Menetapkan demiliterisasi dan denazifikasi Jerman. Deklarasi Potsdam menuntut penyerahan tanpa syarat Jepang, mengancam "kehancuran total" — rujukan terselubung pada bom atom.',
 'Harry S. Truman, Joseph Stalin, Clement Attlee', 'AS, Uni Soviet, Inggris', 'treaty', 49),

('ww2', 'V-J Day: Jepang Menyerah', '1945-09-02', 1945,
 'Upacara penyerahan di USS Missouri, Teluk Tokyo. PD II resmi berakhir. Total korban 70-85 juta jiwa — konflik paling mematikan dalam sejarah umat manusia. Dunia memasuki era baru: senjata nuklir, PBB, dan Perang Dingin.',
 'Douglas MacArthur, Mamoru Shigemitsu, Emperor Hirohito, Chester Nimitz', 'Jepang, AS, Inggris, Uni Soviet, China', 'surrender', 50);
