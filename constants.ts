import { Language, Product, Translations, Category, Review, Store, NavigationCategory, ProductGender } from './types';
import { BabyBottleIcon, StrollerIcon, ClothesIcon, ToysIcon, DiapersIcon, FoodIcon, SkincareIcon, FurnitureIcon, ChevronLeftIcon, ChevronRightIcon } from './components/Icons';

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

export const INITIAL_PRODUCTS: Product[] = [
    {
      id: 1,
      name: { ru: 'Детская коляска 3-в-1', kk: '3-і 1-де балалар арбасы' },
      sku: 'BF-STRL-001',
      price: 259990,
      oldPrice: 299990,
      images: ['https://images.pexels.com/photos/3933033/pexels-photo-3933033.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/3998132/pexels-photo-3998132.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.8,
      reviewCount: 124,
      availability: 'in-stock',
      stockCount: 5,
      brand: 'Chicco',
      category: 'kids_strollers',
      gender: ProductGender.UNISEX,
      description: {
        ru: 'Универсальная коляска для детей с рождения до 3 лет. Включает люльку, прогулочный блок и автокресло. Легкая алюминиевая рама и большие колеса обеспечивают комфорт на любой дороге.',
        kk: 'Туғаннан 3 жасқа дейінгі балаларға арналған әмбебап арба. Бесік, серуендеу блогы және автокресло кіреді. Жеңіл алюминий жақтауы мен үлкен дөңгелектері кез келген жолда жайлылықты қамтамасыз етеді.'
      },
      specs: { 'Вес': { ru: '12 кг', kk: '12 кг' }, 'Цвет': { ru: 'Синий', kk: 'Көк' } },
      isNewArrival: true,
      isBestSeller: true,
      dateAdded: '2024-05-20T10:00:00Z',
    },
    {
      id: 2,
      name: { ru: 'Подгузники-трусики (Размер 4)', kk: 'Іш киім-жөргектер (4-мөлшер)' },
      sku: 'BF-DPR-004',
      price: 8990,
      images: ['https://images.pexels.com/photos/7283405/pexels-photo-7283405.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/7699681/pexels-photo-7699681.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.9,
      reviewCount: 580,
      availability: 'in-stock',
      stockCount: 50,
      brand: 'Pampers',
      category: 'kids_diapers',
      gender: ProductGender.UNISEX,
      description: {
        ru: 'Мягкие и впитывающие подгузники-трусики для активных малышей. Легко надевать и снимать. Упаковка 82 шт.',
        kk: 'Белсенді сәбилерге арналған жұмсақ және сіңіргіш іш киім-жөргектер. Киюге және шешуге оңай. 82 данадан тұратын қаптама.'
      },
      specs: { 'Количество': { ru: '82 шт', kk: '82 дана' }, 'Вес ребенка': { ru: '9-14 кг', kk: '9-14 кг' } },
      isNewArrival: false,
      isBestSeller: true,
      dateAdded: '2024-05-01T10:00:00Z',
    },
    {
      id: 3,
      name: { ru: 'Развивающий коврик', kk: 'Дамытушы кілемше' },
      sku: 'BF-TOY-015',
      price: 24990,
      images: ['https://images.pexels.com/photos/8472733/pexels-photo-8472733.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/163037/play-plane-colorful-color-163037.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.7,
      reviewCount: 88,
      availability: 'in-stock',
      stockCount: 12,
      brand: 'Fisher-Price',
      category: 'toys_infant',
      gender: ProductGender.UNISEX,
      description: {
        ru: 'Яркий коврик с дугами, подвесными игрушками и музыкальной панелью. Стимулирует развитие моторики и органов чувств.',
        kk: 'Доғалары, аспалы ойыншықтары және музыкалық панелі бар жарқын кілемше. Моторика мен сезім мүшелерінің дамуын ынталандырады.'
      },
      specs: { 'Возраст': { ru: '0+', kk: '0+' }, 'Материал': { ru: 'Текстиль, пластик', kk: 'Текстиль, пластик' } },
      isNewArrival: true,
      isBestSeller: false,
      dateAdded: '2024-05-22T10:00:00Z',
    },
    {
      id: 4,
      name: { ru: 'Детское пюре "Яблоко"', kk: 'Балаларға арналған "Алма" езбесі' },
      sku: 'BF-FOOD-001',
      price: 450,
      images: ['https://images.pexels.com/photos/5957597/pexels-photo-5957597.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 5.0,
      reviewCount: 312,
      availability: 'in-stock',
      stockCount: 100,
      brand: 'Gerber',
      category: 'kids_food',
      gender: ProductGender.UNISEX,
      description: {
        ru: 'Натуральное гипоаллергенное пюре из зеленых яблок. Без сахара, консервантов и красителей. Идеально для первого прикорма.',
        kk: 'Жасыл алмадан жасалған табиғи гипоаллергенді езбе. Қантсыз, консервантсыз және бояусыз. Алғашқы қосымша тамақтандыру үшін өте қолайлы.'
      },
      specs: { 'Объем': { ru: '80 г', kk: '80 г' }, 'Возраст': { ru: '4 мес+', kk: '4 ай+' } },
      isNewArrival: false,
      isBestSeller: false,
      dateAdded: '2024-04-15T10:00:00Z',
    },
    {
      id: 5,
      name: { ru: 'Женские джинсы', kk: 'Әйелдер джинсы' },
      sku: 'BF-CLTH-034',
      price: 18500,
      oldPrice: 22000,
      images: ['https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.6,
      reviewCount: 45,
      availability: 'on-order',
      brand: 'Levi\'s',
      category: 'women_jeans',
      description: {
        ru: 'Классические джинсы прямого кроя для женщин. Удобная посадка и качественный деним.',
        kk: 'Әйелдерге арналған классикалық тік пішілген джинсы. Ыңғайлы киіледі және сапалы денимнен жасалған.'
      },
      specs: { 'Материал': { ru: 'Деним', kk: 'Деним' } },
      sizes: ['26', '27', '28', '29', '30'],
      colors: [
        { ru: 'Голубой', kk: 'Көгілдір' },
        { ru: 'Синий', kk: 'Көк' },
        { ru: 'Черный', kk: 'Қара' }
      ],
      isNewArrival: false,
      isBestSeller: true,
      dateAdded: '2024-04-20T10:00:00Z',
    },
    {
      id: 6,
      name: { ru: 'Бутылочка для кормления', kk: 'Тамақтандыруға арналған бөтелке' },
      sku: 'BF-FEED-002',
      price: 5490,
      images: ['https://images.pexels.com/photos/134443/pexels-photo-134443.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.8,
      reviewCount: 250,
      availability: 'in-stock',
      stockCount: 40,
      brand: 'Avent',
      category: 'kids_feeding',
      gender: ProductGender.UNISEX,
      description: {
        ru: 'Антиколиковая бутылочка с соской, имитирующей грудь. Удобна для смешанного вскармливания. Объем 260 мл.',
        kk: 'Кеудеге ұқсайтын емізігі бар коликке қарсы бөтелке. Аралас тамақтандыруға ыңғайлы. Көлемі 260 мл.'
      },
      specs: { 'Объем': { ru: '260 мл', kk: '260 мл' }, 'Материал': { ru: 'Полипропилен, силикон', kk: 'Полипропилен, силикон' } },
      isNewArrival: false,
      isBestSeller: false,
      dateAdded: '2024-03-10T10:00:00Z',
    },
    {
        id: 7,
        name: { ru: 'Детский увлажняющий крем', kk: 'Балаларға арналған ылғалдандыратын крем' },
        sku: 'BF-SKCR-010',
        price: 3990,
        images: ['https://images.pexels.com/photos/7262911/pexels-photo-7262911.jpeg?auto=compress&cs=tinysrgb&w=600'],
        rating: 4.9,
        reviewCount: 180,
        availability: 'in-stock',
        stockCount: 30,
        brand: 'Mustela',
        category: 'beauty_skincare',
        description: {
            ru: 'Нежный крем для ежедневного ухода за чувствительной кожей малыша. Быстро впитывается и не оставляет жирной пленки.',
            kk: 'Нәрестенің сезімтал терісіне күнделікті күтім жасауға арналған нәзік крем. Жылдам сіңеді және майлы қабық қалдырмайды.'
        },
        specs: { 'Объем': { ru: '150 мл', kk: '150 мл' }, 'Тип кожи': { ru: 'Все типы', kk: 'Барлық типтер' } },
        isNewArrival: false,
        isBestSeller: true,
        dateAdded: '2024-05-11T10:00:00Z',
    },
    {
        id: 8,
        name: { ru: 'Детская кроватка-трансформер', kk: 'Балаларға арналған трансформер-кереует' },
        sku: 'BF-FURN-005',
        price: 89990,
        images: ['https://images.pexels.com/photos/1034571/pexels-photo-1034571.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/314420/pexels-photo-314420.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&w=600'],
        rating: 4.7,
        reviewCount: 55,
        availability: 'on-order',
        brand: 'Bambino',
        category: 'kids_furniture',
        gender: ProductGender.UNISEX,
        description: {
            ru: 'Кроватка растет вместе с вашим ребенком. Легко трансформируется из колыбели в подростковую кровать. Сделана из массива бука.',
            kk: 'Кереует сіздің балаңызбен бірге өседі. Бесіктен жасөспірімдер кереуетіне оңай ауысады. Бук ағашынан жасалған.'
        },
        specs: { 'Материал': { ru: 'Массив бука', kk: 'Бук ағашы' }, 'Размер спального места': { ru: '120x60 см', kk: '120x60 см' } },
        isNewArrival: true,
        isBestSeller: false,
        dateAdded: '2024-05-19T10:00:00Z',
    },
     {
      id: 9,
      name: { ru: 'Мужская куртка', kk: 'Ерлер күртесі' },
      sku: 'BF-CLTH-099',
      price: 25500,
      oldPrice: 32000,
      images: ['https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=600', 'https://images.pexels.com/photos/823193/pexels-photo-823193.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.8,
      reviewCount: 95,
      availability: 'in-stock',
      stockCount: 15,
      brand: 'Columbia',
      category: 'men_jackets',
      description: {
        ru: 'Теплая и стильная мужская куртка для холодной погоды.',
        kk: 'Суық ауа райына арналған жылы және сәнді ерлер күртесі.'
      },
      specs: { 'Материал': { ru: 'Полиэстер', kk: 'Полиэстер' } },
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { ru: 'Черный', kk: 'Қара' },
        { ru: 'Хаки', kk: 'Хаки' }
      ],
      isNewArrival: true,
      isBestSeller: true,
      dateAdded: '2024-05-23T10:00:00Z',
    },
    {
      id: 10,
      name: { ru: 'Платье для девочки', kk: 'Қыз балаға арналған көйлек' },
      sku: 'BF-KCLTH-001',
      price: 12990,
      images: ['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.8,
      reviewCount: 30,
      availability: 'in-stock',
      stockCount: 20,
      brand: 'Next',
      category: 'kids_dresses',
      gender: ProductGender.FEMALE,
      description: { ru: 'Легкое летнее платье для девочки с цветочным принтом.', kk: 'Гүлді принті бар қыз балаға арналған жеңіл жазғы көйлек.' },
      specs: { 'Материал': { ru: 'Хлопок', kk: 'Мақта' }, 'Сезон': { ru: 'Лето', kk: 'Жаз' } },
      sizes: ['110', '116', '122', '128'],
      colors: [
        { ru: 'Розовый', kk: 'Қызғылт' },
        { ru: 'Голубой', kk: 'Көгілдір' }
      ],
      isNewArrival: true,
      isBestSeller: false,
      dateAdded: '2024-05-24T10:00:00Z',
    },
    {
      id: 11,
      name: { ru: 'Футболка для мальчика', kk: 'Ұл балаға арналған футболка' },
      sku: 'BF-KCLTH-002',
      price: 5990,
      images: ['https://images.pexels.com/photos/1068205/pexels-photo-1068205.jpeg?auto=compress&cs=tinysrgb&w=600'],
      rating: 4.7,
      reviewCount: 50,
      availability: 'in-stock',
      stockCount: 35,
      brand: 'Zara Kids',
      category: 'kids_tshirts',
      gender: ProductGender.MALE,
      description: { ru: 'Стильная футболка для мальчика с принтом динозавра.', kk: 'Динозавр принті бар ұл балаға арналған сәнді футболка.' },
      specs: { 'Материал': { ru: 'Хлопок', kk: 'Мақта' } },
      sizes: ['98', '104', '110', '116'],
      colors: [
        { ru: 'Белый', kk: 'Ақ' },
        { ru: 'Синий', kk: 'Көк' }
      ],
      isNewArrival: true,
      isBestSeller: false,
      dateAdded: '2024-05-25T10:00:00Z',
    }
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
            '2gis': 'https://2gis.kz/astana/firm/70000001091371776?m=71.363626%2C51.135306%2F16',
            'yandex': 'https://yandex.kz/maps/ru/org/big_family/141315461077/?ll=71.364295%2C51.136035&z=16.48'
        }
    },
    {
        id: 2,
        address: 'ул. Сыганак, 16, Астана',
        hours: '09:00–22:00',
        maps: {
            '2gis': 'https://2gis.kz/astana/firm/70000001099669126?m=71.378047%2C51.129792%2F16',
            'yandex': 'https://yandex.kz/maps/ru/org/big_family/203342764623/?ll=71.378183%2C51.129490&z=16'
        }
    }
];

export const PROMO_CODES = {
    'FAMILY10': 0.10, // 10% discount
    'BIGSALE20': 0.20, // 20% discount
};