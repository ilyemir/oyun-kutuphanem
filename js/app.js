// LOCALSTORAGE VERİ OKUMA
function oyunlariGetir() {
    const kayitliOyunlar = localStorage.getItem('oyunKutuphanem');
    return kayitliOyunlar ? JSON.parse(kayitliOyunlar) : [];
}

// LOCALSTORAGE VERİ KAYDETME
function oyunlariKaydet(oyunListesi) {
    localStorage.setItem('oyunKutuphanem', JSON.stringify(oyunListesi));
}

// YENİ OYUN EKLEME
function oyunEkle(baslik, kategori, durum, puan) {
    const oyunlar = oyunlariGetir();

    const yeniOyun = {
        id: Date.now(),
        baslik: baslik,
        kategori: kategori,
        durum: durum,
        puan: puan || 'Puan Verilmedi'
    };

    oyunlar.push(yeniOyun);
    oyunlariKaydet(oyunlar);
}

// OYUN SİLME
function oyunSil(id) {
    let oyunlar = oyunlariGetir();
    oyunlar = oyunlar.filter(oyun => oyun.id !== id);
    oyunlariKaydet(oyunlar);
}

// OYUN DURUMU GÜNCELLEME
function oyunDurumGuncelle(id, yeniDurum) {
    const oyunlar = oyunlariGetir();
    const oyun = oyunlar.find(o => o.id === id);
    if (oyun) {
        oyun.durum = yeniDurum;
        oyunlariKaydet(oyunlar);
    }
}