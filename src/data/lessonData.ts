/**
 * Lesson Data & Curriculum Configuration
 * Subject: Đạo đức – Lớp 2 (Bộ sách Kết nối tri thức với cuộc sống)
 * Lesson: BẢO QUẢN ĐỒ DÙNG GIA ĐÌNH
 * Theme: NGÔI NHÀ NHỎ – KHO BÁU YÊU THƯƠNG (OUR FAMILY HOME)
 * Teacher: Nguyễn Thị Tuyết – Lớp 2A7 – Trường Tiểu học Đỗ Ngọc Du – Phân hiệu Ngô Thì Nhậm
 */

export interface TeacherInfo {
  teacherName: string;
  className: string;
  schoolName: string;
  subCampus: string;
  subject: string;
  bookSeries: string;
  lessonName: string;
  themeVi: string;
  themeEn: string;
}

export const TEACHER_INFO: TeacherInfo = {
  teacherName: 'Nguyễn Thị Tuyết',
  className: 'Lớp 2A7',
  schoolName: 'Trường Tiểu học Đỗ Ngọc Du',
  subCampus: 'Phân hiệu Ngô Thì Nhậm',
  subject: 'Đạo đức – Lớp 2',
  bookSeries: 'Kết nối tri thức với cuộc sống',
  lessonName: 'BẢO QUẢN ĐỒ DÙNG GIA ĐÌNH',
  themeVi: 'NGÔI NHÀ NHỎ – KHO BÁU YÊU THƯƠNG',
  themeEn: 'OUR FAMILY HOME'
};

export interface StageMeta {
  id: number;
  slug: string;
  nameVi: string;
  nameEn: string;
  shortDesc: string;
  teacherIntro: string;
  icon: string;
  badgeEarned?: string;
}

export const STAGES: StageMeta[] = [
  {
    id: 1,
    slug: 'the-home-door',
    nameVi: 'Cánh cửa ngôi nhà',
    nameEn: 'The Home Door',
    shortDesc: 'Khám phá 4 căn phòng kỳ diệu và đồ dùng quen thuộc',
    teacherIntro: 'Chào mừng các em đến với Trạm 1! Hãy mở từng căn phòng trong ngôi nhà kỳ diệu để khám phá những đồ dùng quen thuộc nhé!',
    icon: 'DoorOpen',
    badgeEarned: 'Nhà thám hiểm nhí'
  },
  {
    id: 2,
    slug: 'our-family-things',
    nameVi: 'Những người bạn trong nhà',
    nameEn: 'Our Family Things',
    shortDesc: 'Phân biệt việc Nên làm và Không nên làm',
    teacherIntro: 'Trạm 2 thử thách sự tinh mắt của các em! Hãy giúp các bạn nhỏ nhận biết việc NÊN LÀM và KHÔNG NÊN LÀM nhé!',
    icon: 'HeartHandshake',
    badgeEarned: 'Người bạn chu đáo'
  },
  {
    id: 3,
    slug: 'take-care',
    nameVi: 'Phép thuật bảo vệ',
    nameEn: 'Take Care!',
    shortDesc: 'Ghép hành động chăm sóc đúng cho từng đồ dùng',
    teacherIntro: 'Đây là trạm trọng tâm đầy phép thuật! Các đồ dùng đang cần sự chăm sóc của em. Hãy ghép đúng việc cần làm để đồ vật sáng bừng lên nhé!',
    icon: 'Sparkles',
    badgeEarned: 'Người bảo vệ đồ dùng'
  },
  {
    id: 4,
    slug: 'little-detectives',
    nameVi: 'Thám tử đồ dùng',
    nameEn: 'Little Detectives',
    shortDesc: 'Dùng kính lúp tìm hành động chưa đúng và sửa lại',
    teacherIntro: 'Các thám tử nhí hãy quan sát thật kỹ! Trong ngôi nhà có 3 hành động chưa đúng. Hãy tìm ra và giúp bạn sửa lại nhé!',
    icon: 'Search',
    badgeEarned: 'Thám tử tài ba'
  },
  {
    id: 5,
    slug: 'save-our-things',
    nameVi: 'Cứu đồ dùng gia đình',
    nameEn: 'Save Our Things!',
    shortDesc: 'Vượt qua 5 câu hỏi trắc nghiệm để giải cứu đồ dùng',
    teacherIntro: 'Năm đồ dùng quen thuộc đang chờ được giải cứu! Em hãy trả lời đúng các câu hỏi trắc nghiệm để đưa các bạn ấy về vị trí an toàn nhé!',
    icon: 'ShieldCheck',
    badgeEarned: 'Người giải cứu'
  },
  {
    id: 6,
    slug: 'my-home',
    nameVi: 'Ngôi nhà của em',
    nameEn: 'My Home',
    shortDesc: 'Chọn 3 việc tốt em cam kết thực hiện ở nhà',
    teacherIntro: 'Bây giờ, em hãy chọn 3 việc tốt mà em sẽ thực hiện tại gia đình mình để cùng bảo quản đồ dùng thật bền đẹp nhé!',
    icon: 'Home',
    badgeEarned: 'Em biết giữ gìn'
  },
  {
    id: 7,
    slug: 'our-happy-home',
    nameVi: 'Ngôi nhà yêu thương',
    nameEn: 'Our Happy Home',
    shortDesc: 'Tổng kết hành trình, 3 nguyên tắc vàng và nhận huy hiệu',
    teacherIntro: 'Chúc mừng các em đã xuất sắc hoàn thành toàn bộ hành trình! Ngôi nhà của chúng ta giờ đây đã sáng bừng và tràn ngập tình yêu thương!',
    icon: 'Award',
    badgeEarned: 'Chủ nhân ngôi nhà yêu thương'
  }
];

// Room & Items data for Stage 1
export interface RoomItem {
  id: string;
  nameVi: string;
  nameEn: string;
  pronunciationEn: string;
  soundTextVi: string;
  soundTextEn: string;
  roleDescription: string;
}

export interface RoomData {
  id: string;
  nameVi: string;
  nameEn: string;
  color: string;
  items: RoomItem[];
}

export const ROOMS_DATA: RoomData[] = [
  {
    id: 'living_room',
    nameVi: 'Phòng khách',
    nameEn: 'Living Room',
    color: 'from-amber-400 to-orange-400',
    items: [
      {
        id: 'chair',
        nameVi: 'Cái ghế',
        nameEn: 'Chair',
        pronunciationEn: 'Chair',
        soundTextVi: 'Cái ghế. Ghế giúp chúng mình ngồi êm ái khi trò chuyện và tiếp khách.',
        soundTextEn: 'Chair. It is a chair.',
        roleDescription: 'Giúp gia đình ngồi nghỉ ngơi, trò chuyện cùng nhau.'
      },
      {
        id: 'table',
        nameVi: 'Cái bàn',
        nameEn: 'Table',
        pronunciationEn: 'Table',
        soundTextVi: 'Cái bàn. Nơi đặt ấm chén và sinh hoạt chung của cả nhà.',
        soundTextEn: 'Table. It is a table.',
        roleDescription: 'Nơi để đồ uống, sách báo và đón tiếp khách quý.'
      },
      {
        id: 'fan',
        nameVi: 'Quạt máy',
        nameEn: 'Fan',
        pronunciationEn: 'Fan',
        soundTextVi: 'Quạt máy. Quạt đem lại làn gió mát lành cho cả gia đình trong ngày hè.',
        soundTextEn: 'Fan. It is an electric fan.',
        roleDescription: 'Tạo luồng gió mát giúp căn nhà luôn thoáng đãng.'
      },
      {
        id: 'tv',
        nameVi: 'Ti vi',
        nameEn: 'Television (TV)',
        pronunciationEn: 'Television',
        soundTextVi: 'Ti vi. Mang đến những chương trình thiếu nhi và tin tức bổ ích.',
        soundTextEn: 'Television. It is a television.',
        roleDescription: 'Thiết bị giải trí và học tập tin tức cho gia đình.'
      }
    ]
  },
  {
    id: 'kitchen',
    nameVi: 'Nhà bếp',
    nameEn: 'Kitchen',
    color: 'from-emerald-400 to-teal-500',
    items: [
      {
        id: 'cup',
        nameVi: 'Cái cốc',
        nameEn: 'Cup',
        pronunciationEn: 'Cup',
        soundTextVi: 'Cái cốc. Cốc dùng để đựng nước uống hằng ngày, cần cầm bằng hai tay.',
        soundTextEn: 'Cup. It is a cup.',
        roleDescription: 'Dùng đựng nước uống mát lành, cần cầm cẩn thận.'
      },
      {
        id: 'bowl',
        nameVi: 'Bát ăn cơm',
        nameEn: 'Bowl',
        pronunciationEn: 'Bowl',
        soundTextVi: 'Bát ăn cơm. Đựng những bữa cơm thơm ngon mẹ nấu, rất dễ vỡ nếu làm rơi.',
        soundTextEn: 'Bowl. It is a bowl.',
        roleDescription: 'Đựng cơm và thức ăn trong bữa cơm gia đình đầm ấm.'
      },
      {
        id: 'plate',
        nameVi: 'Cái đĩa',
        nameEn: 'Plate',
        pronunciationEn: 'Plate',
        soundTextVi: 'Cái đĩa. Đĩa sứ đựng hoa quả và món ăn, cần rửa sạch và xếp nhẹ nhàng.',
        soundTextEn: 'Plate. It is a plate.',
        roleDescription: 'Đựng thức ăn và hoa quả tươi ngon cho gia đình.'
      }
    ]
  },
  {
    id: 'bedroom',
    nameVi: 'Phòng ngủ',
    nameEn: 'Bedroom',
    color: 'from-indigo-400 to-purple-400',
    items: [
      {
        id: 'bed',
        nameVi: 'Giường ngủ',
        nameEn: 'Bed',
        pronunciationEn: 'Bed',
        soundTextVi: 'Giường ngủ. Nơi em có giấc ngủ ngon sau ngày dài học tập, không nên nhảy nhót trên giường.',
        soundTextEn: 'Bed. It is a bed.',
        roleDescription: 'Cho em giấc ngủ ngon lành và phục hồi sức khỏe.'
      },
      {
        id: 'wardrobe',
        nameVi: 'Tủ quần áo',
        nameEn: 'Wardrobe',
        pronunciationEn: 'Wardrobe',
        soundTextVi: 'Tủ quần áo. Giữ quần áo luôn sạch sẽ, gọn gàng và thơm tho.',
        soundTextEn: 'Wardrobe. It is a wardrobe.',
        roleDescription: 'Cất giữ quần áo phẳng phiu và ngăn nắp.'
      }
    ]
  },
  {
    id: 'study_corner',
    nameVi: 'Góc học tập',
    nameEn: 'Study Corner',
    color: 'from-rose-400 to-pink-500',
    items: [
      {
        id: 'desk',
        nameVi: 'Bàn học',
        nameEn: 'Study Desk',
        pronunciationEn: 'Desk',
        soundTextVi: 'Bàn học. Nơi em ngồi viết những bài học hay, cần giữ mặt bàn sạch đẹp không vẽ bậy.',
        soundTextEn: 'Desk. It is a study desk.',
        roleDescription: 'Nơi rèn luyện kiến thức, cần giữ mặt bàn sạch đẹp.'
      },
      {
        id: 'book',
        nameVi: 'Quyển sách',
        nameEn: 'Book',
        pronunciationEn: 'Book',
        soundTextVi: 'Quyển sách. Người bạn mở ra kho tàng tri thức, em hãy lật mở nhẹ nhàng nhé!',
        soundTextEn: 'Book. It is a book.',
        roleDescription: 'Người bạn thân thiết chứa đựng tri thức bao la.'
      },
      {
        id: 'school_supplies',
        nameVi: 'Đồ dùng học tập',
        nameEn: 'School Supplies',
        pronunciationEn: 'School supplies',
        soundTextVi: 'Đồ dùng học tập. Bút, thước, tẩy giúp em học tập thật tốt, học xong cần cất vào hộp bút.',
        soundTextEn: 'School supplies. Keep them tidy.',
        roleDescription: 'Các dụng cụ học tập hàng ngày của học sinh.'
      }
    ]
  }
];

// Stage 2 Situation Cards
export interface SituationCard {
  id: number;
  title: string;
  actionText: string;
  isGood: boolean; // true = Nên làm, false = Không nên làm
  explanation: string;
  englishPhrase: string;
  englishVoice: string;
}

export const SITUATION_CARDS: SituationCard[] = [
  {
    id: 1,
    title: 'Tình huống 1: Sử dụng ghế',
    actionText: 'Bạn nhỏ sử dụng ghế nhẹ nhàng, ngồi ngay ngắn.',
    isGood: true,
    explanation: 'Sử dụng ghế nhẹ nhàng giúp ghế bền hơn, không bị lung lay hay gãy hỏng.',
    englishPhrase: 'Good choice! Use it gently.',
    englishVoice: 'Good choice! Use it gently.'
  },
  {
    id: 2,
    title: 'Tình huống 2: Đọc sách',
    actionText: 'Bạn nhỏ gấp mép, vò nát trang sách khi đọc.',
    isGood: false,
    explanation: 'Gấp mép, vò sách làm sách nhanh bị rách nát và hỏng, chúng mình không nên làm như vậy nhé!',
    englishPhrase: 'Take care! Do not fold the book.',
    englishVoice: 'Take care! Do not fold the book.'
  },
  {
    id: 3,
    title: 'Tình huống 3: Sau khi chơi đồ chơi',
    actionText: 'Bạn nhỏ cất đồ chơi gọn gàng vào giỏ đúng chỗ sau khi chơi xong.',
    isGood: true,
    explanation: 'Cất đồ chơi đúng chỗ giúp nhà cửa luôn gọn gàng, đồ chơi không bị giẫm phải gây vỡ hoặc làm ngã người khác.',
    englishPhrase: 'Great job! Put toys in the right place.',
    englishVoice: 'Great job! Put toys in the right place.'
  },
  {
    id: 4,
    title: 'Tình huống 4: Rửa bát đĩa',
    actionText: 'Bạn nhỏ ném bát đĩa và cốc nước xuống nền nhà khi tức giận.',
    isGood: false,
    explanation: 'Ném bát đĩa rất dễ làm vỡ đồ dùng sứ thủy tinh và mảnh vỡ có thể gây nguy hiểm cho em và mọi người!',
    englishPhrase: 'Dangerous! Be careful with cups and bowls.',
    englishVoice: 'Dangerous! Be careful with cups and bowls.'
  }
];

// Stage 3 Magic Care items & paired actions
export interface CarePair {
  id: string;
  itemTitle: string;
  itemEn: string;
  correctActionText: string;
  wrongActionDummy: string;
  soundCorrectVi: string;
  soundEn: string;
  careDetails: string;
}

export const CARE_PAIRS: CarePair[] = [
  {
    id: 'book',
    itemTitle: 'Quyển sách',
    itemEn: 'Book',
    correctActionText: 'Đọc nhẹ nhàng, giữ sách sạch đẹp.',
    wrongActionDummy: 'Gấp gập mép trang sách và vẽ bậy.',
    soundCorrectVi: 'Rất tốt! Đọc nhẹ nhàng và giữ sách sạch đẹp sẽ giúp sách luôn như mới!',
    soundEn: 'Great! Keep your books clean and neat.',
    careDetails: 'Lật trang cẩn thận, bọc bìa và cất lên giá sách sau khi học xong.'
  },
  {
    id: 'toy',
    itemTitle: 'Đồ chơi',
    itemEn: 'Toys',
    correctActionText: 'Chơi xong cất đúng chỗ vào hộp.',
    wrongActionDummy: 'Bày bừa khắp sàn nhà và dẫm lên.',
    soundCorrectVi: 'Tuyệt vời! Chơi xong cất đúng chỗ giúp đồ chơi bền đẹp và nhà cửa ngăn nắp!',
    soundEn: 'Well done! Put toys into the toy box.',
    careDetails: 'Thu gom các chi tiết cẩn thận, không ném đập đồ chơi.'
  },
  {
    id: 'furniture',
    itemTitle: 'Bàn ghế',
    itemEn: 'Table and Chairs',
    correctActionText: 'Sử dụng nhẹ nhàng, không viết vẽ lên bàn ghế.',
    wrongActionDummy: 'Dùng bút dạ vẽ lên mặt bàn và nhún nhảy.',
    soundCorrectVi: 'Chính xác! Sử dụng nhẹ nhàng và lau chùi sạch sẽ giúp bàn ghế luôn sáng bóng!',
    soundEn: 'Awesome! Sit properly and keep tables clean.',
    careDetails: 'Ngồi đúng tư thế, lau bụi thường xuyên, không dẫm chân lên ghế.'
  },
  {
    id: 'kitchenware',
    itemTitle: 'Đồ dùng nhà bếp',
    itemEn: 'Kitchenware',
    correctActionText: 'Sử dụng cẩn thận, bê bằng hai tay.',
    wrongActionDummy: 'Chạy nhảy khi đang cầm cốc bát bằng sứ.',
    soundCorrectVi: 'Rất chuẩn! Đồ dùng nhà bếp như cốc bát cần dùng cẩn thận để không bị sứt mẻ!',
    soundEn: 'Excellent! Use kitchenware carefully.',
    careDetails: 'Cầm cốc bát bằng hai tay, đặt nhẹ nhàng xuống bàn.'
  }
];

// Stage 4 Detective Scene Actions
export interface DetectiveAction {
  id: number;
  label: string;
  isIncorrect: boolean; // true = hành động cần sửa, false = hành động đã đúng
  wrongDesc: string;
  correctSolution: string;
  distractorSolution: string;
  soundExplanationVi: string;
  rect: { x: number; y: number; width: number; height: number }; // Relative percentage coordinates on scene
}

export const DETECTIVE_ACTIONS: DetectiveAction[] = [
  {
    id: 1,
    label: 'Vẽ bậy lên tường phòng khách',
    isIncorrect: true,
    wrongDesc: 'Bạn nhỏ đang dùng bút màu vẽ nguệch ngoạc lên tường nhà.',
    correctSolution: 'Không vẽ bậy, giữ tường nhà và bàn ghế luôn sạch đẹp.',
    distractorSolution: 'Tiếp tục vẽ thêm nhiều hình nữa cho kín tường.',
    soundExplanationVi: 'Không nên vẽ bậy lên tường! Chúng mình hãy vẽ vào giấy vẽ để giữ tường nhà luôn sáng sạch nhé!',
    rect: { x: 18, y: 35, width: 22, height: 28 }
  },
  {
    id: 2,
    label: 'Đá mạnh chân vào chân ghế',
    isIncorrect: true,
    wrongDesc: 'Bạn nhỏ dùng chân đá mạnh vào chân ghế gỗ khi đang ngồi.',
    correctSolution: 'Sử dụng ghế nhẹ nhàng, ngồi ngay ngắn đúng tư thế.',
    distractorSolution: 'Đá mạnh hơn để xem ghế có ngã không.',
    soundExplanationVi: 'Đá vào chân ghế làm ghế nhanh bị lung lay và trầy xước. Em hãy sử dụng ghế nhẹ nhàng nhé!',
    rect: { x: 48, y: 56, width: 20, height: 30 }
  },
  {
    id: 3,
    label: 'Vứt đồ chơi vương vãi trên lối đi',
    isIncorrect: true,
    wrongDesc: 'Bạn nhỏ chơi đồ chơi xong vứt ngổn ngang ở cầu thang và lối đi.',
    correctSolution: 'Cất đồ chơi đúng nơi quy định, xếp gọn vào giỏ.',
    distractorSolution: 'Để nguyên đồ chơi ở đó để lần sau chơi tiếp.',
    soundExplanationVi: 'Để đồ chơi bừa bãi có thể khiến người khác dẫm phải bị ngã nguy hiểm. Hãy cất đồ chơi vào giỏ ngay sau khi chơi nhé!',
    rect: { x: 74, y: 62, width: 22, height: 26 }
  },
  {
    id: 4,
    label: 'Bạn nhỏ cất sách ngay ngắn vào giá',
    isIncorrect: false,
    wrongDesc: 'Bạn nhỏ đang xếp sách vở ngay ngắn, gọn gàng lên giá sách.',
    correctSolution: 'Đây là hành động rất tốt! Em hãy học tập bạn nhé!',
    distractorSolution: '',
    soundExplanationVi: 'Hoan hô bạn nhỏ! Cất sách ngay ngắn vào giá là hành động rất đáng khen của một học sinh chăm ngoan!',
    rect: { x: 75, y: 22, width: 20, height: 26 }
  }
];

// Stage 5 Rescue Questions
export interface RescueQuiz {
  id: number;
  itemTitle: string;
  itemEn: string;
  question: string;
  optionA: string;
  optionB: string;
  correctOption: 'A' | 'B';
  explanation: string;
  voicePrompt: string;
}

export const RESCUE_QUIZZES: RescueQuiz[] = [
  {
    id: 1,
    itemTitle: 'Quyển sách',
    itemEn: 'Book',
    question: 'Em nên làm gì để bảo quản sách?',
    optionA: 'Gấp mép, vò nát trang sách.',
    optionB: 'Giữ sách sạch đẹp, lật nhẹ nhàng.',
    correctOption: 'B',
    explanation: 'Giữ sách sạch đẹp và lật nhẹ tay sẽ giúp sách không bị rách, luôn thơm tho như mới mua!',
    voicePrompt: 'Câu 1: Em nên làm gì để bảo quản quyển sách thân yêu?'
  },
  {
    id: 2,
    itemTitle: 'Đồ chơi',
    itemEn: 'Toys',
    question: 'Sau khi chơi xong, em nên làm gì?',
    optionA: 'Để đồ chơi bừa bãi khắp sàn.',
    optionB: 'Cất đồ chơi đúng chỗ vào giỏ.',
    correctOption: 'B',
    explanation: 'Cất đồ chơi đúng chỗ giúp ngôi nhà ngăn nắp và đồ chơi không bị thất lạc hay hỏng hóc!',
    voicePrompt: 'Câu 2: Sau khi chơi đồ chơi xong, em nên làm gì?'
  },
  {
    id: 3,
    itemTitle: 'Cái bàn',
    itemEn: 'Table',
    question: 'Việc nào giúp giữ gìn bàn học và bàn ăn?',
    optionA: 'Không viết, vẽ bậy lên mặt bàn.',
    optionB: 'Vẽ bậy và dùng dao gọt lên bàn.',
    correctOption: 'A',
    explanation: 'Không viết vẽ bậy giúp mặt bàn luôn sạch sẽ, phẳng phiu và sử dụng được lâu bền!',
    voicePrompt: 'Câu 3: Việc làm nào giúp chúng mình giữ gìn bàn học và bàn ăn?'
  },
  {
    id: 4,
    itemTitle: 'Cái ghế',
    itemEn: 'Chair',
    question: 'Em nên sử dụng ghế như thế nào?',
    optionA: 'Đứng nhún nhảy mạnh trên ghế.',
    optionB: 'Ngồi đúng cách, sử dụng nhẹ nhàng.',
    correctOption: 'B',
    explanation: 'Ngồi đúng cách và sử dụng nhẹ nhàng bảo vệ an toàn cho bản thân và giúp ghế không bị gãy!',
    voicePrompt: 'Câu 4: Em nên sử dụng ghế như thế nào cho đúng?'
  },
  {
    id: 5,
    itemTitle: 'Cái cốc',
    itemEn: 'Cup',
    question: 'Khi sử dụng cốc nước, em nên làm gì?',
    optionA: 'Sử dụng nhẹ nhàng, cẩn thận.',
    optionB: 'Ném cốc xuống nền nhà.',
    correctOption: 'A',
    explanation: 'Cốc thường làm bằng sứ hoặc thủy tinh, em cần cầm bằng hai tay và đặt nhẹ nhàng để không bị vỡ nhé!',
    voicePrompt: 'Câu 5: Khi sử dụng cốc nước uống, em nên làm gì?'
  }
];

// Stage 6 Pledge Actions
export interface PledgeOption {
  id: number;
  textVi: string;
  textEn: string;
  isPositive: boolean;
  explanation: string;
}

export const PLEDGE_OPTIONS: PledgeOption[] = [
  {
    id: 1,
    textVi: 'Em cất đồ chơi sau khi chơi.',
    textEn: 'I put away my toys after playing.',
    isPositive: true,
    explanation: 'Rất tuyệt vời! Đồ chơi sẽ luôn bền đẹp khi được cất cẩn thận.'
  },
  {
    id: 2,
    textVi: 'Em giữ sách sạch đẹp.',
    textEn: 'I keep my books clean and neat.',
    isPositive: true,
    explanation: 'Chính xác! Giữ sách sạch đẹp là thói quen của người học sinh chăm ngoan.'
  },
  {
    id: 3,
    textVi: 'Em sử dụng bàn ghế cẩn thận.',
    textEn: 'I use tables and chairs carefully.',
    isPositive: true,
    explanation: 'Rất đúng! Sử dụng bàn ghế nhẹ nhàng giúp bàn ghế bền lâu cho cả nhà cùng dùng.'
  },
  {
    id: 4,
    textVi: 'Em vẽ bậy lên mặt bàn.',
    textEn: 'I draw on the table.',
    isPositive: false,
    explanation: 'Vẽ bậy làm bàn bẩn và lem luốc. Chúng mình không nên làm việc này nhé!'
  },
  {
    id: 5,
    textVi: 'Em ném đồ dùng xuống nền nhà.',
    textEn: 'I throw things on the floor.',
    isPositive: false,
    explanation: 'Ném đồ dùng rất dễ gây vỡ hỏng và nguy hiểm. Hãy cầm đặt nhẹ nhàng!'
  },
  {
    id: 6,
    textVi: 'Em để đồ chơi bừa bãi.',
    textEn: 'I leave toys all over the floor.',
    isPositive: false,
    explanation: 'Để đồ chơi bừa bãi làm bừa nhà và dễ dẫm phải. Hãy thu dọn sau khi chơi!'
  }
];

// Stage 7 Golden Rules
export interface GoldenRule {
  id: number;
  number: string;
  ruleVi: string;
  ruleEn: string;
  explanationVi: string;
  voiceEn: string;
  iconName: string;
}

export const GOLDEN_RULES: GoldenRule[] = [
  {
    id: 1,
    number: '01',
    ruleVi: 'Sử dụng cẩn thận',
    ruleEn: 'Use it carefully',
    explanationVi: 'Dùng đồ vật nhẹ nhàng, đúng cách, không quăng ném hay đùa nghịch quá trớn.',
    voiceEn: 'Use it carefully.',
    iconName: 'Shield'
  },
  {
    id: 2,
    number: '02',
    ruleVi: 'Giữ sạch sẽ',
    ruleEn: 'Keep it clean',
    explanationVi: 'Lau chùi bụi bẩn, không vẽ bậy, giữ đồ dùng luôn sáng đẹp và vệ sinh.',
    voiceEn: 'Keep it clean.',
    iconName: 'Sparkles'
  },
  {
    id: 3,
    number: '03',
    ruleVi: 'Cất đúng nơi quy định',
    ruleEn: 'Put it in the right place',
    explanationVi: 'Dùng xong cất ngay vào vị trí cũ, giúp đồ dùng không thất lạc và nhà cửa gọn gàng.',
    voiceEn: 'Put it in the right place.',
    iconName: 'FolderCheck'
  }
];

// Badges list
export interface BadgeInfo {
  id: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  color: string;
}

export const BADGES: BadgeInfo[] = [
  {
    id: 'badge_explorer',
    titleVi: 'Nhà thám hiểm nhí',
    titleEn: 'Junior Explorer',
    descriptionVi: 'Khám phá tất cả các căn phòng và đồ dùng quen thuộc trong gia đình.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'badge_care',
    titleVi: 'Người bảo vệ đồ dùng',
    titleEn: 'Protector of Things',
    descriptionVi: 'Thực hiện phép thuật chăm sóc và giữ gìn đồ dùng sáng đẹp.',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'badge_detective',
    titleVi: 'Thám tử tài ba',
    titleEn: 'Brilliant Detective',
    descriptionVi: 'Tinh mắt phát hiện các hành động chưa đúng và hướng dẫn sửa lại.',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'badge_rescuer',
    titleVi: 'Người giải cứu',
    titleEn: 'Hero Rescuer',
    descriptionVi: 'Giải cứu thành công 5 đồ dùng gia đình qua các câu hỏi trắc nghiệm.',
    color: 'from-indigo-400 to-purple-500'
  },
  {
    id: 'badge_promise',
    titleVi: 'Em biết giữ gìn',
    titleEn: 'I Take Care of My Things',
    descriptionVi: 'Cam kết 3 hành động tốt bảo quản đồ dùng trong cuộc sống hằng ngày.',
    color: 'from-rose-400 to-pink-500'
  },
  {
    id: 'badge_master',
    titleVi: 'Chủ nhân ngôi nhà yêu thương',
    titleEn: 'Master of Our Happy Home',
    descriptionVi: 'Hoàn thành xuất sắc 7 trạm thử thách, thắp sáng ngôi nhà kỳ diệu!',
    color: 'from-yellow-400 via-amber-400 to-red-500'
  }
];

/**
 * Quizizz URL Configuration
 * If teachers provide a Quizizz code or link in the future, put it here:
 * e.g., 'https://quizizz.com/join?gc=123456'
 */
export const QUIZIZZ_CONFIG = {
  isConfigured: false,
  url: '',
  placeholderNotice: 'Thử thách cuối trên Quizizz sẽ sớm được cập nhật!'
};
