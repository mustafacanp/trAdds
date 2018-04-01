
function ek (metin, ekler) {

    ekler = ekler.replace(/\s/g, '');
    var ekler_dizisi = ekler.split(",");
    var cogul_mu = false;
    var kesme_isareti = false;
    var ozel_isim_mi = false;
    var yabanci_mi = false;
    
    var metin_dizisi = metin.split("|");

    if (!(typeof metin_dizisi[1] === "undefined")) {
        if (metin_dizisi[1] == "y") {
            yabanci_mi = true;
        }
    }

    metin = metin_dizisi[0];
    
    ekler_dizisi = ekleriSirala(ekler_dizisi);

    if (/^[A-Z]/.test(metin)) {
        metin = metin.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        ozel_isim_mi = true;
    }

    for (var i = 0; i < ekler_dizisi.length; i++) {
        if (ekler_dizisi[i] == "lar" || ekler_dizisi[i] == "ler") { metin = _ler(metin, ozel_isim_mi); cogul_mu = true; }
        if (ekler_dizisi[i] == "ın"  || ekler_dizisi[i] == "in"  || ekler_dizisi[i] == "un"  || ekler_dizisi[i] == "ün" ) { metin = _in(metin, ozel_isim_mi, yabanci_mi); }
        if (ekler_dizisi[i] == "a"   || ekler_dizisi[i] == "e"   || ekler_dizisi[i] == "u"   || ekler_dizisi[i] == "ü"  ) { metin = _e(metin, ozel_isim_mi, yabanci_mi); }
        if (ekler_dizisi[i] == "ı"   || ekler_dizisi[i] == "i"   || ekler_dizisi[i] == "u"   || ekler_dizisi[i] == "ü"  ) { metin = _i( metin, ozel_isim_mi, yabanci_mi); }
        if (ekler_dizisi[i] == "da"  || ekler_dizisi[i] == "de"  || ekler_dizisi[i] == "ta"  || ekler_dizisi[i] == "te" ||
            ekler_dizisi[i] == "dan" || ekler_dizisi[i] == "den" || ekler_dizisi[i] == "tan" || ekler_dizisi[i] == "ten") { metin = _de_den(metin, ekler_dizisi[i], ozel_isim_mi); }
    }

    return metin;


    function _ler (metin) { // Çokluk (Çoğul) Eki (-lar / -ler)
        
        if (ozel_isim_mi && !kesme_isareti) {
            metin = ozelIsim(metin, true);
            kesme_isareti = true;
        }

        if (metin.match(/[aıou]$|[aıou][bcçdfgğhjklmnprsştvwxyz']$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz]$/i)) {
            metin += "lar";
        } if (metin.match(/[eiöü]$|[eiöü][bcçdfgğhjklmnprsştvwxyz']$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz]$/i)) {
            metin += "ler";
        }

        return metin;
    }


    function _in (metin, ozel_isim_mi, yabanci_mi) { // İlgi (Tamlama) Ekleri (-ın / -in / -un / -ün)
        if (metin == "ben") { return "benim"; } // Özel Kural
        if (metin == "biz") { return "bizim"; } // Özel Kural
        if (metin.match(/.*[aeoueıiöü]$/i)) {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "n";
        } else {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            } else if (!ozel_isim_mi && !yabanci_mi) {
                metin = unsuzYumusamasi(metin);
            }
        }
        if (metin.match(/[aı].$|[aı][bcçdfgğhjklmnprsştvwxyz'].$|[aı][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "ın";
        } if (metin.match(/[ei].$|[ei][bcçdfgğhjklmnprsştvwxyz'].$|[ei][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "in";
        } if (metin.match(/[ou].$|[ou][bcçdfgğhjklmnprsştvwxyz'].$|[ou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "un";
        } if (metin.match(/[öü].$|[öü][bcçdfgğhjklmnprsştvwxyz'].$|[öü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "ün";
        }

        return metin;
    }


    function _e (metin, ozel_isim_mi, yabanci_mi) { // Yönelme durumu eki:(-e / -a)
        if (metin.match(/.*[aeoueıiöü]$/i)) {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "y";
        } else {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            } else if (!ozel_isim_mi && !yabanci_mi) {
                metin = unsuzYumusamasi(metin);
            }
        }
        if (metin.match(/(?=.*[aıou].$)|(?=.*[aıou]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz'].$)|(?=.*[aıou]...$)(?=.*[bcçdfgğhjklmnprsştvwxyz]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz].$)/i)) {
            metin += "a";
        } if (metin.match(/(?=.*[eiöü].$)|(?=.*[eiöü]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz'].$)|(?=.*[eiöü]...$)(?=.*[bcçdfgğhjklmnprsştvwxyz]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz].$)/i)) {
            metin += "e";
        }

        return metin;
    }


    function _i (metin, ozel_isim_mi, yabanci_mi) { // Belirtme durumu eki (-i / -ı / -u / -ü)
        if (metin.match(/.*[aeoueıiöü]$/i)) {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "y";
        } else {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            } else if (!ozel_isim_mi && !yabanci_mi) {
                metin = unsuzYumusamasi(metin);
            }
        }
        if (metin.match(/[aı].$|[aı][bcçdfgğhjklmnprsştvwxyz'].$|[aı][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "ı";
        } if (metin.match(/[ei].$|[ei][bcçdfgğhjklmnprsştvwxyz'].$|[ei][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "i";
        } if (metin.match(/[ou].$|[ou][bcçdfgğhjklmnprsştvwxyz'].$|[ou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "u";
        } if (metin.match(/[öü].$|[öü][bcçdfgğhjklmnprsştvwxyz'].$|[öü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "ü";
        }

        return metin;
    }


    function _de_den (metin, ek, ozel_isim_mi, yabanci_mi) { // Bulunma durumu eki: (-de / -da / -te / -ta) / Ayrılma (Çıkma) durumu eki: (-den / -dan / -ten / -tan)
        
        metin = metin;
        if (metin.match(/.*[çfhksştp]$/i)) {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "t";
        } else {
            if (ozel_isim_mi && !cogul_mu && !kesme_isareti) {
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "d";
        }
        if (metin.match(/[aıou].$|[aıou][bcçdfgğhjklmnprsştvwxyz'].$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$/i)) {
            metin += "a";
        } else if (metin.match(/[eiöü].$|[eiöü][bcçdfgğhjklmnprsştvwxyz'].$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$/i)) {
            metin += "e";
        }

        if (ek == "dan" || ek == "den" || ek == "tan" || ek == "ten") {
            return metin + "n";
        } else {
            return metin;
        }
    }

    function ozelIsim (ozel_isim, cogul_mu) {
        if (!cogul_mu) {
            ozel_isim += "'";
        }
        return ozel_isim;
    }

    function ekleriSirala (ekler_dizisi) {
        var temp_array = [], ordered_array = [];

        for (var i = 0; i < ekler_dizisi.length; i++) {
            if (ekler_dizisi[i] == "ler" || ekler_dizisi[i] == "lar") {
                temp_array.push(ekler_dizisi[i]);
                ekler_dizisi.splice(i,1);
            }
        }
        for (var i = 0; i < ekler_dizisi.length; i++) {
            if (ekler_dizisi[i] == "in" || ekler_dizisi[i] == "ın") {
                temp_array.push(ekler_dizisi[i]);
                ekler_dizisi.splice(i,1);
            }
        }

        ordered_array = temp_array.concat(ekler_dizisi);
        return ordered_array;
    }

    function unsuzYumusamasi (metin) {
        metin = metin.replace(/[ç]$/i, "c");
        metin = metin.replace(/[p]$/i, "b");
        metin = metin.replace(/[t]$/i, "d");
        if (metin.match(/[aeıioöuü][k]$/i)) {
            metin = metin.replace(/k$/, "ğ");
        }
        else if (metin.match(/[bcçdfgğhjklmnprsştvwxyz][k]$/i)) {
            metin = metin.replace(/k$/, "g");
        }
        return metin;
    }
}
