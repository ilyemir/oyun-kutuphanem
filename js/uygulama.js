function oyunlariGetir() {
    const kayitliOyunlar = localStorage.getItem('oyunKutuphanem');
    return kayitliOyunlar ? JSON.parse(kayitliOyunlar) : [];
}

function oyunlariKaydet(oyunListesi) {
    localStorage.setItem('oyunKutuphanem', JSON.stringify(oyunListesi));
}

function oyunEkle(baslik, kategori, durum, puan, not) {
    const oyunlar = oyunlariGetir();

    const yeniOyun = {
        id: Date.now(),
        baslik: baslik,
        kategori: kategori,
        durum: durum,
        puan: puan !== '' && puan !== null ? Number(puan) : null,
        not: not || ''
    };

    oyunlar.push(yeniOyun);
    oyunlariKaydet(oyunlar);
}

function oyunSil(oyunId) {
    let oyunlar = oyunlariGetir();
    oyunlar = oyunlar.filter(oyun => oyun.id !== oyunId);
    oyunlariKaydet(oyunlar);
}

function oyunDurumGuncelle(oyunId, yeniDurum) {
    const oyunlar = oyunlariGetir();
    const oyun = oyunlar.find(o => o.id === oyunId);
    if (oyun) {
        oyun.durum = yeniDurum;
        oyunlariKaydet(oyunlar);
    }
}

function oyunPuanGuncelle(oyunId, yeniPuan) {
    const oyunlar = oyunlariGetir();
    const oyun = oyunlar.find(o => o.id === oyunId);
    if (oyun) {
        const sayisalPuan = Number(yeniPuan);
        if (yeniPuan === '' || isNaN(sayisalPuan)) {
            oyun.puan = null;
        } else if (sayisalPuan >= 1 && sayisalPuan <= 10) {
            oyun.puan = sayisalPuan;
        }
        oyunlariKaydet(oyunlar);
    }
}

function ornekOyunlariYukle() {
    const mevcutOyunlar = oyunlariGetir();
    const baslangicZamani = Date.now();
    const ornekListe = [
        {
            id: baslangicZamani + 1,
            baslik: 'The Witcher 3: Wild Hunt',
            kategori: 'RPG, Açık Dünya',
            durum: 'Bitti',
            puan: 10,
            not: 'Ana hikaye ve ek paketler tamamlandı.'
        },
        {
            id: baslangicZamani + 2,
            baslik: 'Cyberpunk 2077',
            kategori: 'RPG, Aksiyon',
            durum: 'Bitti',
            puan: 9,
            not: 'Phantom Liberty genişleme paketi ile birlikte bitirildi.'
        },
        {
            id: baslangicZamani + 3,
            baslik: 'Metro Exodus Enhanced Edition',
            kategori: 'FPS, Açık Dünya, Hayatta Kalma',
            durum: 'Oynanıyor',
            puan: 8,
            not: 'Hazar bölümü devam ediyor.'
        },
        {
            id: baslangicZamani + 4,
            baslik: 'Celeste',
            kategori: 'Indie, Platform',
            durum: 'Bitti',
            puan: 9,
            not: 'Tüm ana bölümler tamamlandı.'
        },
        {
            id: baslangicZamani + 5,
            baslik: 'Baldur\'s Gate 3',
            kategori: 'CRPG, Strateji',
            durum: 'İstek Listesi',
            puan: null,
            not: 'Dönem sonu projeleri sonrasında başlanacak.'
        }
    ];

    oyunlariKaydet(mevcutOyunlar.concat(ornekListe));
}

function temayiUygula() {
    const kayitliTema = localStorage.getItem('oyunKutuphanemTema');
    const temaButonu = document.getElementById('temaButonu');

    if (kayitliTema === 'acik') {
        document.body.classList.add('acik-tema');
        if (temaButonu) {
            temaButonu.textContent = 'Koyu Tema';
        }
    } else {
        document.body.classList.remove('acik-tema');
        if (temaButonu) {
            temaButonu.textContent = 'Açık Tema';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    temayiUygula();
    const temaButonu = document.getElementById('temaButonu');
    if (temaButonu) {
        temaButonu.addEventListener('click', function() {
            document.body.classList.toggle('acik-tema');
            const acikMi = document.body.classList.contains('acik-tema');
            localStorage.setItem('oyunKutuphanemTema', acikMi ? 'acik' : 'koyu');
            temaButonu.textContent = acikMi ? 'Koyu Tema' : 'Açık Tema';
        });
    }
});