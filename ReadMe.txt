TicketAppCase - İhsan Kenan Pala

- cmd üzerinden "mkdir TicketAppCase" kodu ile klasörü oluşturuyoruz.
- sonrasında "cd TicketAppCase" kodu ile dosyaya giriş yapıyoruz.
- "expo init TicketAppCase" ile projeyi oluşturuyoruz.
- cmd üzerinden "npx expo start" komutu ile çalıştırıyoruz.
- cep telefonundan da Expo uygulamasına giriş yapıyoruz. Bu sayede uygulama telefonda gözükür hale gelecektir.

Uygulamayı geliştirirken kullandığım paket kodları:
- "npm install react-native-responsive-screen"
- "npm install @react-native-picker/picker"
- "npm install @react-native-community/datetimepicker"
- "npm install @react-navigation/native @react-navigation/drawer react-native-reanimated react-native-gesture-handler react-native-screens"
- "npm install react-native-vector-icons"
- "npm install react-native-toast-message"
    
Kullanılan Sürümler:
-Node.js = "v18.16.0" sürümünü kullandım
-React Native = "0.72.4" sürümünü kullandım

Bilgiler:

- Projemi VSCode üzerinden kodladım. Uygulamayı ise telefonumdan Expo üzerinden kontrol ettim. Telefonumda uygulama sorunsuz çalışıyor,
kendi telefonum hariç 3 android cihaz ile denedim. IOS cihazım olmadığı için bir IOS cihazda deneyemedim.
- Uygulamaya girişte doldurulacak kısımlar eğer hatalıysa inputlar kırmızı yanıyor. 2 kullanıcı ekledim;
1.Kullanıcı Mail = kullanici@gmail.com	Şifre = 12345
2.Kullanıcı Mail = kullanici2@gmail.com	Şifre = 12345
- Uygulamanın Üye Ol kısmıda mevcuttur. Burada kullanıcı sisteme üye olabilir. (Veritabanı kullanılmadı). Doldurulmayan yerler varsa uygulama
uyarı vermektedir.
- Kullanıcı giriş yaptıktan sonra Bilet Ara sayfasına yönlenir. Bu sayfadan nereden nereye şehirlerini seçebilir ve aynı zamanda tarihi de seçebilir.
Bu sayfadan sadece Gidiş veya Gidiş-Dönüş butonu ekledim. Statik olarak kodların içine İstanbul ve Ankara arası sefer, İzmir ve Antalya arası sefer ekledim. İstanbul ve Ankara arası Gidiş: 5 Eylül 2023 Dönüş: 8 Eylül 2023 olarak ekledim. Sayfaya gelindiğinde tarih zaten default olarak seçilmiş olacaktır. İzmir ve Antalya arası içinse 
Gidiş: 7 Eylül 2023 Dönüş: 12 Eylül 2023 olarak ekledim. Ara butonuna basıldığında eğer uygun işaretlemeler yapılmadıysa, uygulama mesaj verir. Uygunsa diğer sayfaya geçiş yapar.
- Kullanıcı bu sayfada Uygun Seferleri görür. Nereden-Nereye, Firma Adı, Saat, Boş Koltuk ve Fiyat bilgileri kullanıcıya listelenir. Kendisine uygun olan seferi seçtiğinde o seferin altında Seç butonu çıkar. Seç butonuna tıklanıldığında Sefer Detayları sayfasına yönlendirilir.
- Kullanıcı Sefer Detayları sayfasına geldiğinde boş koltukları görebilir. Boş koltukların herhangi birine tıkladığında cinsiyet bilgisi sorar. Tıklanan cinsiyete göre koltuk
o ikonda (erkek veya kadın) gözükecek şekilde ayarlanmıştır. Koltukların doluluğu random olarak atanmaktadır. Sayfanın üst kısmında sefer detayları gözükür (Firma Adı, Tarih ve Koltuk Fiyatı). Seçmiş olduğunuz koltuğa tekrar tıklar iseniz o koltuğu iptal eder ama dolu gösterir. Alt kısımda Yolcu TC ve Seçilen Koltuk kutuları vardır. Yolcu TC sini girmeden sayfadan ilerleyemez hata verir. Ve sadece numerik klavye açılır ve 11 hane ile sınırlıdır. Seçilen koltuklar kutunun içerisinde gözükür. En fazla 5 koltuk seçebilir. Kullanıcı 6.yı seçerse toast mesajı verir. Seçtiği koltuk sayısına göre fiyat aşağıda güncellenir, koltuk iptal ederse de güncellenir. Satın Al butonuna tıklanıldığında Ödeme Sayfasına yönlendirilir.
- Ödeme sayfasına kredi kartı bilgilerinin isteneceği bir şablon karşılar. Kullanıcıdan Kart Üzerindeki İsim, Kart Numarası, Son Kullanma Tarihi (MM/YY) ve CVC/CV2 istenir.
Kart Numarası 16 hane ile sınırlıdır ve numerik klavye açılır. Son Kullanma Tarihide 4 hane ile sınırlıdır ve "/" atar ve numerik klavye açılır. CVC de 3 hane ile sınırlıdır ve numerik klavye açılır. Ödemeyi Tamamla denildiğinde bir spiner döner (1 saniye). Sonrasında Başarılı Alert i gelir ve mesaj olarakta "Ödeme İşlemi Tamamlandı" mesajını verir. Tamam butonuna tıklanıldığında kullanıcıyı anasayfaya yönlendirir.
- Uygulamanın çalışmasını olumsuz etkiyelen bir neden olmadığı için App.js dosyasında LogBox kullandım. (Tarih ile alakalı bir uyarı verdiği için)
