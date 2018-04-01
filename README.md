# trAdds

Kelime ve isim (ad) çekim eki verildiğinde kelimeyi ekiyle birlikte Türkçe yazım kurallarına göre yazan basit bir proje.

## Nasıl Kullanılır?

ek(kelime, 'ek1, ek2, ek3');

```
ek('ev', 'a, ın, lar');
// evlerine
```

### Çokluk (Çoğul) Eki (-ler / -lar)

```
ek('ev', 'lar') veya ek('ev', 'ler')
// evler
```

### İlgi (Tamlama) Ekleri (-in / -ın / -ün / -un)

```
ek('ev', 'ın') veya ek('ev', 'in')
```

### Durum (Hâl) Ekleri (-i, -e, -de, -den)

* **Belirtme durumu eki (-i / -ı / -ü / -u)**

```
ek('ev', 'i') veya ek('ev', 'ı') veya ek('ev', 'ü') veya ek('ev', 'u')
```

* **Yönelme durumu eki:(-e / -a)**

```
ek('ev', 'e') veya ek('ev', 'a')
```

* **Bulunma durumu eki: (-de / -da / -te / -ta)**

```
ek('ev', 'de') veya ek('ev', 'da') veya ek('ev', 'te') veya ek('ev', 'ta')
```

* **Ayrılma (Çıkma) durumu eki: (-den / -dan / -ten / -tan)**

```
ek('ev', 'den') veya ek('ev', 'dan') veya ek('ev', 'ten') veya ek('ev', 'tan')
```
