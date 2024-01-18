<!--
                                                                                  REDUX TOOLKIT GİRİŞ


npm i @reduxjs/toolkit react-redux

Başlattığımız projeye bu paketleri yükledikten sonra kurulum işlemlerimiz tamamlanmış oluyor.

Şimdi birkaç özellikle tanışalım daha sonra da bunları kullanmak için bir sayaç uygulaması kodlayalım.


 Actions ve Reducers Aynı Dosyada Nasıl Bulunuyor?

  Sadece Redux kullanırken actions ve reducers ve hatta action types için ayrı dosyalar ve/veya klasörler oluştururduk. Fakat Redux Toolkit’te işler değişiyor. Hepsi tek dosyada bulunuyor. Bu da createSlice metodu sayesinde oluyor.
  Bu metod: action types, action creators ve reducers’ımızı içinde barındırıyor. Bu bize inanılmaz bir kolaylık sağlıyor.

Şöyle bir örnek verelim :


const anythingSlice = createSlice({
    name: ‘some-name’,
    initialState: { // … },
    reducers: {
        anything: {// …}
    }
});
export const reducer = slice.reducer; //Reducer’ı dışarı aktarma
export const {anything} = slice.actions; //Actions’ı dışarı aktarma



Bu kod parçasında ne olduğunu açıklayalım:

1- name: Oluşturduğumuz slice’ın ismi.
2- initialState: Redux’ta oluşturduğumuz initialState ile aynı işlevi görüyor.
3- reducers: Tüm actions’ı içinde barındırıyor.

Temel olarak actions ve reducers’ımızı tek bir dosyada yukarıdaki gibi oluşturup dışarı aktarıyoruz.

 Store Ne İşe Yarıyor?

Bu sefer store’umuzu farklı bir metodla kullanıyoruz. O da configureStore. createStore, Redux Thunk ve Redux Devtool eklentisini bir arada tutmasıyla öne çıkıyor.


import { configureStore } from "@reduxjs/toolkit";
import anythingSlicefrom "./anythingSlice";
const store = configureStore({
 reducer: {
  anything: anythingSlice,
 },
});
export default store;



Bileşenlerimize Redux’ı Bağlayalım

Aslında bunu Hooks ile yapacağız. State’deki verileri okumak için useSelector kullanacağız ve actions’ımızı uygulamak için de useDispatch kullanacağız.

const anything= useSelector((state) => state.anything)
const dispatch = useDispatch()




                                                                                    COUNTER APP


Şimdi de burada okuduğumuz özellikleri bir arada kullanabileceğimiz bir örnek uygulama yapalım.Aynı uygulamayı kendi hesabınızda sıfırdan yapmanızı tavsiye ediyorum
Ne zaman yeni bir şey öğrensek ilk COUNTER uygulaması yapıyoruz dediğinizi işitir gibiyim.En yerinde ve en kolay şekilde öğrenmeyi bu uygulama sayesinde yapabiliriz.

Adım adım başlayalım

Codesandbox’ta bir react uygulaması açarak işe başlayalım. App.js dosyasının içini iyice temizledikten sonra gerekli paketleri yükleyelim. Yukarıda bahsettiğim paketler,tekrardan yazalım


npm i @reduxjs/toolkit react-redux


Sonra src klasörü altında yeni bir klasör açıyorum ve ismine de redux veriyorum. Bu klasörün içine de 2 dosya açıyorum. Biri store.js diğeri de counterSlice.js oluyor. Klasör yapımızın son halini hazır projeden görebilirsiniz


 counterSlice.js dosyasına kodlarımızı yazmaya başlayalım. Öncelikle createSlice metodumuzu @reduxjs/toolkit paketimizden çağıralım.


 import { createSlice } from “@reduxjs/toolkit”;


 Şimdi de createSlice’ı oluşturmaya başlayalım. name özelliğine “counter” veriyorum, initialState’e count: 0 şeklinde oluşturuyorum ve sonra da reducers’a geliyoruz.
 increment ve decrement adında iki action’ımızı reducer içerisinde oluşturduk ve bunlar birer state değeri aldı, bu state içerisindeki count’u 1 azaltıp 1 arttırdık.
 Son olarak createSlice metodu içerisine yazdıklarımız aşağıdaki gibi oluyor.



 export const counterSlice = createSlice({
    name: "counter",
    initialState: {
       count: 0
    },
    reducers: {
        increment: (state) => {
             state.count += 1;
        },
        decrement: (state) => {
             state.count -= 1;
        }
    }
});



counterSlice.js dosyamızda yapmamız gereken tek bir şey kaldı, o da reducers ve actions’ı export etmek. Hadi onu da yapalım.



export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;




Şimdi gelelim store.js dosyamızı yazmaya. Önce configureStore @reduxjs/toolkit paketinden çağıralım. Ve bir de counterSlice.js dosyamızdan default olarak export ettiğimiz reducers’ımızı counterReducer olarak çağıralım.



import { configureStore } from “@reduxjs/toolkit”;
import counterReducer from “./counter”;



Son işlem olarak da configureStore’umuzu kullanalım ve içine counterReducer’ımızı ekleyelim.




export default configureStore({
    reducer: {
       counter: counterReducer
    }
});




store.js dosyamızı yazmayı bitirdiğimize göre, şimdi redux’ı uygulamamıza bağlamaya geçelim. Önce index.js dosyasına geçiyoruz ve App bileşenimizi Provider ile sarmalıyoruz. index.js dosyamızın son durumu da aşağıdaki gibi oluyor.



import ReactDOM from “react-dom”;
import { Provider } from “react-redux”;
import App from “./App”;
import store from “./redux/store”;
const rootElement = document.getElementById(“root”);
ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>,
    rootElement
);



Geldik son kısma. App bileşenimizde oluşturduğumuz action ve state’imizi kullacağız şimdi. Öncelikle bileşenimiz içerisine bir <h2/> tagı ekliyoruz, bu tag içerisinde state’imizi görebileceğiz. İki tane de <button/> ekliyoruz, birinde sayacımızı arttırırken diğerinde azaltacağız.

State’imizden verileri çekebilmek için useSelector hook’umuzu kullanacağız ve dispatch işlemlerimiz için de useDispatch hook’umuzu kullanacağız. Bu hook’ları import ediyoruz ve son olarak counterSlice.js içinden decrement ve increment actions’ımızı aşağıdaki gibi import ediyoruz.



import { useDispatch, useSelector } from “react-redux”;
import { decrement, increment } from “./redux/counter”;



Şimdi bu hook’ları kullanmaya geçelim.


const { count } = useSelector((state) => state.counter);
const dispatch = useDispatch();


Oluşturduğumuz button’ların içerisine gelip onClick olayı oluşturuyoruz. Bunun içinde actions’ımızı kullanacağız dispatch ile beraber. Kullanımı da aşağıdaki gibi oluyor.



<button onClick={() => dispatch(increment())}>+</button>
<button onClick={() => dispatch(decrement())}>-</button>



Ve böylelikle COUNTER APP bitmiş oldu.  -->
