
import { Language, Product, Translations, Category, Review, Store, NavigationCategory, ProductGender } from '../types';
import { BabyBottleIcon, StrollerIcon, ClothesIcon, ToysIcon, DiapersIcon, FoodIcon, SkincareIcon, FurnitureIcon } from './Icons';

export const i18n: Translations = {
  // Header
  searchPlaceholder: { ru: 'Поиск товаров и категорий...', kk: 'Тауарлар мен санаттарды іздеу...' },
  wishlist: { ru: 'Избранное', kk: 'Таңдаулылар' },
  cart: { ru: 'Корзина', kk: 'Себет' },
  profile: { ru: 'Профиль', kk: 'Профиль' },
  // Home
  heroTitle: { ru: 'Найдите всё для большой семьи!', kk: 'Үлкен отбасыңызға қажеттінің бәрі!' },
  heroSubtitle: { ru: 'Скидки до 30% на летнюю коллекцию', kk: 'Жазғы топтамаға 30% дейін жеңілдіктер' },
  shopNow: { ru: 'Купить сейчас', kk: 'Қазір сатып алу' },
  categories: { ru: 'Категории', kk: 'Санаттар' },
  newArrivals: { ru: 'Новинки', kk: 'Жаңа түсімдер' },
  bestSellers: { ru: 'Хиты продаж', kk: 'Хит сатылымдар' },
  discounts: { ru: 'Скидки', kk: 'Жеңілдіктер' },
  // Product Card
  addToCart: { ru: 'В корзину', kk: 'Себетке салу' },
  // Catalog
  filters: { ru: 'Фильтры', kk: 'Сүзгілер' },
  brand: { ru: 'Бренд', kk: 'Бренд' },
  price: { ru: 'Цена', kk: 'Бағасы' },
  availability: { ru: 'Наличие', kk: 'Қолжетімділік' },
  rating: { ru: 'Рейтинг', kk: 'Рейтинг' },
  clearFilters: { ru: 'Очистить', kk: 'Тазарту' },
  specialOffers: { ru: 'Особые отметки', kk: 'Арнайы белгілер' },
  all: { ru: 'Все', kk: 'Барлығы' },
  // Product Detail
  inStock: { ru: 'В наличии', kk: 'Қоймада бар' },
  onOrder: { ru: 'Под заказ', kk: 'Тапсырыс бойынша' },
  left: { ru: 'осталось', kk: 'қалды' },
  sku: { ru: 'Артикул', kk: 'Артикул' },
  description: { ru: 'Описание', kk: 'Сипаттамасы' },
  reviews: { ru: 'Отзывы', kk: 'Пікірлер' },
  shippingPayment: { ru: 'Доставка и оплата', kk: 'Жеткізу және төлеу' },
  productGender: { ru: 'Пол', kk: 'Жынысы' },
  gender_male: { ru: 'Мальчик', kk: 'Ұл' },
  gender_female: { ru: 'Девочка', kk: 'Қыз' },
  gender_unisex: { ru: 'Унисекс', kk: 'Унисекс' },
  chooseOptions: { ru: 'Выберите опции', kk: 'Опцияларды таңдаңыз' },
  // Cart
  shoppingCart: { ru: 'Корзина', kk: 'Себет' },
  product: { ru: 'Товар', kk: 'Тауар' },
  quantity: { ru: 'Количество', kk: 'Саны' },
  total: { ru: 'Итого', kk: 'Барлығы' },
  promoCode: { ru: 'Промокод', kk: 'Промокод' },
  apply: { ru: 'Применить', kk: 'Қолдану' },
  checkout: { ru: 'К оформлению', kk: 'Ресімдеуге' },
  emptyCart: { ru: 'Ваша корзина пуста', kk: 'Себетіңіз бос' },
  continueShopping: { ru: 'Продолжить покупки', kk: 'Сатып алуды жалғастыру' },
  // Stores
  ourStores: { ru: 'Наши магазины', kk: 'Біздің дүкендер' },
  // Footer
  contacts: { ru: 'Контакты', kk: 'Байланыс' },
  socialMedia: { ru: 'Мы в соцсетях', kk: 'Біз әлеуметтік желідеміз' },
  privacyPolicy: { ru: 'Политика конфиденциальности', kk: 'Құпиялылық саясаты' },
  faq: { ru: 'Часто задаваемые вопросы', kk: 'Жиі қойылатын сұрақтар' },
  // Checkout
  shipping: { ru: 'Доставка', kk: 'Жеткізу' },
  payment: { ru: 'Оплата', kk: 'Төлем' },
  orderSummary: { ru: 'Сводка по заказу', kk: 'Тапсырыс жиынтығы' },
  shippingAddress: { ru: 'Адрес доставки', kk: 'Жеткізу мекенжайы' },
  continueToPayment: { ru: 'Перейти к оплате', kk: 'Төлемге өту' },
  payNow: { ru: 'Оплатить сейчас', kk: 'Қазір төлеу' },
  orderSuccessTitle: { ru: 'Заказ успешно оформлен!', kk: 'Тапсырыс сәтті рәсімделді!' },
  orderSuccessMessage: { ru: 'Спасибо за покупку! Мы скоро свяжемся с вами для подтверждения деталей.', kk: 'Сатып алғаныңызға рақмет! Мәліметтерді растау үшін жақын арада сізбен хабарласамыз.' },
  backToHome: { ru: 'Вернуться на главную', kk: 'Басты бетке оралу' },
  yourOrderNumber: { ru: 'Номер вашего заказа', kk: 'Сіздің тапсырыс нөміріңіз' },

};

const clothingLinks = {
  women: [
    { name: { ru: 'Блузки и рубашки', kk: 'Блузкалар мен жейделер' }, path: '/catalog?category=women_blouses' },
    { name: { ru: 'Брюки', kk: 'Шалбарлар' }, path: '/catalog?category=women_pants' },
    { name: { ru: 'Джинсы', kk: 'Джинсы' }, path: '/catalog?category=women_jeans' },
    { name: { ru: 'Жилеты', kk: 'Жеңсіз күртелер' }, path: '/catalog?category=women_vests' },
    { name: { ru: 'Кардиганы и свитеры', kk: 'Кардигандар мен свитерлер' }, path: '/catalog?category=women_cardigans' },
    { name: { ru: 'Куртки и пальто', kk: 'Күртелер мен пальтолар' }, path: '/catalog?category=women_jackets' },
    { name: { ru: 'Платья и юбки', kk: 'Көйлектер мен юбкалар' }, path: '/catalog?category=women_dresses' },
    { name: { ru: 'Футболки и топы', kk: 'Футболкалар мен топтар' }, path: '/catalog?category=women_tshirts' },
  ],
  men: [
    { name: { ru: 'Рубашки', kk: 'Жейделер' }, path: '/catalog?category=men_shirts' },
    { name: { ru: 'Брюки', kk: 'Шалбарлар' }, path: '/catalog?category=men_pants' },
    { name: { ru: 'Джинсы', kk: 'Джинсы' }, path: '/catalog?category=men_jeans' },
    { name: { ru: 'Жилеты', kk: 'Жеңсіз күртелер' }, path: '/catalog?category=men_vests' },
    { name: { ru: 'Кардиганы и свитеры', kk: 'Кардигандар мен свитерлер' }, path: '/catalog?category=men_cardigans' },
    { name: { ru: 'Куртки', kk: 'Күртелер' }, path: '/catalog?category=men_jackets' },
    { name: { ru: 'Поло и футболки', kk: 'Поло мен футболкалар' }, path: '/catalog?category=men_tshirts' },
    { name: { ru: 'Толстовки', kk: 'Толстовкалар' }, path: '/catalog?category=men_hoodies' },
  ],
  kids: [
    { name: { ru: 'Боди и комбинезоны', kk: 'Боди мен комбинезондар' }, path: '/catalog?category=kids_bodysuits' },
    { name: { ru: 'Костюмы', kk: 'Костюмдер' }, path: '/catalog?category=kids_sets' },
    { name: { ru: 'Куртки', kk: 'Күртелер' }, path: '/catalog?category=kids_jackets' },
    { name: { ru: 'Платья и сарафаны', kk: 'Көйлектер мен сарафандар' }, path: '/catalog?category=kids_dresses' },
    { name: { ru: 'Футболки и шорты', kk: 'Футболкалар мен шортылар' }, path: '/catalog?category=kids_tshirts' },
  ],
};

const footwearLinks = {
  women: [
      { name: { ru: 'Кроссовки и кеды', kk: 'Кроссовкалар мен кедылар' }, path: '/catalog?category=women_sneakers' },
      { name: { ru: 'Туфли', kk: 'Туфлилер' }, path: '/catalog?category=women_heels' },
      { name: { ru: 'Лоферы и мокасины', kk: 'Лоферлер мен мокасиндер' }, path: '/catalog?category=women_loafers' },
      { name: { ru: 'Сандалии и шлепанцы', kk: 'Сандалдар мен шәркелер' }, path: '/catalog?category=women_sandals' },
      { name: { ru: 'Сапоги и ботинки', kk: 'Етіктер мен бәтеңкелер' }, path: '/catalog?category=women_boots' },
  ],
  men: [
      { name: { ru: 'Кроссовки и кеды', kk: 'Кроссовкалар мен кедылар' }, path: '/catalog?category=men_sneakers' },
      { name: { ru: 'Туфли', kk: 'Туфлилер' }, path: '/catalog?category=men_shoes' },
      { name: { ru: 'Мокасины', kk: 'Мокасиндер' }, path: '/catalog?category=men_loafers' },
      { name: { ru: 'Сандалии', kk: 'Сандалдар' }, path: '/catalog?category=men_sandals' },
      { name: { ru: 'Ботинки', kk: 'Бәтеңкелер' }, path: '/catalog?category=men_boots' },
  ],
   kids: [
      { name: { ru: 'Кроссовки и кеды', kk: 'Кроссовкалар мен кедылар' }, path: '/catalog?category=kids_sneakers' },
      { name: { ru: 'Сандалии', kk: 'Сандалдар' }, path: '/catalog?category=kids_sandals' },
      { name: { ru: 'Ботинки и сапоги', kk: 'Бәтеңкелер мен етіктер' }, path: '/catalog?category=kids_boots' },
      { name: { ru: 'Чешки', kk: 'Чешкилер' }, path: '/catalog?category=kids_slippers' },
  ],
};

const accessoriesLinks = {
    women: [
      { name: { ru: 'Сумки и рюкзаки', kk: 'Сөмкелер мен рюкзактар' }, path: '/catalog?category=women_bags' },
      { name: { ru: 'Головные уборы', kk: 'Бас киімдер' }, path: '/catalog?category=women_hats' },
      { name: { ru: 'Ремни', kk: 'Белдіктер' }, path: '/catalog?category=women_belts' },
      { name: { ru: 'Шарфы и платки', kk: 'Мойынорағыштар мен орамалдар' }, path: '/catalog?category=women_scarves' },
    ],
    men: [
      { name: { ru: 'Рюкзаки', kk: 'Рюкзактар' }, path: '/catalog?category=men_bags' },
      { name: { ru: 'Головные уборы', kk: 'Бас киімдер' }, path: '/catalog?category=men_hats' },
      { name: { ru: 'Ремни', kk: 'Белдіктер' }, path: '/catalog?category=men_belts' },
      { name: { ru: 'Перчатки', kk: 'Қолғаптар' }, path: '/catalog?category=men_gloves' },
    ],
    kids: [
      { name: { ru: 'Головные уборы', kk: 'Бас киімдер' }, path: '/catalog?category=kids_hats' },
      { name: { ru: 'Рюкзаки', kk: 'Рюкзактар' }, path: '/catalog?category=kids_bags' },
      { name: { ru: 'Шарфы и перчатки', kk: 'Мойынорағыштар мен қолғаптар' }, path: '/catalog?category=kids_scarves' },
    ],
};

export const NAVIGATION_DATA: NavigationCategory[] = [
  {
    id: 'women',
    name: { ru: 'Женское', kk: 'Әйелдерге' },
    path: '/catalog?gender=women',
    megaMenu: [
      { title: { ru: 'Новинки', kk: 'Жаңа' }, path: '/catalog?gender=women&tag=new', links: [] },
      { title: { ru: 'Одежда', kk: 'Киім' }, path: '/catalog?gender=women&category=clothing', links: clothingLinks.women },
      { title: { ru: 'Обувь', kk: 'Аяқ киім' }, path: '/catalog?gender=women&category=footwear', links: footwearLinks.women },
      { title: { ru: 'Аксессуары', kk: 'Аксессуарлар' }, path: '/catalog?gender=women&category=accessories', links: accessoriesLinks.women },
      { title: { ru: 'Sale', kk: 'Жеңілдік' }, path: '/catalog?gender=women&tag=sale', links: [] },
    ]
  },
  {
    id: 'men',
    name: { ru: 'Мужское', kk: 'Ерлерге' },
    path: '/catalog?gender=men',
    megaMenu: [
      { title: { ru: 'Новинки', kk: 'Жаңа' }, path: '/catalog?gender=men&tag=new', links: [] },
      { title: { ru: 'Одежда', kk: 'Киім' }, path: '/catalog?gender=men&category=clothing', links: clothingLinks.men },
      { title: { ru: 'Обувь', kk: 'Аяқ киім' }, path: '/catalog?gender=men&category=footwear', links: footwearLinks.men },
      { title: { ru: 'Аксессуары', kk: 'Аксессуарлар' }, path: '/catalog?gender=men&category=accessories', links: accessoriesLinks.men },
      { title: { ru: 'Sale', kk: 'Жеңілдік' }, path: '/catalog?gender=men&tag=sale', links: [] },
    ]
  },
  {
    id: 'kids',
    name: { ru: 'Детское', kk: 'Балаларға' },
    path: '/catalog?gender=kids',
    megaMenu: [
        { title: { ru: 'Новинки', kk: 'Жаңа' }, path: '/catalog?gender=kids&tag=new', links: [] },
        { title: { ru: 'Одежда', kk: 'Киім' }, path: '/catalog?gender=kids&category=clothing', links: clothingLinks.kids },
        { title: { ru: 'Обувь', kk: 'Аяқ киім' }, path: '/catalog?gender=kids&category=footwear', links: footwearLinks.kids },
        { title: { ru: 'Аксессуары', kk: 'Аксессуарлар' }, path: '/catalog?gender=kids&category=accessories', links: accessoriesLinks.kids },
        {
          title: { ru: 'Товары для малышей', kk: 'Сәбилерге арналған тауарлар' },
          links: [
            { name: { ru: 'Коляски', kk: 'Арбалар' }, path: '/catalog?category=kids_strollers' },
            { name: { ru: 'Подгузники', kk: 'Жөргектер' }, path: '/catalog?category=kids_diapers' },
            { name: { ru: 'Кормление', kk: 'Емшекпен емізу' }, path: '/catalog?category=kids_feeding' },
            { name: { ru: 'Детская мебель', kk: 'Балалар жиһазы' }, path: '/catalog?category=kids_furniture' },
            { name: { ru: 'Детское питание', kk: 'Балалар тағамы' }, path: '/catalog?category=kids_food' },
          ]
        },
        { title: { ru: 'Sale', kk: 'Жеңілдік' }, path: '/catalog?gender=kids&tag=sale', links: [] },
    ]
  },
  {
    id: 'home',
    name: { ru: 'Дом', kk: 'Үйге' },
    path: '/catalog?main_category=home',
    megaMenu: [
      {
        title: { ru: 'Текстиль для спальни', kk: 'Жатын бөлме тоқымасы' },
        links: [
          { name: { ru: 'Подушки', kk: 'Жастықтар' }, path: '/catalog?category=home_pillows' },
          { name: { ru: 'Пледы', kk: 'Жамылғылар' }, path: '/catalog?category=home_throws' },
          { name: { ru: 'Постельное белье', kk: 'Төсек-орын жабдықтары' }, path: '/catalog?category=home_bedding' },
        ]
      },
      {
        title: { ru: 'Текстиль для ванной', kk: 'Жуынатын бөлме тоқымасы' },
        links: [
          { name: { ru: 'Полотенца', kk: 'Сүлгілер' }, path: '/catalog?category=home_towels' },
          { name: { ru: 'Халаты', kk: 'Халаттар' }, path: '/catalog?category=home_robes' },
        ]
      },
      {
        title: { ru: 'Товары для кухни', kk: 'Ас үй тауарлары' },
        links: [
          { name: { ru: 'Кухонные принадлежности', kk: 'Ас үй жабдықтары' }, path: '/catalog?category=home_kitchenware' },
        ]
      },
      {
        title: { ru: 'Электроника', kk: 'Электроника' },
        links: [
          { name: { ru: 'Мелкая бытовая техника', kk: 'Шағын тұрмыстық техника' }, path: '/catalog?category=home_electronics' },
        ]
      }
    ]
  },
  {
    id: 'beauty',
    name: { ru: 'Красота', kk: 'Сұлулық' },
    path: '/catalog?main_category=beauty',
    megaMenu: [
       {
        title: { ru: 'Уход за телом', kk: 'Дене күтімі' },
        links: [
          { name: { ru: 'Для ванны и душа', kk: 'Ванна мен душқа арналған' }, path: '/catalog?category=beauty_bath' },
          { name: { ru: 'Уход за кожей', kk: 'Тері күтімі' }, path: '/catalog?category=beauty_skincare' },
          { name: { ru: 'Солнцезащитные средства', kk: 'Күннен қорғайтын құралдар' }, path: '/catalog?category=beauty_sunscreen' },
        ]
      },
      {
        title: { ru: 'Макияж и Парфюмерия', kk: 'Макияж және Парфюмерия' },
        links: [
          { name: { ru: 'Парфюмерия', kk: 'Парфюмерия' }, path: '/catalog?category=beauty_perfume' },
          { name: { ru: 'Макияж', kk: 'Макияж' }, path: '/catalog?category=beauty_makeup' },
          { name: { ru: 'Подарочные наборы', kk: 'Сыйлық жиынтықтары' }, path: '/catalog?category=beauty_sets' },
        ]
      }
    ]
  },
  {
    id: 'toys',
    name: { ru: 'Игрушки', kk: 'Ойыншықтар' },
    path: '/catalog?main_category=toys',
    megaMenu: [
      { title: {ru: 'Для малышей', kk: 'Сәбилерге арналған'}, path: '/catalog?category=toys_infant', links: []},
      { title: {ru: 'Конструкторы', kk: 'Конструкторлар'}, path: '/catalog?category=toys_construction', links: []},
      { title: {ru: 'Куклы', kk: 'Қуыршақтар'}, path: '/catalog?category=toys_dolls', links: []},
      { title: {ru: 'Мягкие игрушки', kk: 'Жұмсақ ойыншықтар'}, path: '/catalog?category=toys_plush', links: []},
      { title: {ru: 'Настольные игры', kk: 'Үстел ойындары'}, path: '/catalog?category=toys_boardgames', links: []},
    ]
  },
];


export const CATEGORIES: Category[] = [
    { id: 'strollers', name: { ru: 'Коляски', kk: 'Арбалар' }, icon: StrollerIcon },
    { id: 'diapers', name: { ru: 'Подгузники', kk: 'Жөргектер' }, icon: DiapersIcon },
    { id: 'toys', name: { ru: 'Игрушки', kk: 'Ойыншықтар' }, icon: ToysIcon },
    { id: 'food', name: { ru: 'Питание', kk: 'Тамақтандыру' }, icon: FoodIcon },
    { id: 'clothes', name: { ru: 'Одежда', kk: 'Киім' }, icon: ClothesIcon },
    { id: 'feeding', name: { ru: 'Кормление', kk: 'Емшекпен емізу' }, icon: BabyBottleIcon },
    { id: 'skincare', name: { ru: 'Уход', kk: 'Күтім' }, icon: SkincareIcon },
    { id: 'furniture', name: { ru: 'Мебель', kk: 'Жиһаз' }, icon: FurnitureIcon },
];

export const REVIEWS: Review[] = [
    { id: 1, author: 'Мария К.', rating: 5, text: 'Отличная коляска! Очень маневренная и красивая. Ребенку в ней комфортно.', date: '2024-05-15' },
    { id: 2, author: 'Айгерим С.', rating: 4, text: 'Коляска хорошая, но немного тяжеловата. В остальном все устраивает.', date: '2024-05-10' },
    { id: 3, author: 'Елена П.', rating: 5, text: 'Пользуемся уже полгода, никаких нареканий. Качество на высоте!', date: '2024-04-28' },
];

export const STORES: Store[] = [
    { 
        id: 1, 
        address: 'ул. Чингиз Айтматов, 36, Астана', 
        hours: '09:00–22:00',
        maps: {
            '2gis': 'https://2gis.kz/astana/firm/70000001032823025',
            'yandex': 'https://yandex.kz/maps/org/1085817345'
        }
    },
    {
        id: 2,
        address: 'ул. Сыганак, 16, Астана',
        hours: '09:00–22:00',
        maps: {
            '2gis': 'https://2gis.kz/astana/firm/70000001019349895',
            'yandex': 'https://yandex.kz/maps/org/1126639221'
        }
    }
];

export const PROMO_CODES = {
    'FAMILY10': 0.10, // 10% discount
    'BIGSALE20': 0.20, // 20% discount
};